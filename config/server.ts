import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Behind Dokploy's Traefik proxy, Strapi otherwise builds absolute URLs from the
  // internal http://0.0.0.0:1341 and mis-scopes secure cookies on admin login.
  // Both are no-ops locally: PUBLIC_URL unset keeps the current behaviour, and
  // `proxy` only takes effect when X-Forwarded-* headers are actually present.
  url: env('PUBLIC_URL', undefined),
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
