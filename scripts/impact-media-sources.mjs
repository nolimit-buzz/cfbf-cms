/**
 * Impact page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image/video source rendered on the Impact page. The net-zero
 * progress wheel (frontend/app/impact/page.tsx:774-795) is NOT listed: its
 * `<svg>` is generated at render time from the polar()/arc() helpers at :20-36,
 * so it is code, not an asset and not static markup. Every other glyph on the
 * page is a lucide-react component. There is no background-image, no <iframe>
 * and no /assets path on this page.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 * `localFile` follows the `section-field` naming convention, except for the
 * story videos: only three distinct files back the six stories, so rows that
 * share a file share a `localFile` (named after the source video) and therefore
 * a single Cloudinary upload and URL.
 *
 * Sources traced from:
 *   frontend/app/impact/page.tsx
 *   frontend/components/GlassHero.tsx
 */

const UNSPLASH = 'https://images.unsplash.com';

export const PAGE_NAME = 'impact-page';
export const CLOUDINARY_FOLDER = 'climate facility/impact-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source?:string, localSource?:string, altText:string, localFile:string}[]} */
export const impactMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/impact/page.tsx:326 bgImage -> GlassHero.tsx:87 <motion.img src={bgImage}>
    // alt falls back to 'Hero banner' because the title is a JSX fragment.
    component: 'impact-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop`,
    altText: 'Hero banner',
    localFile: 'hero-background-image.jpg',
  },

  // ── stories-tab-section → stories[].image ─────────────────────────────────
  // STORIES at app/impact/page.tsx:38-105, rendered :594-598 (card view) and
  // :665 (list view) with alt={story.title}.
  {
    // page.tsx:44
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Meet Felicia Adindu-End User, Darway Coast',
    localFile: 'stories-story-1-image.jpg',
  },
  {
    // page.tsx:55
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`,
    altText: 'ACOB Lighting Solar Powered Rural Electrification Project',
    localFile: 'stories-story-2-image.jpg',
  },
  {
    // page.tsx:66
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop`,
    altText: 'Prado Power Solar Powered Rural Electrification Project',
    localFile: 'stories-story-3-image.jpg',
  },
  {
    // page.tsx:77
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop`,
    altText: 'Mesh Grid Networks Powering Agriculture - First Electric',
    localFile: 'stories-story-4-image.jpg',
  },
  {
    // page.tsx:88
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 4 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Unlocking Local Capital for Off-Grid Power - CEESOLAR',
    localFile: 'stories-story-5-image.jpg',
  },
  {
    // page.tsx:99
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 5 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop`,
    altText: 'Solarizing Rural Telecom Infrastructure - Hotspot Network',
    localFile: 'stories-story-6-image.jpg',
  },

  // ── stories-tab-section → stories[].video ─────────────────────────────────
  // Local files under frontend/public/videos, played by the modal at
  // page.tsx:1196-1201. Three distinct files across six stories: rows 1 & 4
  // share solar-panels, 2 & 5 wind-turbines, 3 & 6 infracredit-hotspot, so each
  // file is copied and uploaded once and both rows point at the same URL.
  // No alt text — a <video> has no alt attribute (see NO_ALT_TEXT).
  {
    // page.tsx:47
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 0 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/solar-panels.mp4',
    altText: '',
    localFile: 'stories-story-video-solar-panels.mp4',
  },
  {
    // page.tsx:58
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 1 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/wind-turbines.mp4',
    altText: '',
    localFile: 'stories-story-video-wind-turbines.mp4',
  },
  {
    // page.tsx:69
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 2 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/infracredit-hotspot.mp4',
    altText: '',
    localFile: 'stories-story-video-infracredit-hotspot.mp4',
  },
  {
    // page.tsx:80 — same file as story 1
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 3 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/solar-panels.mp4',
    altText: '',
    localFile: 'stories-story-video-solar-panels.mp4',
  },
  {
    // page.tsx:91 — same file as story 2
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 4 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/wind-turbines.mp4',
    altText: '',
    localFile: 'stories-story-video-wind-turbines.mp4',
  },
  {
    // page.tsx:102 — same file as story 3
    component: 'impact-page.stories-tab-section',
    paths: [[{ field: 'stories', index: 5 }, { field: 'video' }]],
    localSource: 'frontend/public/videos/infracredit-hotspot.mp4',
    altText: '',
    localFile: 'stories-story-video-infracredit-hotspot.mp4',
  },

  // ── investments-tab-section → sdgCards[].image ────────────────────────────
  {
    // page.tsx:897-901 SDG 7
    component: 'impact-page.investments-tab-section',
    paths: [[{ field: 'sdgCards', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop`,
    altText: 'Affordable & Clean Energy background',
    localFile: 'investments-sdg-1-image.jpg',
  },
  {
    // page.tsx:931-935 SDG 8
    component: 'impact-page.investments-tab-section',
    paths: [[{ field: 'sdgCards', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop`,
    altText: 'Decent Work & Growth background',
    localFile: 'investments-sdg-2-image.jpg',
  },
  {
    // page.tsx:965-969 SDG 9
    component: 'impact-page.investments-tab-section',
    paths: [[{ field: 'sdgCards', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1548550023-2bdb3c5beed7?q=80&w=600&auto=format&fit=crop`,
    altText: 'Industry & Infrastructure background',
    localFile: 'investments-sdg-3-image.jpg',
  },
  {
    // page.tsx:999-1003 SDG 13
    component: 'impact-page.investments-tab-section',
    paths: [[{ field: 'sdgCards', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop`,
    altText: 'Climate action background',
    localFile: 'investments-sdg-4-image.jpg',
  },
];
