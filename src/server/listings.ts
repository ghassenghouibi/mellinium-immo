import { z } from "zod";
import type { L } from "@/lib/i18n";
import type { Property } from "@/lib/properties";
import {
  amenityLabels,
  isPropertyType,
  nonResidentialTypes,
  publicationTagLabels,
  type PropertyType,
} from "@/lib/property-labels";
import { db } from "./db";
import { removePhotos, storePhotos } from "./media";

/**
 * Biens publiés depuis le CRM (Orion CRM, `back-end/db/services/publishing/mellinium_service.py`).
 * Le CRM envoie le même corps JSON en création (POST) et en mise à jour (PUT).
 */

const number = z.coerce.number().finite().nullish();
const integer = z.coerce.number().int().nullish();
const text = z.string().nullish();

export const crmPayloadSchema = z
  .object({
    reference: z.string().trim().min(1).max(50),
    title: z.string().trim().max(255).nullish(),
    description: text,
    property_type: text,
    usage: text,
    price_final: number,
    price_final_per_sqm: number,
    discounted_price: number,
    surface: number,
    superficie_terrain: number,
    superficie_terrasse: number,
    superficie_jardin: number,
    rooms: integer,
    bathrooms: integer,
    washrooms: integer,
    parking_spots: integer,
    salon: integer,
    salle_a_manger: integer,
    suite: integer,
    cuisine: integer,
    floor_number: integer,
    appartement_number: text,
    is_furnished: z.boolean().nullish(),
    address: text,
    zip_code: text,
    city: text,
    latitude: number,
    longitude: number,
    amenities: z.array(z.string()).nullish(),
    tags: z.array(z.object({ key: z.string(), value: z.string().nullish() })).nullish(),
    // Extra photos are dropped rather than refusing the whole listing.
    images: z
      .array(z.string())
      .default([])
      .transform((urls) => urls.slice(0, 60)),
  })
  .passthrough();

export type CrmPayload = z.infer<typeof crmPayloadSchema>;

type ListingRow = {
  reference: string;
  slug: string;
  status: "available" | "closed";
  payload: CrmPayload;
  images: string[];
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function transactionOf(payload: CrmPayload) {
  return payload.usage === "location" ? "location" : "vente";
}

function effectivePrice(payload: CrmPayload) {
  const discounted = payload.discounted_price ?? 0;
  return discounted > 0 ? discounted : (payload.price_final ?? null);
}

/** Writes the listing and its photos; `created` is false when the reference already existed. */
export async function upsertListing(
  payload: CrmPayload,
  mode: "create" | "update",
): Promise<{ created: boolean; slug: string } | undefined> {
  const sql = await db();
  const [current] = await sql<
    { slug: string }[]
  >`SELECT slug FROM listings WHERE reference = ${payload.reference}`;
  if (mode === "update" && !current) return undefined;

  // Photos first: if one cannot be fetched, nothing is written and the CRM keeps the property flagged for resync.
  const images = await storePhotos(payload.reference, payload.images);
  const { images: _signedUrls, ...stored } = payload;
  // The slug is fixed at first publication so links already shared keep working after a title change.
  const slug =
    current?.slug ??
    `${slugify(payload.title || "bien") || "bien"}-${slugify(payload.reference) || "ref"}`;

  const values = {
    reference: payload.reference,
    slug,
    status: "available",
    transaction: transactionOf(payload),
    property_type: isPropertyType(payload.property_type) ? payload.property_type : "autre",
    title: payload.title || `Bien ${payload.reference}`,
    city: payload.city ?? null,
    price: effectivePrice(payload),
    surface: payload.surface ?? null,
    bedrooms: payload.rooms ?? null,
    payload: sql.json(stored as Parameters<typeof sql.json>[0]),
    images: sql.json(images),
  };

  await sql`
    INSERT INTO listings ${sql(values)}
    ON CONFLICT (reference) DO UPDATE SET
      status = 'available',
      transaction = EXCLUDED.transaction,
      property_type = EXCLUDED.property_type,
      title = EXCLUDED.title,
      city = EXCLUDED.city,
      price = EXCLUDED.price,
      surface = EXCLUDED.surface,
      bedrooms = EXCLUDED.bedrooms,
      payload = EXCLUDED.payload,
      images = EXCLUDED.images,
      updated_at = now()
  `;
  return { created: !current, slug };
}

/** Retire un bien, ou le garde en ligne marqué « Vendu » / « Loué » (`closed`). Faux si la référence est inconnue. */
export async function unpublishListing(reference: string, closed: boolean): Promise<boolean> {
  const sql = await db();
  if (closed) {
    const rows =
      await sql`UPDATE listings SET status = 'closed', updated_at = now() WHERE reference = ${reference} RETURNING reference`;
    return rows.length > 0;
  }
  const rows = await sql`DELETE FROM listings WHERE reference = ${reference} RETURNING reference`;
  await removePhotos(reference);
  return rows.length > 0;
}

export async function listListings(): Promise<Property[]> {
  const sql = await db();
  const rows = await sql<ListingRow[]>`
    SELECT reference, slug, status, payload, images FROM listings
    ORDER BY (status = 'available') DESC, published_at DESC
  `;
  return rows.map(toProperty);
}

// ——— CRM → site ———

/**
 * Le CRM nomme les villes « Délégation - Localité » (« La Marsa - Gammarth Supérieur ») : le site affiche
 * ces noms tels quels, la localité comme quartier et la délégation comme ville.
 */
function locationOf(payload: CrmPayload): { district: string; city: string } {
  const name = (payload.city ?? "").trim();
  if (!name) return { district: payload.address?.trim() || "Tunisie", city: "Tunisie" };
  const [delegation = name, ...rest] = name
    .split(/\s+-\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!rest.length) return { district: delegation, city: "Tunisie" };
  return { district: rest.join(" - "), city: delegation };
}

function same(value: string): L {
  return { fr: value, en: value };
}

function featuresOf(payload: CrmPayload): L[] {
  const features: L[] = [];
  const add = (label: string) => {
    const known =
      amenityLabels[label] ??
      Object.entries(amenityLabels).find(([key]) => key.toLowerCase() === label.toLowerCase())?.[1];
    const feature = known ?? same(label);
    if (!features.some((item) => item.fr.toLowerCase() === feature.fr.toLowerCase()))
      features.push(feature);
  };
  for (const amenity of payload.amenities ?? []) if (amenity.trim()) add(amenity.trim());
  if ((payload.suite ?? 0) > 0) add("Suite parentale");
  if ((payload.superficie_terrasse ?? 0) > 0) add("Terrasse");
  if ((payload.superficie_jardin ?? 0) > 0) add("Jardin");
  if ((payload.parking_spots ?? 0) > 0) add("Parking");
  if (payload.is_furnished) add("Meublé");
  return features;
}

function badgeOf(payload: CrmPayload): L | undefined {
  const tag = (payload.tags ?? []).find((item) => item.key !== "price_on_request");
  if (!tag) return undefined;
  return publicationTagLabels[tag.key] ?? same(tag.value || tag.key.replace(/_/g, " "));
}

function highlightOf(payload: CrmPayload, type: PropertyType): L | undefined {
  const parts: L[] = [];
  if (payload.superficie_terrain && type !== "appartement")
    parts.push({
      fr: `Terrain de ${payload.superficie_terrain} m²`,
      en: `${payload.superficie_terrain} m² plot`,
    });
  else if (payload.superficie_terrasse)
    parts.push({
      fr: `Terrasse de ${payload.superficie_terrasse} m²`,
      en: `${payload.superficie_terrasse} m² terrace`,
    });
  if (payload.floor_number != null && payload.floor_number > 0)
    parts.push({ fr: `${payload.floor_number}ᵉ étage`, en: `Floor ${payload.floor_number}` });
  if (!parts.length) return undefined;
  return {
    fr: parts.map((part) => part.fr).join(" · "),
    en: parts.map((part) => part.en).join(" · "),
  };
}

export function toProperty(row: ListingRow): Property {
  const payload = row.payload;
  const type: PropertyType = isPropertyType(payload.property_type)
    ? payload.property_type
    : "autre";
  const residential = !nonResidentialTypes.has(type);
  const { district, city } = locationOf(payload);
  const bedrooms = residential ? (payload.rooms ?? 0) : 0;
  // In Tunisia an « S+3 » has three bedrooms plus the living room: rooms = bedrooms + salons.
  const rooms = residential
    ? bedrooms + (payload.salon ?? (bedrooms ? 1 : 0))
    : (payload.rooms ?? 0);
  const area = payload.surface ?? payload.superficie_terrain ?? 0;
  const description = (payload.description ?? "").trim();
  const priceOnRequest = (payload.tags ?? []).some((tag) => tag.key === "price_on_request");
  const price = priceOnRequest ? 0 : (effectivePrice(payload) ?? 0);

  return {
    id: row.slug,
    reference: row.reference,
    status: row.status,
    transaction: transactionOf(payload),
    city,
    district,
    type,
    name: payload.title || `Bien ${row.reference}`,
    price,
    priceOnRequest: priceOnRequest || !price,
    rooms,
    bedrooms,
    bathrooms: residential ? (payload.bathrooms ?? 0) : 0,
    area,
    land:
      payload.superficie_terrain && type !== "appartement" ? payload.superficie_terrain : undefined,
    furnished: payload.is_furnished ?? undefined,
    badge: badgeOf(payload),
    highlight: highlightOf(payload, type),
    image: row.images[0] ?? "",
    gallery: row.images,
    // The CRM writes descriptions in French only: the English version shows the same text.
    summary: same(description),
    features: featuresOf(payload),
  };
}
