import postgres from "postgres";

/**
 * Connexion PostgreSQL du site (serveur uniquement). Les biens y sont écrits par le CRM via
 * `/api/properties/crm` ; sans `DATABASE_URL`, le site reste sur son catalogue de démonstration.
 * Importer ce module dynamiquement (`await import(...)`) pour qu’il ne soit jamais chargé côté client.
 */

type Sql = ReturnType<typeof postgres>;

let client: Sql | undefined;
let schemaReady: Promise<void> | undefined;

export function databaseConfigured() {
  return Boolean(process.env["DATABASE_URL"]);
}

function connect(): Sql {
  if (!client) {
    const url = process.env["DATABASE_URL"];
    if (!url) throw new Error("DATABASE_URL is not set");
    client = postgres(url, {
      max: Number(process.env["DATABASE_POOL_SIZE"] ?? 5),
      idle_timeout: 30,
      onnotice: () => {},
    });
  }
  return client;
}

// Idempotent: the table is created on first use, so a fresh Postgres volume needs no manual step.
const schema = `
CREATE TABLE IF NOT EXISTS listings (
  reference      text PRIMARY KEY,
  slug           text NOT NULL UNIQUE,
  status         text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'closed')),
  transaction    text NOT NULL CHECK (transaction IN ('vente', 'location')),
  property_type  text NOT NULL,
  title          text NOT NULL,
  city           text,
  price          numeric(15, 2),
  surface        numeric(10, 2),
  bedrooms       integer,
  payload        jsonb NOT NULL,
  images         jsonb NOT NULL DEFAULT '[]'::jsonb,
  published_at   timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS listings_status_published_idx ON listings (status, published_at DESC);
`;

/** Connexion prête à l’emploi, schéma créé au premier appel. */
export async function db(): Promise<Sql> {
  const sql = connect();
  schemaReady ??= sql.unsafe(schema).then(
    () => undefined,
    (error: unknown) => {
      schemaReady = undefined;
      throw error;
    },
  );
  await schemaReady;
  return sql;
}
