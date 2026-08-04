/**
 * Contact page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image source rendered on the Contact page. Three exist.
 *
 * NOT listed:
 *   - the custom TrendingUp glyph at frontend/app/contact/page.tsx:79-82. It is a
 *     literal inline <svg> block, so it is an `svg` row: never downloaded, seeded
 *     as markup instead. Its markup lives in
 *     seed-manifests/contact-page/stat-icon.svg and is patched into
 *     fun-stats-section.statIconSvg by apply-contact-media-to-cms.cjs — the same
 *     treatment as the Projects footprint map (apply-projects-media-to-cms.cjs:31-42).
 *   - /download.pdf on the brochure CTA (page.tsx:723-725) — a download href, not
 *     a rendered media source. Same call as the eligibility factsheet PDF
 *     (eligibility-media-sources.mjs:14-16).
 *   - every glyph on the page: lucide-react components.
 *   - the decorative gradients at page.tsx:63 / :708 and GlassHero.tsx:93-103.
 *   - aria-label="Go to slide N" (page.tsx:111) — copy, not image alt text.
 * There is no <video>, no <iframe>, no bg-[url(...)], no /assets path and no
 * commented-out media anywhere in the subtree.
 *
 * The download-CTA photo is the exact URL already uploaded for the Eligibility
 * final CTA (photo-1509391366360 at w=1400). It is still extracted locally under
 * its own `section-field` name, but resolve-contact-cloudinary.mjs points the row
 * at the existing Cloudinary asset rather than duplicating the upload.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 *
 * Sources traced from:
 *   frontend/app/contact/page.tsx
 *   frontend/components/GlassHero.tsx
 */

const UNSPLASH = 'https://images.unsplash.com';

export const PAGE_NAME = 'contact-page';
export const CLOUDINARY_FOLDER = 'climate facility/contact-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source?:string, localSource?:string, altText:string, localFile:string}[]} */
export const contactMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/contact/page.tsx:220 bgImage -> GlassHero.tsx:87-92 <motion.img src={bgImage}>
    // alt falls back to 'Hero banner' because the title is a JSX fragment.
    component: 'contact-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Hero banner',
    localFile: 'hero-background-image.jpg',
  },

  // ── fun-stats-section ─────────────────────────────────────────────────────
  {
    // app/contact/page.tsx:57-62 — CSS backgroundImage on a decorative div behind
    // the carousel card. No alt/aria-label exists on it, so altText is empty.
    component: 'contact-page.fun-stats-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1548550023-2bdb3c5beed7?q=80&w=1200&auto=format&fit=crop`,
    altText: '',
    localFile: 'fun-stats-background-image.jpg',
  },

  // ── download-cta-section ──────────────────────────────────────────────────
  {
    // app/contact/page.tsx:703-707 <img src=... alt=...>
    component: 'contact-page.download-cta-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop`,
    altText: 'CFBF Brochure Background',
    localFile: 'download-cta-background-image.jpg',
  },
];
