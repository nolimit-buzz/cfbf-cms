/**
 * Upload a page's extracted media to Cloudinary, grouped under
 * `climate facility/<page-name>/`, and write each returned secure_url back into
 * cms/seed-manifests/<page-name>/manifest.json.
 *
 *   node scripts/upload-page-media.mjs --page=about
 *
 * Credentials come from cms/.env (CLOUDINARY_NAME / CLOUDINARY_KEY /
 * CLOUDINARY_SECRET) — the same ones Strapi's upload provider uses
 * (cms/config/plugins.ts). Signed uploads via the REST API, so no extra
 * dependency is needed. `public_id` is the local filename's base name and
 * `overwrite` is on, which makes re-running idempotent rather than duplicating.
 *
 * scripts/upload-home-media.mjs is the original single-page version, kept so
 * the Home pipeline stays reproducible exactly as it ran.
 */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pageArg = process.argv.find((arg) => arg.startsWith('--page='))?.slice('--page='.length);
if (!pageArg) throw new Error('usage: node scripts/upload-page-media.mjs --page=<name>');

const { PAGE_NAME, CLOUDINARY_FOLDER } = await import(`./${pageArg}-media-sources.mjs`);
if (!PAGE_NAME || !CLOUDINARY_FOLDER) {
  throw new Error(`${pageArg}-media-sources.mjs must export PAGE_NAME and CLOUDINARY_FOLDER`);
}

const SRC_DIR = path.join(CMS_ROOT, 'public', 'uploads', 'extracted', PAGE_NAME);
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');

const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);
const MIME_BY_EXTENSION = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
};

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

async function upload(file, env) {
  const extension = path.extname(file).toLowerCase();
  const resourceType = VIDEO_EXTENSIONS.has(extension) ? 'video' : 'image';
  const publicId = path.basename(file, extension);

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

  const bytes = await fs.readFile(path.join(SRC_DIR, file));
  form.append(
    'file',
    new Blob([bytes], { type: MIME_BY_EXTENSION[extension] ?? 'application/octet-stream' }),
    file
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_NAME}/${resourceType}/upload`,
    { method: 'POST', body: form }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.error?.message ?? `HTTP ${response.status}`);
  }
  return { url: body.secure_url, publicId: body.public_id, resourceType };
}

async function main() {
  const env = await readEnv();
  for (const key of ['CLOUDINARY_NAME', 'CLOUDINARY_KEY', 'CLOUDINARY_SECRET']) {
    if (!env[key]) throw new Error(`${key} is missing from cms/.env`);
  }

  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'));
  const failures = [];
  // Several rows can legitimately share one file (e.g. the Impact page's six
  // stories are backed by three videos). `public_id` is the file's base name,
  // so re-uploading would just overwrite itself — upload once, reuse the URL.
  const uploaded = new Map();

  for (const entry of manifest) {
    if (entry.status !== 'ok') {
      console.warn(`skipped ${entry.localFile} (status: ${entry.status})`);
      continue;
    }
    const cached = uploaded.get(entry.localFile);
    if (cached) {
      entry.cloudinaryPublicId = cached.publicId;
      entry.cloudinaryUrl = cached.url;
      console.log(`reused   ${entry.localFile}  -> ${cached.url}`);
      continue;
    }
    try {
      const { url, publicId, resourceType } = await upload(entry.localFile, env);
      uploaded.set(entry.localFile, { url, publicId });
      entry.cloudinaryPublicId = publicId;
      entry.cloudinaryUrl = url;
      console.log(`uploaded ${entry.localFile}  [${resourceType}]  -> ${url}`);
    } catch (error) {
      failures.push({ file: entry.localFile, message: error.message });
      console.error(`FAILED   ${entry.localFile}: ${error.message}`);
    }
  }

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`\nmanifest updated: ${path.relative(CMS_ROOT, MANIFEST_PATH)}`);
  if (failures.length) {
    console.log(`\n${failures.length} upload failure(s):`);
    for (const failure of failures) console.log(`  - ${failure.file}: ${failure.message}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
