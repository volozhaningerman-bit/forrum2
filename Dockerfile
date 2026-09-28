FROM node:24-bookworm-slim

WORKDIR /app

ENV CI=true

ARG DATABASE_URL=postgresql://forrum:forrum@localhost:5432/forrum

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/contracts/package.json packages/contracts/package.json

RUN npm install --no-audit --no-fund

COPY . .

RUN npm run build \
    && mkdir -p apps/web/.next/standalone/apps/web/.next \
    && rm -rf apps/web/.next/standalone/apps/web/.next/static apps/web/.next/standalone/apps/web/public \
    && cp -R apps/web/.next/static apps/web/.next/standalone/apps/web/.next/static \
    && cp -R apps/web/public apps/web/.next/standalone/apps/web/public

ENV NODE_ENV=production

EXPOSE 3000 4000

CMD ["sh", "-c", "if [ \"$RAILWAY_SERVICE_NAME\" = \"web\" ]; then exec node apps/web/.next/standalone/apps/web/server.js; elif [ \"$RAILWAY_SERVICE_NAME\" = \"api\" ]; then npm run db:push -w @forrum/api && npm run db:seed -w @forrum/api && exec npm run start -w @forrum/api; else echo \"Unsupported Railway service: $RAILWAY_SERVICE_NAME\" >&2; exit 1; fi"]
