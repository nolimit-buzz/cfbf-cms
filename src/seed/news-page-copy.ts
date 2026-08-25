/**
 * NEWS page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/news/page.tsx                    -> structured-data-section,
 *                                                    hero-section (GlassHero + slider),
 *                                                    listing-section (SectionHeader,
 *                                                      view tabs, category filters),
 *                                                    articles-section (card CTA),
 *                                                    next-steps-section
 *   frontend/lib/newsData.ts                      -> articles-section (all 5 articles)
 *   frontend/components/news/NewsDetailClient.tsx -> article-detail-section
 *   frontend/app/news/[id]/page.tsx               -> article-detail-section (loadingLabel)
 *   frontend/components/GlassHero.tsx             -> hero-section (breadcrumb home label)
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and
 * the array order matches the render order in frontend/app/news/page.tsx.
 *
 * The /news/[id] detail route has no single type of its own — all of its chrome
 * copy lives in `news-page.article-detail-section`, the same way the eligibility
 * page owns the copy for its /eligibility/assessment sub-page.
 *
 * Strings the frontend derives or repeats at runtime are written out here as
 * explicit fields so no user-facing copy is left hardcoded:
 *   - the two-toned headings, split into headingPartOne / headingHighlight
 *     ("News &" + "media center", "Related" + "updates", "Explore the" +
 *     "facility portal")
 *   - the "Read Article" CTA, which appears in the hero slider, the grid cards
 *     and the related-articles cards — seeded once per section that renders it
 *   - the slider and share-button aria-labels
 *   - the prev/next empty states ("First article" / "Latest article")
 *   - the breadcrumb segments ("home", "news", "/ news / ")
 *
 * On the article items, `lib/newsData.ts`'s `type` field is renamed `blockType`
 * (Strapi reserves `type`), and `themes: string[]` becomes `[{ label }]` to fit
 * the repeatable-component shape. Both mirror the existing home-page.news-*
 * components.
 */

const META_DESCRIPTION =
  'Stay updated on the green transition, market insights, and announcements from the Climate Finance Blending Facility.';

/**
 * The hero backdrop is served from our own Cloudinary account (folder
 * `climate facility/news-page`) — see cms/seed-manifests/news-page/manifest.json.
 *
 * The two articles below are real CFBF press releases (not the fabricated
 * placeholder set the Home page used to share this asset pool with), so their
 * images are plain Unsplash stock photos for now rather than Cloudinary assets
 * — no Cloudinary upload has been done for them yet.
 */
// The /v<n>/ segment is the hero asset's own Cloudinary version — kept verbatim
// from the manifest's secure_url rather than shared across assets.
const HERO_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785842211/climate%20facility/news-page/hero-bg-image.jpg';
const HERO_IMAGE_ALT = 'Hero banner';

const READ_ARTICLE = 'Read Article';

const ARTICLE_1_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop';
const ARTICLE_2_IMAGE =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop';

export const newsSections = [
  {
    __component: 'news-page.structured-data-section' as const,
    pageTitle: 'News, insights & press releases | CFBF',
    metaDescription: META_DESCRIPTION,
    dcTitle: 'News & media center - climate finance blending facility',
    dcCreator: 'NoLimitBuzz',
    dcSubject:
      'Climate Finance, Green Bonds, Renewable Energy, Market Insights',
    dcDescription:
      'Insights and press releases from the Climate Finance Blending Facility.',
    dcPublisher: 'Climate Finance Blending Facility',
    dcLanguage: 'en',
    dcType: 'News Archive',
    schemaName: 'News & Media | Climate Finance Blending Facility',
    schemaDescription:
      'Stay updated on the green transition, market insights, fund updates, and impact reports from the Climate Finance Blending Facility.',
    schemaUrl: 'https://climatesupportfacility.org/news',
    parentOrganizationName: 'Climate Finance Blending Facility (CFBF)',
  },

  {
    __component: 'news-page.hero-section' as const,
    subtitle: 'Stay updated on the green transition',
    headingPartOne: 'News &',
    headingHighlight: 'media center',
    bgImage: HERO_IMAGE,
    bgImage_alt_text: HERO_IMAGE_ALT,
    breadcrumbHomeLabel: 'home',
    breadcrumbCurrentPage: 'news',
    cardCtaLabel: READ_ARTICLE,
    prevAriaLabel: 'Previous articles',
    nextAriaLabel: 'Next articles',
  },

  {
    __component: 'news-page.listing-section' as const,
    sectionSub: 'Latest Updates',
    sectionTitle: 'Insights, announcements and press statements',
    viewTabs: [
      { tabId: 'grid', label: 'Grid View' },
      { tabId: 'list', label: 'List View' },
    ],
    categories: [
      { label: 'All' },
      { label: 'Market Insights' },
      { label: 'Fund Updates' },
      { label: 'Impact Report' },
      { label: 'Industry News' },
    ],
  },

  {
    __component: 'news-page.articles-section' as const,
    gridCtaLabel: READ_ARTICLE,
    articles: [
      {
        articleId: '1',
        tag: 'Fund Updates',
        date: 'December 12, 2025',
        readTime: '4 min read',
        title:
          "Climate Finance Blending Facility Enables Local Currency Financing for CEESOLAR's Off-Grid Energy Project in Cross River State",
        excerpt:
          'CFBF\'s fifth transaction backs four solar hybrid mini-grids in Cross River State, set to electrify 3,600 households and businesses.',
        author: 'Climate Finance Blending Facility',
        authorAvatar: ARTICLE_1_IMAGE,
        authorAvatar_alt_text: 'Climate Finance Blending Facility',
        image: ARTICLE_1_IMAGE,
        image_alt_text:
          "Climate Finance Blending Facility Enables Local Currency Financing for CEESOLAR's Off-Grid Energy Project in Cross River State",
        keyContext:
          'CFBF\'s fifth transaction backs four solar hybrid mini-grids in Cross River State, set to electrify 3,600 households and businesses.',
        themes: [
          { label: 'LOCAL CURRENCY' },
          { label: 'MINI-GRIDS' },
          { label: 'CROSS RIVER' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: "The Climate Finance Blending Facility (CFBF), a catalytic first-loss multi-donor co-financing facility for off-grid clean energy projects in Nigeria, has mobilized long-term local currency financing for CEESOLAR Energy Limited's renewable energy initiative in Cross River State. This represents the fifth transaction supported by the facility, which operates with £10 million in concessional capital from the UK Foreign, Commonwealth & Development Office (FCDO), supplemented by US$10 million from British International Investment (BII) and a US$20 million counter-guarantee facility.",
          },
          {
            blockType: 'p',
            text: 'The initiative will construct and commission four isolated solar hybrid mini-grids with a combined capacity of 760 kWp across underserved communities. Upon completion, these installations are projected to electrify approximately 3,600 households and small businesses, generate an estimated 561 jobs, and prevent over 737 tonnes of annual CO₂ emissions. The project aligns with Nigeria\'s universal electrification agenda and supports Sustainable Development Goal 7.',
          },
          {
            blockType: 'p',
            text: 'Earlier projects financed through the CFBF have deployed approximately ₦9 billion across four developers — Darway, Hotspot, ACOB, and Prado — reaching over 25,000 beneficiaries, creating more than 2,300 jobs, and installing approximately 1.7 MW of capacity. The facility has generated a pipeline of approximately ₦243.31 billion across 23 developers.',
          },
          { blockType: 'h2', text: 'Construction Finance Warehouse Facility' },
          {
            blockType: 'p',
            text: "The CEESOLAR transaction benefited from InfraCredit's Construction Finance Warehouse Facility (CFWF), funded by the Nigeria Sovereign Investment Authority (NSIA), which provides short-term bridge financing to address construction-period liquidity gaps — demonstrating InfraCredit's integrated, end-to-end approach to unlocking capital for sustainable infrastructure projects.",
          },
          {
            blockType: 'p',
            text: "The CFBF combines subordinated first-loss capital from FCDO and development partners with technical assistance from FSD Africa and InfraCredit's 'AAA'-rated guarantees to mobilize long-term domestic institutional capital for distributed renewable energy. The transaction also reflects a strategic partnership between InfraCredit and the Africa Minigrid Developers Association (AMDA), improving access to long-term domestic financing for member developers.",
          },
          {
            blockType: 'blockquote',
            text: '"We are delighted that the UK-funded Climate Finance Blending Facility continues to catalyse local currency debt for renewable energy infrastructure." — Jonny Baxter, UK Deputy High Commissioner in Lagos',
          },
          {
            blockType: 'blockquote',
            text: '"This milestone reflects CEESOLAR\'s commitment to bridging Nigeria\'s energy gap through innovation and collaboration." — Chibueze Ekeh, CEO of CEESOLAR Energy Limited',
          },
          {
            blockType: 'p',
            text: 'InfraCredit CEO Chinua Azubike noted that "this transaction demonstrates the power of partnership — combining catalytic first-loss capital," while AMDA CEO Olamide Niyi-Afuye commented that "this milestone underscores the growing confidence in the capacity of AMDA\'s members to scale."',
          },
          {
            blockType: 'p',
            text: "The project is registered under the World Bank's Distributed Access through Renewable Energy Scale-up (DARES) Performance-Based Grant Programme, administered by the Rural Electrification Agency (REA). InfraCredit and REA signed a Memorandum of Understanding in August 2022 to address long-term financing bottlenecks for off-grid operators.",
          },
          { blockType: 'h2', text: 'About CEESOLAR' },
          {
            blockType: 'p',
            text: 'CEESOLAR Energy Limited is a renewable energy company providing energy access through decentralized energy systems since 2017. The company has installed 729.5kWp of capacity across mini-grid and stand-alone installations, with over 695 connections across multiple Nigerian states.',
          },
        ],
      },

      {
        articleId: '2',
        tag: 'Fund Updates',
        date: 'January 26, 2026',
        readTime: '4 min read',
        title:
          "Climate Finance Blending Facility Supports Local Currency Financing for First Electric's Off-Grid Energy Project in Nigeria",
        excerpt:
          "CFBF's sixth transaction — and first mesh-grid project — backs First Electric's 20 mesh-grid networks across three states.",
        author: 'Climate Finance Blending Facility',
        authorAvatar: ARTICLE_2_IMAGE,
        authorAvatar_alt_text: 'Climate Finance Blending Facility',
        image: ARTICLE_2_IMAGE,
        image_alt_text:
          "Climate Finance Blending Facility Supports Local Currency Financing for First Electric's Off-Grid Energy Project in Nigeria",
        keyContext:
          "CFBF's sixth transaction — and first mesh-grid project — backs First Electric's 20 mesh-grid networks across three states.",
        themes: [
          { label: 'MESH GRID' },
          { label: 'LOCAL CURRENCY' },
          { label: 'PARTNERSHIP' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The Climate Finance Blending Facility (CFBF), a catalytic first-loss, multi-donor co-financing mechanism for off-grid clean energy initiatives in Nigeria, has facilitated long-term local currency financing for First Electric Power and Automation Services Limited. This represents the sixth transaction under the program and marks the inaugural mesh-grid infrastructure project supported by CFBF.',
          },
          {
            blockType: 'p',
            text: 'The initiative encompasses 20 mesh-grid electricity networks totaling 724.8 kWp of capacity across Gombe, Nasarawa, and Ondo States. Upon completion, the project is projected to provide electricity to approximately 5,156 households and businesses, generate roughly 616 jobs, and reduce annual carbon emissions by 762 tonnes.',
          },
          {
            blockType: 'p',
            text: "Previous CFBF projects have deployed approximately ₦12 billion across five developers, reaching over 28,000 beneficiaries and establishing approximately 1.8 MW of off-grid solar capacity. The facility's current pipeline encompasses ₦243.31 billion across 23 developers.",
          },
          { blockType: 'h2', text: 'Construction Finance Warehouse Facility' },
          {
            blockType: 'p',
            text: "First Electric also received support from InfraCredit's Construction Finance Warehouse Facility, funded by the Nigeria Sovereign Investment Authority, which provided temporary liquidity during the construction phase before long-term refinancing.",
          },
          {
            blockType: 'blockquote',
            text: '"This transaction marks the Facility\'s first investment in innovative mesh grid projects, designed to lower the cost of distributed renewable energy solutions for rural and remote communities." — UK Deputy High Commissioner',
          },
          {
            blockType: 'p',
            text: 'InfraCredit CEO Chinua Azubike said the guarantee represents "the Facility\'s first investment in mesh-grid infrastructure and underscores the scale and maturity the platform has now achieved" in financing distributed renewable energy across Nigeria. First Electric CEO Daniel Komolafe emphasized the company\'s commitment to "bridging Nigeria\'s energy gap through innovation and collaboration," demonstrating that clean energy solutions can be commercially viable and sustainable. AMDA CEO Olamide Niyi-Afuye added that the transaction "demonstrates the transformative power of strategic partnerships in advancing energy access" and provides a blueprint for scaling distributed renewable energy across Africa.',
          },
          {
            blockType: 'p',
            text: "The project is registered under the World Bank's Distributed Access through Renewable Energy Scale-up (DARES) Performance-Based Grant Programme. Technical and due diligence costs received support from FSD Africa through a Technical Assistance Agreement aimed at reducing barriers for first-time issuers.",
          },
          { blockType: 'h2', text: 'About the Organizations' },
          {
            blockType: 'p',
            text: 'Climate Finance Blending Facility: Capitalized with $21.3 million in concessional funding from the UK Foreign, Commonwealth & Development Office and British International Investment, the facility mobilizes capital through first-loss risk sharing alongside InfraCredit\'s local currency guarantees.',
          },
          {
            blockType: 'p',
            text: 'First Electric: Incorporated in 2019, this Nigerian renewable energy company designs, develops, and operates mesh-grids, microgrids, and stand-alone solar systems for rural communities, currently operating approximately 250 active Energy-as-a-Service connections across Lagos, Abuja, and Ondo States.',
          },
          {
            blockType: 'p',
            text: "InfraCredit: Established in 2017 as a specialized local currency infrastructure credit guarantee institution, InfraCredit holds 'AAA'(NG) ratings and supports long-term local currency infrastructure financing in Nigeria through guarantees that attract domestic institutional capital.",
          },
        ],
      },
    ],
  },

  {
    __component: 'news-page.article-detail-section' as const,
    loadingLabel: 'Loading article...',
    notFoundTitle: 'Article Not Found',
    notFoundBody:
      'The news article you are looking for does not exist or has been moved.',
    notFoundCtaLabel: 'Back to News Hub',
    copyLinkAlert: 'Article link copied to clipboard!',
    titleSuffix: ' | News & Insights',
    publisherName: 'Climate Finance Blending Facility (CFBF)',
    publisherLogoUrl: 'https://climatesupportfacility.org/logo.png',
    dcPublisher: 'Climate Finance Blending Facility',
    dcLanguage: 'en',
    dcType: 'News Article',
    breadcrumbParentLabel: 'news',
    breadcrumbPrefix: '/ news / ',
    backLabel: 'Back to News Hub',
    postedByLabel: 'Posted by',
    themesLabel: 'Themes',
    contextLabel: 'Context',
    shareLabel: 'Share',
    shareLinkedinAriaLabel: 'Share on LinkedIn',
    shareTwitterAriaLabel: 'Share on Twitter',
    shareFacebookAriaLabel: 'Share on Facebook',
    copyLinkAriaLabel: 'Copy Link',
    publishedInPrefix: 'Published in ',
    previousArticleLabel: 'Previous Article',
    firstArticleLabel: 'First article',
    nextArticleLabel: 'Next Article',
    latestArticleLabel: 'Latest article',
    relatedHeadingPartOne: 'Related',
    relatedHeadingHighlight: 'updates',
    relatedCtaLabel: READ_ARTICLE,
  },

  {
    __component: 'news-page.next-steps-section' as const,
    eyebrow: 'Next steps',
    headingPartOne: 'Explore the',
    headingItalic: 'facility portal',
    links: [
      {
        eyebrow: 'Portfolio',
        title: 'Browse portfolio',
        description: 'Discover how our credit wraps support developers',
        href: '/projects',
      },
      {
        eyebrow: 'Architecture',
        title: 'Learn how it works',
        description: 'Understand our blending process & structures',
        href: '/how-it-works',
      },
      {
        eyebrow: 'Impact',
        title: 'View our impact',
        description: 'Explore carbon targets and video stories',
        href: '/impact',
      },
    ],
  },
];
