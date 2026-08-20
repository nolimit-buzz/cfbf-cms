/**
 * One-off: upload the KfW partner logo to Cloudinary, into the same folder
 * and public_id naming pattern as the other About-page partner logos
 * (`climate facility/about-page/partners-group-2-partner-<n>-logo`).
 *
 * Signed upload via Cloudinary's REST API, same mechanism as
 * scripts/upload-page-media.mjs — reuses cms/.env's CLOUDINARY_NAME /
 * CLOUDINARY_KEY / CLOUDINARY_SECRET (the same credentials Strapi's own
 * upload provider uses). `overwrite: true` makes re-running idempotent.
 *
 *   node scripts/upload-kfw-logo.mjs
 */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILE = path.join(CMS_ROOT, 'public', 'uploads', 'extracted', 'about', 'partners-group-2-partner-3-logo.png');
const CLOUDINARY_FOLDER = 'climate facility/about-page';
const PUBLIC_ID = 'partners-group-2-partner-3-logo';

async function readEnv() {
  const raw = await fs.readFile(path.join(CMS_ROOT, '.env'), 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

function sign(params, apiSecret) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto.createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex');
}

async function main() {
  const env = await readEnv();
  for (const key of ['CLOUDINARY_NAME', 'CLOUDINARY_KEY', 'CLOUDINARY_SECRET']) {
    if (!env[key]) throw new Error(`${key} is missing from cms/.env`);
  }

  const signedParams = {
    folder: CLOUDINARY_FOLDER,
    overwrite: 'true',
    public_id: PUBLIC_ID,
    timestamp: Math.floor(Date.now() / 1000),
  };

  const form = new FormData();
  for (const [key, value] of Object.entries(signedParams)) form.append(key, String(value));
  form.append('api_key', env.CLOUDINARY_KEY);
  form.append('signature', sign(signedParams, env.CLOUDINARY_SECRET));

  const bytes = await fs.readFile(SOURCE_FILE);
  form.append('file', new Blob([bytes], { type: 'image/png' }), path.basename(SOURCE_FILE));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_NAME}/image/upload`,
    { method: 'POST', body: form }
  );
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? `HTTP ${response.status}`);

  console.log(`uploaded -> ${body.secure_url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
