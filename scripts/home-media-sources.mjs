/**
 * Home page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image/video source rendered on the Home page. Inline SVG rows
 * are NOT listed here — they are seeded as markup directly in
 * cms/src/seed/home-page-copy.ts and are never downloaded.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 * `localFile` follows the `section-field` naming convention.
 */

const UNSPLASH = 'https://images.unsplash.com';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source:string, localSource?:string, altText:string, localFile:string}[]} */
export const homeMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    component: 'home-page.hero-section',
    paths: [[{ field: 'backgroundImage' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop`,
    altText: 'Solar Panels',
    localFile: 'hero-background-image.jpg',
  },
  {
    component: 'home-page.hero-section',
    paths: [[{ field: 'backgroundVideo' }]],
    source: '/videos/hero-bg.mp4',
    localSource: 'frontend/public/videos/hero-bg.mp4',
    altText: '',
    localFile: 'hero-background-video.mp4',
  },
  {
    component: 'home-page.hero-section',
    paths: [[{ field: 'certificationBadge' }]],
    source:
      'https://infracredit.ng/climate-facility/wp-content/uploads/2023/01/climate-bond-standard-certfied.svg',
    altText: 'Climate Bonds Certified',
    localFile: 'hero-certification-badge.svg',
  },

  // ── about-section ─────────────────────────────────────────────────────────
  {
    component: 'home-page.about-section',
    paths: [[{ field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Solar Panels Cloudy Sky',
    localFile: 'about-image.jpg',
  },

  // ── impact-section ────────────────────────────────────────────────────────
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'gallerySlides', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop`,
    altText: 'Cross section of participants representing various institutions.',
    localFile: 'impact-gallery-slide-1-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'gallerySlides', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop`,
    altText: 'Technical workshop session on solar mini-grid maintenance.',
    localFile: 'impact-gallery-slide-2-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'gallerySlides', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop`,
    altText: 'Site inspection and field training with local engineers.',
    localFile: 'impact-gallery-slide-3-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'theoryCards', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Clean Energy Access',
    localFile: 'impact-theory-card-1-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'theoryCards', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Development Assistance',
    localFile: 'impact-theory-card-3-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'metricCards', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Communities Served',
    localFile: 'impact-metric-card-2-image.jpg',
  },
  {
    component: 'home-page.impact-section',
    paths: [[{ field: 'metricCards', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Capacity Installed',
    localFile: 'impact-metric-card-4-image.jpg',
  },

  // ── projects-section ──────────────────────────────────────────────────────
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Darway Coast, Nigeria',
    localFile: 'project-1-image.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 0 }, { field: 'imageOne' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-1-image-one.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 0 }, { field: 'imageTwo' }]],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-1-image-two.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Hotspot Network',
    localFile: 'project-2-image.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 1 }, { field: 'imageOne' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-2-image-one.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 1 }, { field: 'imageTwo' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-2-image-two.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`,
    altText: 'Prado Power Energy',
    localFile: 'project-3-image.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 2 }, { field: 'imageOne' }]],
    source: `${UNSPLASH}/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-3-image-one.jpg',
  },
  {
    component: 'home-page.projects-section',
    paths: [[{ field: 'projects', index: 2 }, { field: 'imageTwo' }]],
    source: `${UNSPLASH}/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`,
    altText: 'Project detail',
    localFile: 'project-3-image-two.jpg',
  },

  // ── stories-section ───────────────────────────────────────────────────────
  {
    component: 'home-page.stories-section',
    paths: [[{ field: 'stories', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop`,
    altText: 'Meet Felicia Adindu-End User, Darway Coast',
    localFile: 'story-1-image.jpg',
  },
  {
    component: 'home-page.stories-section',
    paths: [[{ field: 'stories', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`,
    altText: 'ACOB Lighting Solar Powered Rural Electrification Project',
    localFile: 'story-2-image.jpg',
  },
  {
    component: 'home-page.stories-section',
    paths: [[{ field: 'stories', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop`,
    altText: 'Prado Power Solar Powered Rural Electrification Project',
    localFile: 'story-3-image.jpg',
  },

  // ── news-section ──────────────────────────────────────────────────────────
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 0 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop`,
    altText: 'Chinua Okeke',
    localFile: 'news-1-author-avatar.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText:
      "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
    localFile: 'news-1-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 0 }, { field: 'paragraphs', index: 5 }, { field: 'url' }]],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Solar panels installation matching local currency investments.',
    localFile: 'news-1-paragraph-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 1 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop`,
    altText: 'Folasade Adebayo',
    localFile: 'news-2-author-avatar.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors',
    localFile: 'news-2-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 1 }, { field: 'paragraphs', index: 5 }, { field: 'url' }]],
    source: `${UNSPLASH}/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Strategic meeting finalizing the Series 2 capital raise.',
    localFile: 'news-2-paragraph-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 2 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop`,
    altText: 'Amina Bello',
    localFile: 'news-3-author-avatar.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria',
    localFile: 'news-3-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 2 }, { field: 'paragraphs', index: 5 }, { field: 'url' }]],
    source: `${UNSPLASH}/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Community members benefited by solar installation.',
    localFile: 'news-3-paragraph-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 3 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop`,
    altText: 'Dr. Emmanuel Nwachukwu',
    localFile: 'news-4-author-avatar.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1532601224476-15c79f2f7a51?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria',
    localFile: 'news-4-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 3 }, { field: 'paragraphs', index: 4 }, { field: 'url' }]],
    source: `${UNSPLASH}/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Legal books and document folders.',
    localFile: 'news-4-paragraph-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 4 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop`,
    altText: 'Tunde Johnson',
    localFile: 'news-5-author-avatar.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 4 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Unlocking Capital for Mini-Grids in Rural Communities',
    localFile: 'news-5-image.jpg',
  },
  {
    component: 'home-page.news-section',
    paths: [[{ field: 'articles', index: 4 }, { field: 'paragraphs', index: 5 }, { field: 'url' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Rural solar mini-grid installation site.',
    localFile: 'news-5-paragraph-image.jpg',
  },

  // ── net-zero-section ──────────────────────────────────────────────────────
  {
    component: 'home-page.net-zero-section',
    paths: [[{ field: 'image' }]],
    source: `${UNSPLASH}/photo-1532601224476-15c79f2f7a51?q=80&w=2070&auto=format&fit=crop`,
    altText: 'Nature and Energy',
    localFile: 'net-zero-image.jpg',
  },

  // ── structured-data-section ───────────────────────────────────────────────
  {
    component: 'home-page.structured-data-section',
    paths: [[{ field: 'logoUrl' }]],
    source: 'https://climatesupportfacility.org/logo.png',
    altText: 'Climate Finance Blending Facility (CFBF)',
    localFile: 'structured-data-logo.svg',
  },
];

export const PAGE_NAME = 'home-page';
export const CLOUDINARY_FOLDER = `climate facility/${PAGE_NAME}`;
