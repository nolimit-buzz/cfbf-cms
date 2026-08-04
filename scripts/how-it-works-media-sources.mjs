/**
 * How it works page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * Nine rows / eight unique files across the page and its three local components
 * (GlassHero, ui/StepCard, ui/SectionHeader). Sources traced from:
 *   frontend/app/how-it-works/page.tsx
 *   frontend/components/GlassHero.tsx
 *
 * NOT listed:
 *   - every glyph on the page: lucide-react components (ArrowUpRight, ArrowRight,
 *     CheckCircle2). Code, not assets.
 *   - the decorative "blob" divs — Tailwind blur/gradient, no image source.
 * There is no <video>, no <iframe>, no background-image / bg-[url(...)], no
 * /assets path, and no inline <svg> markup block anywhere in the subtree — so
 * this page has no SVG-markup text fields to seed. The two .svg rows below are
 * remote files rendered through <img src>, i.e. image rows that get downloaded
 * and uploaded like any other asset.
 *
 * Reuse: seven of these sources are byte-identical URLs to assets already
 * uploaded for other pages (six partner logos on about-page, the hero photo on
 * eligibility-page). scripts/resolve-how-it-works-cloudinary.mjs matches them on
 * the full source URL and copies the existing cloudinaryUrl across, so only
 * ta-provider-3-src.png and facility-structure-diagram-src.svg are uploaded
 * fresh under `climate facility/how-it-works-page`.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 */

const BASE = 'https://infracredit.ng/climate-facility/wp-content/uploads';

export const PAGE_NAME = 'how-it-works-page';
export const CLOUDINARY_FOLDER = 'climate facility/how-it-works-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source?:string, localSource?:string, altText:string, localFile:string}[]} */
export const howItWorksMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/how-it-works/page.tsx:122 bgImage -> GlassHero.tsx:87-92 <motion.img>
    // alt falls back to 'Hero banner' because the title is a JSX fragment.
    component: 'how-it-works-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
    altText: 'Hero banner',
    localFile: 'hero-background-image.jpg',
  },

  // ── financing-structure-section: anchor funders ───────────────────────────
  {
    // page.tsx:25 -> rendered page.tsx:216 <img src={f.src} alt={f.alt}>
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'anchorFunders', index: 0 }, { field: 'src' }]],
    source: `${BASE}/2022/10/UK-DEVELOPMENT-WHITE.png`,
    altText: 'FCDO – UK Foreign, Commonwealth & Development Office',
    localFile: 'anchor-funder-1-src.png',
  },
  {
    // page.tsx:26 -> rendered page.tsx:216
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'anchorFunders', index: 1 }, { field: 'src' }]],
    source: `${BASE}/2022/10/BII_Logo_All_white_RGB.png`,
    altText: 'British International Investment',
    localFile: 'anchor-funder-2-src.png',
  },

  // ── financing-structure-section: co-financing partner ─────────────────────
  {
    // page.tsx:30 -> rendered page.tsx:229 (default state)
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'coFinancingPartner' }, { field: 'srcWhite' }]],
    source: `${BASE}/2022/09/ICAsset-6@4x-8-002-1024x326-1.png`,
    altText: 'InfraCredit',
    localFile: 'co-financing-partner-src-white.png',
  },
  {
    // page.tsx:31 -> rendered page.tsx:230. Decorative hover swap of the logo
    // above: alt="" aria-hidden="true", so altText is intentionally empty.
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'coFinancingPartner' }, { field: 'srcColour' }]],
    source: `${BASE}/2022/09/InfraCredit-1.svg`,
    altText: '',
    localFile: 'co-financing-partner-src-colour.svg',
  },

  // ── financing-structure-section: TA providers slider ──────────────────────
  {
    // page.tsx:37 -> rendered page.tsx:62 (TaSlider)
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'taProviders', index: 0 }, { field: 'src' }]],
    source: `${BASE}/2022/10/FSD-Africa-logo-1.png`,
    altText: 'FSD Africa',
    localFile: 'ta-provider-1-src.png',
  },
  {
    // page.tsx:38 -> rendered page.tsx:62
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'taProviders', index: 1 }, { field: 'src' }]],
    source: `${BASE}/2022/10/Shell-foundation-1.png`,
    altText: 'Shell Foundation',
    localFile: 'ta-provider-2-src.png',
  },
  {
    // page.tsx:39 -> rendered page.tsx:62
    component: 'how-it-works-page.financing-structure-section',
    paths: [[{ field: 'taProviders', index: 2 }, { field: 'src' }]],
    source: `${BASE}/2022/10/kfw.png`,
    altText: 'KfW',
    localFile: 'ta-provider-3-src.png',
  },

  // ── facility-structure-section ────────────────────────────────────────────
  {
    // page.tsx:272-278 <img> — the capital-flow diagram, hardcoded inline
    // rather than via BASE.
    component: 'how-it-works-page.facility-structure-section',
    paths: [[{ field: 'diagramSrc' }]],
    source: `${BASE}/2023/02/new-diagram.svg`,
    altText:
      'CFBF facility financing structure diagram — showing capital flows from anchor funders through InfraCredit guarantee to developers and communities',
    localFile: 'facility-structure-diagram-src.svg',
  },
];
