# mellinium-immo

Tu peux me créer un site d’agence immobilière en 3D sous format visite 3D avec le scrool et tout

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7fdba260-ffac-4108-b5a0-a27e414f4e7c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Production deployment — https://melliniumimmobiliere.tn

The site runs on the VPS with Docker; nginx on the VPS serves the domain over HTTPS.

| Piece | Role |
|---|---|
| nginx (host) + certbot | HTTPS, `www.` → apex redirect, proxy to `127.0.0.1:3000` (`deploy/nginx/melliniumimmobiliere.tn.conf`) |
| `web` container | The site (Nitro `node-server` build), published on `127.0.0.1:3000` only |
| `db` container | PostgreSQL 17, data in the `pgdata` volume; the `listings` table is created on first use |

Published photos are downloaded from the CRM into the `media` volume and served under `/media/...`.
The contact form is sent by the site through the OVH Zimbra mailbox `SMTP_USER` (smpt@…) and delivered to
`MAIL_TO` (contact@melliniumimmobiliere.tn) with the visitor as Reply-To. Without SMTP settings (Lovable
preview) it falls back to opening the visitor's mail app.

### 1. DNS
At the `.tn` registrar: `A  melliniumimmobiliere.tn → <VPS IP>` and `A  www.melliniumimmobiliere.tn → <VPS IP>`.
Keep the existing OVH `MX` and `TXT (SPF)` records: they carry the mailboxes.

### 2. VPS (Ubuntu/Debian)
```sh
curl -fsSL https://get.docker.com | sh                     # Docker Engine + Compose plugin
sudo apt install -y nginx certbot python3-certbot-nginx git
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

### 3. Site
```sh
sudo git clone https://github.com/ghassenghouibi/mellinium-immo.git /opt/mellinium-immo && cd /opt/mellinium-immo
sudo cp .env.example .env && sudo nano .env
#   POSTGRES_PASSWORD=$(openssl rand -hex 24)
#   CRM_API_KEY=$(openssl rand -hex 32)          ← give this value to the CRM
#   SMTP_PASSWORD='<password of smpt@melliniumimmobiliere.tn>'   (single quotes)
sudo chmod 600 .env
sudo docker compose up -d --build
curl http://127.0.0.1:3000/api/health          # {"status":"ok","database":"up"}
```

### 4. nginx + HTTPS
```sh
sudo cp deploy/nginx/melliniumimmobiliere.tn.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/melliniumimmobiliere.tn.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d melliniumimmobiliere.tn -d www.melliniumimmobiliere.tn --redirect
```
certbot installs the certificates, switches both server blocks to HTTPS and renews automatically.

### 5. Connect the CRM
In the CRM back-end `.env`: `MELLINIUM_API_BASE_URL=https://melliniumimmobiliere.tn` and `MELLINIUM_API_KEY=<CRM_API_KEY>`, then restart the CRM API.
The agency's company in the CRM must be named exactly « Mellinium Immobilière ».

### 6. Updates and backups
```sh
cd /opt/mellinium-immo && sudo git pull && sudo docker compose up -d --build   # deploy a new version
sudo sh deploy/backup.sh                                                     # database + photos → ./backups (keeps 14)
# daily, in root's crontab:  0 3 * * * cd /opt/mellinium-immo && sh deploy/backup.sh
```
Copy `./backups` off the server regularly. Logs: `sudo docker compose logs -f web`.

Without `DATABASE_URL` (Lovable preview, Vercel, `npm run dev`) the site shows its demonstration catalog.

### CRM publishing API

Called by Orion CRM with `Authorization: Bearer <CRM_API_KEY>`:

| Method | Path | Effect |
|---|---|---|
| `POST` | `/api/properties/crm` | Publish a property (201) |
| `PUT` | `/api/properties/crm/:reference` | Update it (200, 404 if unknown: the CRM then POSTs) |
| `DELETE` | `/api/properties/crm/:reference` | Remove it (200, 404 if unknown) |
| `DELETE` | `/api/properties/crm/:reference?status=vendu_loue` | Keep its page online marked Sold / Rented, out of the listings |
