/**
 * Eligibility page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image/video source rendered on the Eligibility page. Only two
 * exist across the page and its /eligibility/assessment sub-page.
 *
 * NOT listed:
 *   - the readiness dial at frontend/app/eligibility/assessment/page.tsx:738-770.
 *     Its <svg> is two <circle> elements sized from radius/circumference and
 *     animated by framer-motion at render time, so it is code — not an asset and
 *     not static markup. Same call as the Impact net-zero wheel
 *     (impact-media-sources.mjs:6-9).
 *   - every other glyph on both pages: lucide-react components.
 *   - /wp-content/uploads/2026/05/CFBF-Factsheet-compressed.pdf — a download
 *     href on the final CTA, not a rendered media source.
 * There is no <video>, no <iframe>, no background-image/bg-[url(...)] and no
 * /assets path on either page.
 *
 * The hero and the final CTA use the same Unsplash photo id at two different
 * widths (w=1200 vs w=1400). They are two distinct URLs backing two distinct
 * fields, so they get two local files and two Cloudinary public ids, keeping the
 * `section-field` naming convention intact.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 *
 * Sources traced from:
 *   frontend/app/eligibility/page.tsx
 *   frontend/app/eligibility/assessment/page.tsx
 *   frontend/components/GlassHero.tsx
 */

const UNSPLASH = 'https://images.unsplash.com';

export const PAGE_NAME = 'eligibility-page';
export const CLOUDINARY_FOLDER = 'climate facility/eligibility-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source?:string, localSource?:string, altText:string, localFile:string}[]} */
export const eligibilityMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/eligibility/page.tsx:333 bgImage -> GlassHero.tsx:88 <motion.img src={bgImage}>
    // alt falls back to 'Hero banner' because the title is a JSX fragment.
    component: 'eligibility-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Hero banner',
    localFile: 'hero-background-image.jpg',
  },

  // ── final-cta-section ─────────────────────────────────────────────────────
  {
    // app/eligibility/page.tsx:639-641 <img src=... alt=...>
    component: 'eligibility-page.final-cta-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop`,
    altText: 'CFBF Factsheet & Assessment Background',
    localFile: 'final-cta-background-image.jpg',
  },
];
