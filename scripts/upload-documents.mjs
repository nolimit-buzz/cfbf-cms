/**
 * One-off: upload the CFBF Factsheet and 2025 Impact Report PDFs to
 * Cloudinary, into a shared `climate facility/documents` folder (documents
 * aren't page-scoped the way images are — the same factsheet is linked from
 * About, Eligibility and Contact, and the same impact report from Home,
 * Projects and the Footer).
 *
 * Source: the live reference site (infracredit.ng/climate-facility), fetched
 * into cms/public/uploads/extracted/documents/.
 *
 * Uploaded as `resource_type: raw` (not `image`) — Cloudinary's image
 * pipeline treats PDFs as rasterizable pages for thumbnail generation, which
 * isn't wanted here; `raw` serves the original file bytes untouched, which is
 * what a "download the document" button needs. Same signed-upload mechanism
 * as scripts/upload-page-media.mjs, reusing cms/.env's CLOUDINARY_NAME /
 * CLOUDINARY_KEY / CLOUDINARY_SECRET. `overwrite: true` makes re-running
 * idempotent.
 *
 *   node scripts/upload-documents.mjs
 */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(CMS_ROOT, 'public', 'uploads', 'extracted', 'documents');
const CLOUDINARY_FOLDER = 'climate facility/documents';

const DOCUMENTS = [
  { localFile: 'cfbf-factsheet.pdf', publicId: 'cfbf-factsheet' },
  { localFile: 'cfbf-impact-report-2025.pdf', publicId: 'cfbf-impact-report-2025' },
];

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

async function upload(doc, env) {
  const signedParams = {
    folder: CLOUDINARY_FOLDER,
    overwrite: 'true',
    public_id: doc.publicId,
    timestamp: Math.floor(Date.now() / 1000),
  };

  const form = new FormData();
  for (const [key, value] of Object.entries(signedParams)) form.append(key, String(value));
  form.append('api_key', env.CLOUDINARY_KEY);
  form.append('signature', sign(signedParams, env.CLOUDINARY_SECRET));

  const bytes = await fs.readFile(path.join(SRC_DIR, doc.localFile));
  form.append('file', new Blob([bytes], { type: 'application/pdf' }), doc.localFile);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_NAME}/raw/upload`,
    { method: 'POST', body: form }
  );
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? `HTTP ${response.status}`);
  return body.secure_url;
}

async function main() {
  const env = await readEnv();
  for (const key of ['CLOUDINARY_NAME', 'CLOUDINARY_KEY', 'CLOUDINARY_SECRET']) {
    if (!env[key]) throw new Error(`${key} is missing from cms/.env`);
  }

  const results = {};
  for (const doc of DOCUMENTS) {
    const url = await upload(doc, env);
    results[doc.publicId] = url;
    console.log(`uploaded ${doc.localFile} -> ${url}`);
  }

  await fs.writeFile(
    path.join(CMS_ROOT, 'seed-manifests', 'documents.json'),
    `${JSON.stringify(results, null, 2)}\n`,
    'utf8'
  );
  console.log('\nwritten -> seed-manifests/documents.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
