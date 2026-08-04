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
 * Every image below is served from our own Cloudinary account (folder
 * `climate facility`), not from images.unsplash.com — see
 * cms/seed-manifests/news-page/manifest.json for the source-to-asset mapping.
 *
 * The five articles rendered here are the same five the Home page renders, so
 * their assets are reused from `climate facility/home-page/news-*` rather than
 * duplicated. Only the hero backdrop is unique to this page and lives under
 * `climate facility/news-page`.
 */
// The /v<n>/ segment is each asset's own Cloudinary version — kept verbatim from
// the manifest's secure_url rather than shared across assets.
const HERO_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785842211/climate%20facility/news-page/hero-bg-image.jpg';
const HERO_IMAGE_ALT = 'Hero banner';

const READ_ARTICLE = 'Read Article';

const ARTICLE_1_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785801886/climate%20facility/home-page/news-1-image.jpg';
const ARTICLE_2_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785801888/climate%20facility/home-page/news-2-image.jpg';
const ARTICLE_3_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785801891/climate%20facility/home-page/news-3-image.jpg';
const ARTICLE_4_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785801893/climate%20facility/home-page/news-4-image.jpg';
const ARTICLE_5_IMAGE =
  'https://res.cloudinary.com/diqfojkri/image/upload/v1785801895/climate%20facility/home-page/news-5-image.jpg';

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
        tag: 'Market Insights',
        date: 'December 12, 2025',
        readTime: '5 min read',
        title:
          "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
        excerpt:
          'How local currency guarantees are de-risking investments and unlocking long-term debt from institutional investors for solar developers.',
        author: 'Chinua Okeke',
        authorAvatar:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801885/climate%20facility/home-page/news-1-author-avatar.jpg',
        authorAvatar_alt_text: 'Chinua Okeke',
        image: ARTICLE_1_IMAGE,
        image_alt_text:
          "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
        keyContext:
          'Understanding how local currency guarantees are de-risking solar energy investments.',
        themes: [
          { label: 'FINANCE' },
          { label: 'LOCAL CURRENCY' },
          { label: 'SOLAR' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The transition to clean energy in Sub-Saharan Africa faces a recurring challenge: foreign exchange risk. Historically, clean energy infrastructure projects have been funded in foreign hard currencies (USD or EUR), while their revenues are collected in local currencies (such as Naira). This mismatch leaves developers vulnerable to currency devaluations.',
          },
          { blockType: 'h2', text: 'Mitigating Currency Mismatch' },
          {
            blockType: 'p',
            text: 'To address this hurdle, the Climate Finance Blending Facility (CFBF), in collaboration with partners like InfraCredit, is pioneering local currency blended financing. By providing local currency guarantees, the facility enables local institutional investors—such as pension funds—to invest confidently in local currency green bonds. This matches the funding currency directly with local utility tariffs.',
          },
          {
            blockType: 'blockquote',
            text: 'Local currency financing is not just an alternative; it is the bedrock of sustainable infrastructure development in emerging markets.',
          },
          {
            blockType: 'p',
            text: 'By de-risking the capital structure through a first-loss tranche, the Facility attracts private commercial pension capital that would otherwise steer clear of early-stage solar developments. This creates a sustainable cycle where domestic savings fund domestic infrastructure.',
          },
          {
            blockType: 'image',
            url: 'https://res.cloudinary.com/diqfojkri/image/upload/v1785801887/climate%20facility/home-page/news-1-paragraph-image.jpg',
            url_alt_text:
              'Solar panels installation matching local currency investments.',
            text: 'Solar panels installation matching local currency investments.',
            caption:
              'Domestic pension funds represent a massive, untapped pool of long-term local capital.',
          },
          { blockType: 'h2', text: 'Expanding Beyond Solar' },
          {
            blockType: 'p',
            text: 'While solar hybrid mini-grids have been the primary beneficiary of this model, the Facility plans to expand the local currency guarantee framework to encompass clean cooling value chains and agricultural processing hubs, cementing local currency debt as a standard tool for renewable energy developers across West Africa.',
          },
        ],
      },

      {
        articleId: '2',
        tag: 'Fund Updates',
        date: 'November 20, 2025',
        readTime: '4 min read',
        title:
          'Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors',
        excerpt:
          'The facility secures additional commitments from domestic pensions and assurance funds to expand off-grid solar operations.',
        author: 'Folasade Adebayo',
        authorAvatar:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801888/climate%20facility/home-page/news-2-author-avatar.jpg',
        authorAvatar_alt_text: 'Folasade Adebayo',
        image: ARTICLE_2_IMAGE,
        image_alt_text:
          'Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors',
        keyContext:
          'A breakdown of the successful closure of our Series 2 capital raise from institutional partners.',
        themes: [
          { label: 'FUNDRAISING' },
          { label: 'INVESTORS' },
          { label: 'GROWTH' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The Climate Finance Blending Facility is thrilled to announce the successful final close of its Series 2 capital raise. The raise secured an additional ₦15 Billion from domestic institutional investors, including leading pension fund administrators and assurance companies.',
          },
          { blockType: 'h2', text: 'Unlocking Pension Liquidity' },
          {
            blockType: 'p',
            text: 'This capital raise demonstrates the growing appetite among local asset managers for yield-bearing green instruments. The capital will be immediately deployed to co-finance a pipeline of solar mini-grids and clean commercial cooling setups across Nigeria, helping developers access credit-enhanced Naira financing.',
          },
          {
            blockType: 'blockquote',
            text: 'The success of this Series 2 close signals strong institutional trust in our risk-mitigated credit guarantee structure.',
          },
          {
            blockType: 'p',
            text: "With this round of funding, the Facility's active capital pool increases significantly, enabling the de-risking of larger corporate clean energy bonds and helping developers secure up to 10-year tenor terms from domestic lenders.",
          },
          {
            blockType: 'image',
            url: 'https://res.cloudinary.com/diqfojkri/image/upload/v1785801889/climate%20facility/home-page/news-2-paragraph-image.jpg',
            url_alt_text:
              'Strategic meeting finalizing the Series 2 capital raise.',
            text: 'Strategic meeting finalizing the Series 2 capital raise.',
            caption:
              'Aligning domestic institutional capital with sustainable energy development targets.',
          },
          { blockType: 'h2', text: 'Next Milestones' },
          {
            blockType: 'p',
            text: 'Looking forward to 2026, the Facility plans to allocate capital across 12 new projects, focusing heavily on northern states where off-grid agricultural solar processing installations can drive the highest economic and social impacts.',
          },
        ],
      },

      {
        articleId: '3',
        tag: 'Impact Report',
        date: 'October 05, 2025',
        readTime: '7 min read',
        title:
          'Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria',
        excerpt:
          'A close look at how clean energy installations have impacted 2.4 million lives, created 300+ green jobs, and reduced carbon emissions.',
        author: 'Amina Bello',
        authorAvatar:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801890/climate%20facility/home-page/news-3-author-avatar.jpg',
        authorAvatar_alt_text: 'Amina Bello',
        image: ARTICLE_3_IMAGE,
        image_alt_text:
          'Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria',
        keyContext:
          'A deep dive into our verified environmental and social metrics from the 2025 Impact Report.',
        themes: [
          { label: 'ESG' },
          { label: 'SDGS' },
          { label: 'COMMUNITIES' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'Our 2025 Annual Sustainability and Impact Report has been officially released, highlighting key achievements in greenhouse gas reduction, clean energy access, and rural economic empowerment across our blended finance portfolio.',
          },
          { blockType: 'h2', text: 'Empowering Rural Livelihoods' },
          {
            blockType: 'p',
            text: 'By de-risking solar developers, we have facilitated the installation of over 32 MW of renewable capacity, directly impacting 2.4 million lives. Rural communities that previously relied on toxic diesel generators now enjoy 24/7 reliable power, boosting micro-business yields and reducing local emissions.',
          },
          {
            blockType: 'blockquote',
            text: 'Our impact goes beyond metrics: we are witnessing the structural transformation of rural economies through clean energy.',
          },
          {
            blockType: 'p',
            text: 'In addition to carbon reduction, the projects have catalyzed the creation of over 300 direct green jobs, with a specific focus on training female engineers and micro-entrepreneurs to manage local grid systems.',
          },
          {
            blockType: 'image',
            url: 'https://res.cloudinary.com/diqfojkri/image/upload/v1785801891/climate%20facility/home-page/news-3-paragraph-image.jpg',
            url_alt_text: 'Community members benefited by solar installation.',
            text: 'Community members benefited by solar installation.',
            caption:
              'Access to clean electricity supports local education and healthcare clinics.',
          },
          { blockType: 'h2', text: 'Verifiable Environmental Outcomes' },
          {
            blockType: 'p',
            text: 'All carbon metrics have been independently audited and verified in compliance with the Climate Bonds Standard, resulting in a reduction of 611k tonnes of CO2 emissions annually, proving that financial de-risking can drive massive, verifiable climate outcomes.',
          },
        ],
      },

      {
        articleId: '4',
        tag: 'Industry News',
        date: 'September 18, 2025',
        readTime: '6 min read',
        title:
          'Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria',
        excerpt:
          'Recent policy updates from the SEC and Central Bank are creating a more robust enabling environment for sustainable investments.',
        author: 'Dr. Emmanuel Nwachukwu',
        authorAvatar:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801892/climate%20facility/home-page/news-4-author-avatar.jpg',
        authorAvatar_alt_text: 'Dr. Emmanuel Nwachukwu',
        image: ARTICLE_4_IMAGE,
        image_alt_text:
          'Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria',
        keyContext:
          'Understanding the evolving legal landscape that is facilitating the growth of green finance.',
        themes: [
          { label: 'POLICY' },
          { label: 'REGULATION' },
          { label: 'GREEN BONDS' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The regulatory landscape for climate finance in Nigeria is maturing rapidly. Recent guidelines issued by the Securities and Exchange Commission (SEC) and the Central Bank of Nigeria (CBN) are providing much-needed clarity and standardization for green bonds and sustainable investment funds.',
          },
          { blockType: 'h2', text: 'Standardization and Taxonomy' },
          {
            blockType: 'p',
            text: "One of the most significant developments is the move towards a unified green taxonomy. By clearly defining what constitutes a 'green' or 'climate-aligned' investment, regulators are mitigating the risk of greenwashing and providing institutional investors with the confidence they need to allocate capital.",
          },
          {
            blockType: 'p',
            text: 'These frameworks align closely with international standards, such as the ICMA Green Bond Principles and the Climate Bonds Initiative standards, ensuring that Nigerian green financial instruments are globally competitive and credible.',
          },
          {
            blockType: 'image',
            url: 'https://res.cloudinary.com/diqfojkri/image/upload/v1785801893/climate%20facility/home-page/news-4-paragraph-image.jpg',
            url_alt_text: 'Legal books and document folders.',
            text: 'Legal books and document folders.',
            caption:
              'Clear regulatory frameworks are essential for scaling climate finance.',
          },
          { blockType: 'h2', text: 'Incentivizing Green Capital' },
          {
            blockType: 'p',
            text: 'Beyond standardization, there are ongoing discussions regarding potential incentives for green investments. These could include favorable capital charge treatments for banks holding green bonds or tax exemptions for returns generated from certified sustainable funds.',
          },
          {
            blockType: 'blockquote',
            text: 'A robust regulatory framework is the invisible infrastructure that allows green capital to flow freely and securely.',
          },
          {
            blockType: 'p',
            text: "While some of these incentives are still in the proposal stage, the direction of travel is clear. Policymakers recognize that mobilizing private capital is essential to meeting Nigeria's Nationally Determined Contributions (NDCs) under the Paris Agreement.",
          },
          { blockType: 'h2', text: 'Implications for Fund Managers' },
          {
            blockType: 'p',
            text: 'For vehicles like the Climate Finance Blending Facility, these regulatory advancements are highly positive. They validate our stringent ESG reporting processes and our commitment to third-party verification (such as our CBI certification). As the market becomes more regulated, funds with established, transparent track records will be best positioned to attract institutional capital.',
          },
        ],
      },

      {
        articleId: '5',
        tag: 'Market Insights',
        date: 'August 14, 2025',
        readTime: '6 min read',
        title: 'Unlocking Capital for Mini-Grids in Rural Communities',
        excerpt:
          'FCDO and InfraCredit partnership demonstrates how first-loss capital bridges equity gaps for remote developers.',
        author: 'Tunde Johnson',
        authorAvatar:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801894/climate%20facility/home-page/news-5-author-avatar.jpg',
        authorAvatar_alt_text: 'Tunde Johnson',
        image: ARTICLE_5_IMAGE,
        image_alt_text: 'Unlocking Capital for Mini-Grids in Rural Communities',
        keyContext:
          'How first-loss concessional tranches bridge early-stage developer risk profiles.',
        themes: [
          { label: 'CAPITAL' },
          { label: 'MINI-GRIDS' },
          { label: 'PARTNERSHIP' },
        ],
        paragraphs: [
          {
            blockType: 'p',
            text: 'Bridging the capital gap for rural solar developers requires strategic collaboration. Commercial banks and typical debt investors avoid early-stage mini-grid installations due to perceived performance risk and long payback cycles.',
          },
          { blockType: 'h2', text: 'Concessional Blending at Work' },
          {
            blockType: 'p',
            text: 'To bridge this gap, the partnership between the UK Foreign, Commonwealth & Development Office (FCDO) and InfraCredit leverages first-loss concessional funding. By placing FCDO seed capital in a subordinated position, the facility de-risks the capital stack, enabling institutional pension capital to step in as senior lenders.',
          },
          {
            blockType: 'blockquote',
            text: 'Subordinated, concessional capital is the key that unlocks long-term commercial credit for clean energy developers.',
          },
          {
            blockType: 'p',
            text: 'This framework has successfully mobilized private capital at a 1:4 leverage ratio, showing that every Naira of first-loss capital can draw in four Naira of domestic pension fund financing.',
          },
          {
            blockType: 'image',
            url: ARTICLE_1_IMAGE,
            url_alt_text: 'Rural solar mini-grid installation site.',
            text: 'Rural solar mini-grid installation site.',
            caption:
              'Financing local infrastructure in local currency removes exchange rate shocks.',
          },
          { blockType: 'h2', text: 'Creating Investment-Grade Assets' },
          {
            blockType: 'p',
            text: 'By packaging these guarantees, the Facility creates investment-grade debt options from high-risk off-grid projects. This makes green bonds an attractive asset class for conservative pension administrators, establishing a sustainable, long-term funding stream.',
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
