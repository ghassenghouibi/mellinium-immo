import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envoi des e-mails du site par le SMTP de l'agence (OVH Zimbra). Le compte `SMTP_USER` sert
 * uniquement à s'authentifier et à envoyer ; tous les messages sont adressés à `MAIL_TO`
 * (contact@melliniumimmobiliere.tn), avec le visiteur en « Répondre à ».
 * Importer ce module dynamiquement : il ne doit jamais être chargé côté client.
 */

const env = (name: string) => process.env[name]?.trim() ?? "";

export function mailConfigured() {
  return Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASSWORD") && env("MAIL_TO"));
}

let transporter: Transporter | undefined;

function transport(): Transporter {
  if (!transporter) {
    const port = Number(env("SMTP_PORT") || 465);
    transporter = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      // 465 = TLS from the first byte; 587 = STARTTLS upgrade (required, never sent in clear).
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASSWORD") },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
    });
  }
  return transporter;
}

export type OutgoingMail = {
  subject: string;
  text: string;
  html: string;
  /** Adresse du visiteur, pour que « Répondre » lui écrive directement. */
  replyTo?: { name: string; address: string } | undefined;
};

export async function sendToAgency(mail: OutgoingMail) {
  const fromName = env("MAIL_FROM_NAME") || "Site Mellinium Immobilière";
  await transport().sendMail({
    // The sender must be the authenticated mailbox, or OVH rejects the message / SPF fails.
    from: { name: fromName, address: env("SMTP_USER") },
    to: env("MAIL_TO"),
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}
