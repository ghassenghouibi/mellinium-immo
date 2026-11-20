#!/bin/sh
# Back up the site's database and published photos into ./backups (run from the repo root, on the server).
#   sh deploy/backup.sh            → backups/mellinium-<date>.sql.gz + backups/media-<date>.tar.gz
# Restore: gunzip -c backups/mellinium-<date>.sql.gz | docker compose exec -T db psql -U mellinium -d mellinium
# Schedule it daily, e.g. crontab: 0 3 * * * cd /opt/mellinium-immo && sh deploy/backup.sh
set -eu
stamp=$(date +%Y%m%d-%H%M)
mkdir -p backups
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' | gzip > "backups/mellinium-$stamp.sql.gz"
docker compose exec -T web tar -czf - -C /data media > "backups/media-$stamp.tar.gz"
# Keep the last 14 backups of each kind.
ls -1t backups/mellinium-*.sql.gz | tail -n +15 | xargs -r rm --
ls -1t backups/media-*.tar.gz | tail -n +15 | xargs -r rm --
echo "Backup written: backups/mellinium-$stamp.sql.gz, backups/media-$stamp.tar.gz"
