import { getRequestIP } from "@tanstack/react-start/server";
import type { ContactRequest, ContactResult } from "@/lib/contact";
import { mailConfigured, sendToAgency } from "./mailer";

const WINDOW_MS = 15 * 60_000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

/** At most MAX_PER_WINDOW requests per IP per window (in memory: one site instance). */
function allow(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return false;
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return true;
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function handleContactRequest(request: ContactRequest): Promise<ContactResult> {
  // Bots fill the hidden field: pretend success so they learn nothing.
  if (request.website) return { sent: true };
  if (!mailConfigured()) return { sent: false, reason: "not-configured" };

  // nginx sets X-Forwarded-For; the site is only reachable through it (published on 127.0.0.1).
  const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
  if (!allow(ip)) return { sent: false, reason: "rate-limited" };

  const rows: [string, string][] = [
    ["Nom", request.name],
    ["Téléphone", request.phone],
    ["E-mail", request.email],
    ["Projet", request.project],
    ["Langue du visiteur", request.lang === "fr" ? "Français" : "Anglais"],
    ...(request.page ? ([["Page", request.page]] as [string, string][]) : []),
  ];
  const text = [
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    request.message || "(pas de message)",
  ].join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="color:#666">${escape(label)}</td><td><strong>${escape(value)}</strong></td></tr>`,
    )
    .join(
      "",
    )}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-line">${escape(request.message || "(pas de message)")}</p>`;

  try {
    await sendToAgency({
      subject: `Demande du site — ${request.project} — ${request.name}`.replace(/[\r\n]+/g, " "),
      text,
      html,
      replyTo: { name: request.name, address: request.email },
    });
    return { sent: true };
  } catch (error) {
    console.error(
      "Contact request: SMTP send failed",
      error instanceof Error ? error.message : error,
    );
    return { sent: false, reason: "failed" };
  }
}
