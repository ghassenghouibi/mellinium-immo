import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

/**
 * Photos des biens publiés. Le CRM envoie des liens S3 signés valables 7 jours : le site télécharge
 * chaque photo dans `MEDIA_DIR/<référence>/` (un volume Docker en production) et la sert sous `/media/...`.
 */

const MAX_BYTES = 20 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 45_000;
const CONCURRENCY = 4;

const extensions: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
};

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

export class MediaError extends Error {}

export function mediaRoot() {
  return resolve(process.env["MEDIA_DIR"] ?? join(process.cwd(), ".data", "media"));
}

/** Nom de dossier sûr pour une référence CRM (« VEN-2026/014 » → « ven-2026-014 »). */
export function mediaFolder(reference: string) {
  return (
    reference
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "bien"
  );
}

/**
 * The S3 object key (URL without its signature) stays the same across publications, so a photo
 * already on disk is reused instead of downloaded again: an edit that leaves the photos alone is fast.
 */
function stableName(url: URL) {
  return createHash("sha256").update(`${url.host}${url.pathname}`).digest("hex").slice(0, 24);
}

async function existing(folder: string, base: string) {
  try {
    const names = await readdir(folder);
    return names.find((name) => name.startsWith(`${base}.`));
  } catch {
    return undefined;
  }
}

async function download(rawUrl: string, folder: string): Promise<string> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new MediaError(`Invalid image URL: ${rawUrl.slice(0, 80)}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:")
    throw new MediaError(`Unsupported image URL scheme: ${url.protocol}`);

  const base = stableName(url);
  const cached = await existing(folder, base);
  if (cached) return cached;

  const response = await fetch(url, {
    signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
    redirect: "follow",
  });
  if (!response.ok)
    throw new MediaError(
      `Image download failed (${response.status}) for ${url.host}${url.pathname}`,
    );
  const type =
    (response.headers.get("content-type") ?? "").split(";")[0]?.trim().toLowerCase() ?? "";
  const extension =
    extensions[type] ??
    (contentTypes[extname(url.pathname).toLowerCase()]
      ? extname(url.pathname).toLowerCase()
      : undefined);
  if (!extension)
    throw new MediaError(
      `Not an image (${type || "no content-type"}) at ${url.host}${url.pathname}`,
    );
  const declared = Number(response.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES)
    throw new MediaError(`Image too large (${declared} bytes) at ${url.pathname}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES)
    throw new MediaError(`Image too large (${bytes.byteLength} bytes) at ${url.pathname}`);

  const name = `${base}${extension}`;
  const temporary = join(folder, `.${name}.${process.pid}.tmp`);
  await writeFile(temporary, bytes);
  await rename(temporary, join(folder, name));
  return name;
}

/**
 * Télécharge les photos d’un bien, dans l’ordre du CRM, et retire celles qui ne sont plus publiées.
 * Retourne les chemins publics (`/media/<dossier>/<fichier>`). Échoue en bloc si une photo est inaccessible,
 * pour que le CRM marque le bien « à resynchroniser » plutôt que de publier une galerie incomplète.
 */
export async function storePhotos(reference: string, urls: string[]): Promise<string[]> {
  const folderName = mediaFolder(reference);
  const folder = join(mediaRoot(), folderName);
  await mkdir(folder, { recursive: true });

  const names: string[] = new Array(urls.length);
  let next = 0;
  const worker = async () => {
    while (next < urls.length) {
      const index = next++;
      names[index] = await download(urls[index] ?? "", folder);
    }
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));

  const kept = new Set(names);
  for (const name of await readdir(folder)) {
    if (!kept.has(name)) await rm(join(folder, name), { force: true });
  }
  return names.map((name) => `/media/${folderName}/${name}`);
}

export async function removePhotos(reference: string) {
  await rm(join(mediaRoot(), mediaFolder(reference)), { recursive: true, force: true });
}

/** Lit une photo publiée ; `undefined` si le chemin est inconnu ou sort du dossier des médias. */
export async function readPhoto(
  path: string,
): Promise<{ body: Buffer; contentType: string } | undefined> {
  const root = mediaRoot();
  const file = resolve(root, path);
  if (!file.startsWith(root + sep)) return undefined;
  const contentType = contentTypes[extname(file).toLowerCase()];
  if (!contentType) return undefined;
  try {
    if (!(await stat(file)).isFile()) return undefined;
    return { body: await readFile(file), contentType };
  } catch {
    return undefined;
  }
}
