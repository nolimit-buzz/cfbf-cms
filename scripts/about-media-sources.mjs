/**
 * About page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image/video source rendered on the About page. Inline SVG
 * rows are NOT listed here — the Nigeria map markup is seeded directly in
 * cms/src/seed/about-page-copy.ts and is never downloaded.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 * `localFile` follows the `section-field` naming convention.
 *
 * Sources traced from:
 *   frontend/app/about/page.tsx
 *   frontend/components/about-v3/MilestonesTimelineV3.tsx
 *   frontend/components/about-v3/PartnerShowcase.tsx
 */

const UNSPLASH = 'https://images.unsplash.com';
const WP = 'https://infracredit.ng/climate-facility/wp-content/uploads';

export const PAGE_NAME = 'about-page';
export const CLOUDINARY_FOLDER = 'climate facility/about-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source:string, localSource?:string, altText:string, localFile:string}[]} */
export const aboutMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/about/page.tsx:124 -> GlassHero.tsx:88 <motion.img src={bgImage}>
    component: 'about-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop`,
    altText: 'Hero banner',
    localFile: 'hero-background-image.jpg',
  },
  {
    // app/about/page.tsx:153-155
    component: 'about-page.hero-section',
    paths: [[{ field: 'statImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Wind turbines',
    localFile: 'hero-stat-image.jpg',
  },

  // ── mandate-section ───────────────────────────────────────────────────────
  {
    // app/about/page.tsx:247-248 — local asset, copied not downloaded.
    component: 'about-page.mandate-section',
    paths: [[{ field: 'bentoVideo' }]],
    source: '/videos/solar-panels.mp4',
    localSource: 'frontend/public/videos/solar-panels.mp4',
    altText: '',
    localFile: 'mandate-bento-video.mp4',
  },
  {
    // app/about/page.tsx:280-282 — caption "Solar Installation"
    component: 'about-page.mandate-section',
    paths: [[{ field: 'captions', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Solar panels installer',
    localFile: 'mandate-caption-2-image.jpg',
  },
  {
    // app/about/page.tsx:293-295 — caption "Local Clean Power"
    component: 'about-page.mandate-section',
    paths: [[{ field: 'captions', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop`,
    altText: 'Rural shop solar powered business',
    localFile: 'mandate-caption-3-image.jpg',
  },

  // ── market-section ────────────────────────────────────────────────────────
  {
    // app/about/page.tsx:359-361 — bento "Card 2" is image-only and has no
    // entry in the seed `cards[]` array, so this is a section-level field.
    component: 'about-page.market-section',
    paths: [[{ field: 'bentoImage' }]],
    source: `${UNSPLASH}/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop`,
    altText: 'Modern office building representing commercial growth',
    localFile: 'market-bento-image.jpg',
  },

  // ── framework-section ─────────────────────────────────────────────────────
  {
    // app/about/page.tsx:463 — rendered at :476-478, alt={item.title}
    component: 'about-page.framework-section',
    paths: [[{ field: 'cards', index: 0 }, { field: 'bgImage' }]],
    source: `${UNSPLASH}/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop`,
    altText: 'Risk sharing',
    localFile: 'framework-card-1-bg-image.jpg',
  },
  {
    component: 'about-page.framework-section',
    paths: [[{ field: 'cards', index: 1 }, { field: 'bgImage' }]],
    source: `${UNSPLASH}/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop`,
    altText: 'Local currency funding',
    localFile: 'framework-card-2-bg-image.jpg',
  },
  {
    component: 'about-page.framework-section',
    paths: [[{ field: 'cards', index: 2 }, { field: 'bgImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop`,
    altText: 'Blended finance',
    localFile: 'framework-card-3-bg-image.jpg',
  },

  // ── partners-section ──────────────────────────────────────────────────────
  {
    // PartnerShowcase.tsx:76
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 0 }, { field: 'partners', index: 0 }, { field: 'logo' }]],
    source: `${WP}/2022/10/UK-DEVELOPMENT-WHITE.png`,
    altText: 'UK International Development',
    localFile: 'partners-group-1-partner-1-logo.png',
  },
  {
    // PartnerShowcase.tsx:87
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 0 }, { field: 'partners', index: 1 }, { field: 'logo' }]],
    source: `${WP}/2022/10/BII_Logo_All_white_RGB.png`,
    altText: 'British International Investment',
    localFile: 'partners-group-1-partner-2-logo.png',
  },
  {
    // PartnerShowcase.tsx:105
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 1 }, { field: 'partners', index: 0 }, { field: 'logo' }]],
    source: `${WP}/2022/10/FSD-Africa-logo-1.png`,
    altText: 'FSD Africa',
    localFile: 'partners-group-2-partner-1-logo.png',
  },
  {
    // PartnerShowcase.tsx:116
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 1 }, { field: 'partners', index: 1 }, { field: 'logo' }]],
    source: `${WP}/2022/10/Shell-foundation-1.png`,
    altText: 'Shell Foundation',
    localFile: 'partners-group-2-partner-2-logo.png',
  },
  {
    // PartnerShowcase.tsx:135 — white default
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 2 }, { field: 'partners', index: 0 }, { field: 'logo' }]],
    source: `${WP}/2022/09/ICAsset-6@4x-8-002-1024x326-1.png`,
    altText: 'InfraCredit',
    localFile: 'partners-group-3-partner-1-logo.png',
  },
  {
    // PartnerShowcase.tsx:137 — coloured hover version, used as a raster <img>
    component: 'about-page.partners-section',
    paths: [
      [{ field: 'groups', index: 2 }, { field: 'partners', index: 0 }, { field: 'logoColour' }],
    ],
    source: `${WP}/2022/09/InfraCredit-1.svg`,
    altText: 'InfraCredit',
    localFile: 'partners-group-3-partner-1-logo-colour.svg',
  },
  {
    // PartnerShowcase.tsx — Domestic Institutional Investors group, was text-only
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 0 }, { field: 'logo' }]],
    source: 'https://www.aiicoplc.com/images/AIICO_Insurance_PLC_.png',
    altText: 'AIICO Insurance',
    localFile: 'partners-group-3-partner-2-logo.png',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 1 }, { field: 'logo' }]],
    source: 'https://nem-insurance.com/assets/uploads/logo.jpg',
    altText: 'NEM Insurance',
    localFile: 'partners-group-3-partner-3-logo.jpg',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 2 }, { field: 'logo' }]],
    source: 'https://www.linkageassurance.com/wp-content/uploads/2021/05/logo-01.png',
    altText: 'Linkage Assurance',
    localFile: 'partners-group-3-partner-4-logo.png',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 3 }, { field: 'logo' }]],
    source: 'https://www.leadway.com/wp-content/uploads/2025/03/leadway_logo.webp',
    altText: 'Leadway Assurance',
    localFile: 'partners-group-3-partner-5-logo.webp',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 4 }, { field: 'logo' }]],
    source: 'https://life.tangerine.africa/images/life/logo.svg',
    altText: 'Tangerine Life',
    localFile: 'partners-group-3-partner-6-logo.svg',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 5 }, { field: 'logo' }]],
    source: 'https://cleanenergyfund.ng/assets/logo-DWwNtwmQ.png',
    altText: 'CELCF',
    localFile: 'partners-group-3-partner-7-logo.png',
  },
  {
    component: 'about-page.partners-section',
    paths: [[{ field: 'groups', index: 3 }, { field: 'partners', index: 6 }, { field: 'logo' }]],
    source: 'https://firstpensioncustodian.com/wp-content/uploads/2021/06/newlogo.png',
    altText: 'First Pension Custodian',
    localFile: 'partners-group-3-partner-8-logo.png',
  },

  // ── milestones-section ────────────────────────────────────────────────────
  {
    // MilestonesTimelineV3.tsx:19, alt={current.label}
    component: 'about-page.milestones-section',
    paths: [[{ field: 'milestones', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=900&auto=format&fit=crop`,
    altText: 'Fund seeded & framework certified',
    localFile: 'milestones-milestone-1-image.jpg',
  },
  {
    component: 'about-page.milestones-section',
    paths: [[{ field: 'milestones', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=900&auto=format&fit=crop`,
    altText: 'Deployment phase — first portfolio closed',
    localFile: 'milestones-milestone-2-image.jpg',
  },
  {
    component: 'about-page.milestones-section',
    paths: [[{ field: 'milestones', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1497440001374-f26997328c1b?q=80&w=900&auto=format&fit=crop`,
    altText: 'Portfolio consolidation — institutional co-financing expanded',
    localFile: 'milestones-milestone-3-image.jpg',
  },
  {
    component: 'about-page.milestones-section',
    paths: [[{ field: 'milestones', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1466611653911-95081537e5b7?q=80&w=900&auto=format&fit=crop`,
    altText: 'Scale-out — ₦7.86B+ pipeline mobilised',
    localFile: 'milestones-milestone-4-image.jpg',
  },

  // ── download-cta-section ──────────────────────────────────────────────────
  {
    // app/about/page.tsx:845
    component: 'about-page.download-cta-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop`,
    altText: 'CFBF Factsheet & Prospectus Background',
    localFile: 'download-cta-background-image.jpg',
  },
];
