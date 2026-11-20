import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200),
  project: z.string().trim().max(80),
  message: z.string().trim().max(5000).default(""),
  /** Page d'où vient la demande (fiche d'un bien, accueil…). */
  page: z.string().trim().max(300).optional(),
  lang: z.enum(["fr", "en"]),
  /** Champ piège invisible : rempli uniquement par les robots. */
  website: z.string().max(200).optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

/** `sent: false, reason: "not-configured"` : pas de SMTP (aperçu Lovable) ; le formulaire repasse alors par mailto. */
export type ContactResult =
  { sent: true } | { sent: false; reason: "not-configured" | "rate-limited" | "failed" };

export const sendContactRequest = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactRequestSchema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    const { handleContactRequest } = await import("@/server/contact");
    return handleContactRequest(data);
  });
