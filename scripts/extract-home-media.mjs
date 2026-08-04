/**
 * Step 2 of IMAGE_EXTRACTOR_PROMPT.md — download/copy every Home page media
 * source into cms/public/uploads/extracted/home-page/ and write the reference
 * manifest to cms/seed-manifests/home-page/manifest.json.
 *
 *   node scripts/extract-home-media.mjs
 *
 * Verification rules: HTTP 200, Content-Type image/* or video/*, size > 0.
 * A row failing any check is recorded as `status: "broken"` and nothing is
 * written to disk for it — the broken-link replacement flow is handled by a
 * human afterward (see REPLACEMENTS below).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homeMediaRows, PAGE_NAME } from './home-media-sources.mjs';

const CMS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.resolve(CMS_ROOT, '..');
const OUT_DIR = path.join(CMS_ROOT, 'public', 'uploads', 'extracted', PAGE_NAME);
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', PAGE_NAME, 'manifest.json');

/**
 * User-approved replacements for sources that failed verification, keyed by
 * localFile. Filled in after the interactive broken-link flow.
 * @type {Record<string, string>}
 */
const REPLACEMENTS = {
  // https://climatesupportfacility.org/logo.png returns HTTP 403 for every request.
  // User picked the real CFBF brand mark already used in frontend/components/Navbar.tsx.
  'structured-data-logo.svg':
    'https://infracredit.ng/climate-facility/wp-content/uploads/2022/09/Climate-Facility.svg',
};

async function fetchToFile(url, destination) {
  const response = await fetch(url, { redirect: 'follow' });
  if (response.status !== 200) {
    return { ok: false, reason: `HTTP ${response.status}` };
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!/^(image|video)\//i.test(contentType)) {
    return { ok: false, reason: `unexpected content-type "${contentType || 'none'}"` };
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) {
    return { ok: false, reason: 'zero bytes' };
  }
  await fs.writeFile(destination, bytes);
  const { size } = await fs.stat(destination);
  if (size === 0) {
    await fs.rm(destination, { force: true });
    return { ok: false, reason: 'zero bytes on disk' };
  }
  return { ok: true, size, contentType };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });

  const manifest = [];
  const broken = [];

  for (const row of homeMediaRows) {
    const destination = path.join(OUT_DIR, row.localFile);
    const entry = {
      component: row.component,
      paths: row.paths,
      source: row.source,
      altText: row.altText,
      localFile: row.localFile,
      status: 'ok',
    };

    if (row.localSource) {
      // Local asset — copy, never re-download.
      const from = path.join(REPO_ROOT, row.localSource);
      try {
        await fs.copyFile(from, destination);
        const { size } = await fs.stat(destination);
        if (size === 0) throw new Error('zero bytes');
        console.log(`copied  ${row.localFile}  (${size} bytes)`);
      } catch (error) {
        entry.status = 'broken';
        entry.error = `local copy failed: ${error.message}`;
        broken.push({ ...entry });
        console.error(`BROKEN  ${row.localFile}  <- ${row.localSource}: ${error.message}`);
      }
      manifest.push(entry);
      continue;
    }

    const replacement = REPLACEMENTS[row.localFile];
    const url = replacement ?? row.source;
    const result = await fetchToFile(url, destination);

    if (!result.ok) {
      entry.status = 'broken';
      entry.error = result.reason;
      broken.push({ ...entry });
      console.error(`BROKEN  ${row.localFile}  <- ${url}: ${result.reason}`);
    } else {
      if (replacement) {
        entry.replacedBrokenSource = true;
        entry.originalSource = row.source;
        entry.source = replacement;
      }
      console.log(`saved   ${row.localFile}  (${result.size} bytes, ${result.contentType})`);
    }
    manifest.push(entry);
  }

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(`\n${manifest.length} rows -> ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);
  if (broken.length) {
    console.log(`\n${broken.length} BROKEN row(s) needing the replacement flow:`);
    for (const row of broken) console.log(`  - ${row.localFile}  ${row.source}  (${row.error})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
