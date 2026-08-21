# syntax=docker/dockerfile:1

FROM node:20-alpine AS build

# Build toolchain for any native dep without a musl prebuild.
# Deliberately NOT installing vips-dev: sharp ships prebuilt musl binaries, but
# it compiles from source (and fails) if it detects a global libvips.
RUN apk update && apk add --no-cache \
    build-base \
    python3 \
    git \
    libc6-compat

WORKDIR /app

# Explicit, not a glob: a missing lockfile must fail here, not confusingly in `npm ci`
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit

COPY . .

ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=true
ENV CI=true

# Build the Strapi admin panel
RUN npm run build

# Drop devDependencies so the runner stage doesn't inherit them
RUN npm prune --omit=dev

FROM node:20-alpine AS runner

# sharp's prebuilt binary bundles its own libvips, so no vips package is needed
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1345
ENV STRAPI_TELEMETRY_DISABLED=true

RUN addgroup -S strapi && \
    adduser -S strapi -G strapi

# Only the compiled output and runtime deps are needed — src/, config/, types/,
# scripts/ etc. are TS/tooling already baked into dist/ by `strapi build`.
# --chown sets ownership during the copy itself, avoiding a slow recursive
# `chown -R` pass over the whole (large) node_modules tree afterward.
COPY --from=build --chown=strapi:strapi /app/dist ./dist
COPY --from=build --chown=strapi:strapi /app/node_modules ./node_modules
COPY --from=build --chown=strapi:strapi /app/package.json /app/package-lock.json ./
COPY --from=build --chown=strapi:strapi /app/public ./public

# REQUIRED, not tooling: Strapi detects a TypeScript project by the presence of
# tsconfig.json and only then resolves its distDir to ./dist. Without this file it
# assumes a plain JS project, looks for ./config and ./src at the root, finds
# neither, and dies with "Cannot destructure property 'client' of
# 'db.config.connection'". Do not drop it to save space.
COPY --from=build --chown=strapi:strapi /app/tsconfig.json ./

# strapi::favicon resolves favicon.png from the project root
COPY --from=build --chown=strapi:strapi /app/favicon.png ./

# @strapi/database mkdir's this at boot for user migrations. /app is root-owned,
# so it must exist and belong to strapi before the process drops privileges.
RUN mkdir -p database/migrations && chown -R strapi:strapi database

# Uploads go to Cloudinary (config/plugins.ts); this stays as a local fallback
RUN mkdir -p public/uploads && chown strapi:strapi public/uploads

USER strapi

EXPOSE 1345

CMD ["npm", "run", "start"]
