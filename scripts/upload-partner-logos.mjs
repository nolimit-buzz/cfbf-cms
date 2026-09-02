/**
 * Upload every partner logo variant in frontend/public/partners/ to
 * Cloudinary under `climate facility/partners/`, and write the resulting
 * secure_urls to cms/seed-manifests/partners/manifest.json.
 *
 *   node scripts/upload-partner-logos.mjs [--dry-run]
 *
 * Signed REST uploads, same mechanism as scripts/upload-page-media.mjs —
 * credentials come from cms/.env (CLOUDINARY_NAME / CLOUDINARY_KEY /
 * CLOUDINARY_SECRET), the same ones Strapi's upload provider uses. public_id
 * is derived from the brand slug rather than the local filename (those contain
 * spaces and an inconsistent white-variant suffix), and `overwrite: true`
 * makes re-running idempotent rather than duplicating.
 *
 * The manifest this writes is the input to scripts/apply-partner-logos-to-cms.cjs.
 */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CLOUDINARY_FOLDER, SOURCE_DIR, partnerLogos, publicIdFor, stripVersion } from './partner-logo-sources.mjs';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(CMS_ROOT, '..');
const SRC_DIR = path.join(REPO_ROOT, ...SOURCE_DIR.split('/'));
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', 'partners', 'manifest.json');

const dryRun = process.argv.includes('--dry-run');

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

async function upload(fileName, publicId, env) {
  const signedParams = {
    folder: CLOUDINARY_FOLDER,
    overwrite: 'true',
    public_id: publicId,
    timestamp: Math.floor(Date.now() / 1000),
  };

  const form = new FormData();
  for (const [key, value] of Object.entries(signedParams)) form.append(key, String(value));
  form.append('api_key', env.CLOUDINARY_KEY);
  form.append('signature', sign(signedParams, env.CLOUDINARY_SECRET));

  const bytes = await fs.readFile(path.join(SRC_DIR, fileName));
  form.append('file', new Blob([bytes], { type: 'image/svg+xml' }), fileName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_NAME}/image/upload`,
    { method: 'POST', body: form }
  );
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? `HTTP ${response.status}`);
  return stripVersion(body.secure_url);
}

async function main() {
  const env = await readEnv();
  for (const key of ['CLOUDINARY_NAME', 'CLOUDINARY_KEY', 'CLOUDINARY_SECRET']) {
    if (!env[key]) throw new Error(`${key} is missing from cms/.env`);
  }

  // Fail before uploading anything if the table names a file that isn't there,
  // rather than leaving the manifest half-written.
  const missing = [];
  for (const partner of partnerLogos) {
    for (const fileName of [partner.white, partner.colour]) {
      try {
        await fs.access(path.join(SRC_DIR, fileName));
      } catch {
        missing.push(`${partner.slug}: ${fileName}`);
      }
    }
  }
  if (missing.length > 0) {
    throw new Error(`missing source files in ${SOURCE_DIR}:\n  ${missing.join('\n  ')}`);
  }

  const manifest = {};
  for (const partner of partnerLogos) {
    manifest[partner.slug] = { label: partner.label };
    for (const variant of ['white', 'colour']) {
      const fileName = partner[variant];
      const publicId = publicIdFor(partner.slug, variant);
      if (dryRun) {
        console.log(`would upload ${fileName}  ->  ${CLOUDINARY_FOLDER}/${publicId}`);
        continue;
      }
      const url = await upload(fileName, publicId, env);
      manifest[partner.slug][variant] = url;
      console.log(`uploaded ${fileName.padEnd(24)} -> ${url}`);
    }
  }

  if (dryRun) {
    console.log(`\ndry run — nothing uploaded, ${MANIFEST_PATH} untouched`);
    return;
  }

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`\nwrote ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
