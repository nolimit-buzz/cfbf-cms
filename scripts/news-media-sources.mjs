/**
 * News page media inventory (Step 1 of IMAGE_EXTRACTOR_PROMPT.md).
 *
 * One row per real image source rendered on the News archive (/news) and the
 * article detail route (/news/[id]). There are no inline SVG rows (every glyph
 * on the page is a lucide-react component), no video, and no iframe embeds.
 *
 * `articleDetailSection.publisherLogoUrl` is deliberately NOT inventoried — it
 * only ever appears inside the JSON-LD publisher block, never as an <img>.
 *
 * `paths` mirrors the manifest shape: a list of { field, index? } segments from
 * the section instance down to the leaf field that holds the URL.
 * `localFile` follows the `section-field` naming convention.
 *
 * Sources traced from:
 *   frontend/app/news/page.tsx                    (hero bgImage, card <img>)
 *   frontend/components/GlassHero.tsx             (hero <motion.img>)
 *   frontend/components/news/NewsDetailClient.tsx (avatar, body figure, related)
 *   frontend/lib/newsData.ts                      (the 15 article URLs)
 * and mirrored 1:1 by cms/src/seed/news-page-copy.ts.
 *
 * NOTE on Cloudinary: 15 of these 16 photos are byte-identical to assets already
 * uploaded for the Home page (`climate facility/home-page/news-*`), because the
 * Home page renders the same five articles. Per the user's decision those rows
 * reuse the existing Cloudinary assets instead of being re-uploaded — see
 * scripts/resolve-news-cloudinary.mjs. Only `hero-bg-image` is genuinely new and
 * is uploaded to `climate facility/news-page`.
 */

const UNSPLASH = 'https://images.unsplash.com';

export const PAGE_NAME = 'news-page';
export const CLOUDINARY_FOLDER = 'climate facility/news-page';

/** @type {{component:string, paths:Array<Array<{field:string,index?:number}>>, source:string, localSource?:string, altText:string, localFile:string}[]} */
export const newsMediaRows = [
  // ── hero-section ──────────────────────────────────────────────────────────
  {
    // app/news/page.tsx:90 bgImage -> GlassHero.tsx:88-89 <motion.img>.
    // `title` is a JSX fragment there, so the alt falls back to 'Hero banner'.
    component: 'news-page.hero-section',
    paths: [[{ field: 'bgImage' }]],
    source: `${UNSPLASH}/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Hero banner',
    localFile: 'hero-bg-image.jpg',
  },

  // ── articles-section → articles[].image ───────────────────────────────────
  // Rendered at page.tsx:113-117 (hero carousel), :243-247 (grid card),
  // :293-297 (list card), NewsDetailClient.tsx:120 (detail hero) and :331
  // (related card) — every one of those uses alt={article.title}.
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 0 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText:
      "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
    localFile: 'article-1-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 1 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors',
    localFile: 'article-2-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 2 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria',
    localFile: 'article-3-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 3 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1532601224476-15c79f2f7a51?q=80&w=1200&auto=format&fit=crop`,
    altText:
      'Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria',
    localFile: 'article-4-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 4 }, { field: 'image' }]],
    source: `${UNSPLASH}/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Unlocking Capital for Mini-Grids in Rural Communities',
    localFile: 'article-5-image.jpg',
  },

  // ── articles-section → articles[].authorAvatar ────────────────────────────
  // NewsDetailClient.tsx:168 <img src={article.authorAvatar} alt={article.author}>
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 0 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop`,
    altText: 'Chinua Okeke',
    localFile: 'article-1-author-avatar.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 1 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop`,
    altText: 'Folasade Adebayo',
    localFile: 'article-2-author-avatar.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 2 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop`,
    altText: 'Amina Bello',
    localFile: 'article-3-author-avatar.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 3 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop`,
    altText: 'Dr. Emmanuel Nwachukwu',
    localFile: 'article-4-author-avatar.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [[{ field: 'articles', index: 4 }, { field: 'authorAvatar' }]],
    source: `${UNSPLASH}/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop`,
    altText: 'Tunde Johnson',
    localFile: 'article-5-author-avatar.jpg',
  },

  // ── articles-section → articles[].paragraphs[].url (blockType 'image') ────
  // NewsDetailClient.tsx:222 <img src={item.url} alt={item.text}>
  {
    component: 'news-page.articles-section',
    paths: [
      [{ field: 'articles', index: 0 }, { field: 'paragraphs', index: 5 }, { field: 'url' }],
    ],
    source: `${UNSPLASH}/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Solar panels installation matching local currency investments.',
    localFile: 'article-1-paragraph-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [
      [{ field: 'articles', index: 1 }, { field: 'paragraphs', index: 5 }, { field: 'url' }],
    ],
    source: `${UNSPLASH}/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Strategic meeting finalizing the Series 2 capital raise.',
    localFile: 'article-2-paragraph-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [
      [{ field: 'articles', index: 2 }, { field: 'paragraphs', index: 5 }, { field: 'url' }],
    ],
    source: `${UNSPLASH}/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Community members benefited by solar installation.',
    localFile: 'article-3-paragraph-image.jpg',
  },
  {
    // article 4 has no blockquote before its figure, so the image sits at index 4
    component: 'news-page.articles-section',
    paths: [
      [{ field: 'articles', index: 3 }, { field: 'paragraphs', index: 4 }, { field: 'url' }],
    ],
    source: `${UNSPLASH}/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Legal books and document folders.',
    localFile: 'article-4-paragraph-image.jpg',
  },
  {
    component: 'news-page.articles-section',
    paths: [
      [{ field: 'articles', index: 4 }, { field: 'paragraphs', index: 5 }, { field: 'url' }],
    ],
    source: `${UNSPLASH}/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop`,
    altText: 'Rural solar mini-grid installation site.',
    localFile: 'article-5-paragraph-image.jpg',
  },
];
