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
ENV PORT=1341
ENV STRAPI_TELEMETRY_DISABLED=true

# Only the compiled output and runtime deps are needed — src/, config/, types/,
# scripts/ etc. are TS/tooling already baked into dist/ by `strapi build`.
# Copying just these keeps the pushed image (and the VPS pull) smaller.
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/public ./public

# Uploads go to Cloudinary (config/plugins.ts); this stays as a local fallback
RUN mkdir -p public/uploads

RUN addgroup -S strapi && \
    adduser -S strapi -G strapi && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1341

CMD ["npm", "run", "start"]
