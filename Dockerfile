# syntax=docker/dockerfile:1
# Mellinium Immobilière website, built for Node (Nitro node-server preset) instead of the
# Cloudflare/Vercel presets used by Lovable and Vercel. Runs with docker-compose.yml (site + Postgres).

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    MEDIA_DIR=/data/media
# Nitro bundles the server and traces its dependencies into .output: no node_modules needed at runtime.
COPY --from=build --chown=node:node /app/.output ./.output
# Photos published from the CRM; docker-compose mounts a named volume here.
RUN mkdir -p /data/media && chown -R node:node /data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health > /dev/null || exit 1
CMD ["node", ".output/server/index.mjs"]
