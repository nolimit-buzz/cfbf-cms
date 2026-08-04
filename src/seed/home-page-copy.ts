/**
 * HOME page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/page.tsx                  -> structured-data-section
 *   frontend/components/home/Hero.tsx      -> hero-section
 *   frontend/components/home/About.tsx     -> about-section
 *   frontend/components/home/Impact.tsx    -> impact-section
 *   frontend/components/home/Projects.tsx  -> projects-section
 *   frontend/components/home/ProjectDetails.tsx
 *   frontend/components/home/Map.tsx       -> map-section
 *   frontend/components/NigeriaMap.tsx
 *   frontend/components/home/Stories.tsx   -> stories-section
 *   frontend/components/home/News.tsx      -> news-section
 *   frontend/lib/newsData.ts
 *   frontend/components/home/NetZero.tsx   -> net-zero-section
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and
 * the array order matches the render order in frontend/app/page.tsx.
 */

export const homeSections = [
  {
    __component: 'home-page.hero-section' as const,
    headingPrimary: 'Local Currency Blended',
    headingSecondary: 'Climate Finance',
    subheadline:
      'Mobilising blended finance for sustainable energy access. The first of its kind to receive certification under the Electrical Grids and Storage criteria by the Climate Bonds Standard.',
    ctaLabel: 'Explore Our Impact',
    ctaHref: '/projects',
    newsCtaLabel: 'Read Article',
    backgroundImage:
      'https://res.cloudinary.com/diqfojkri/image/upload/v1785801857/climate%20facility/home-page/hero-background-image.jpg',
    backgroundImage_alt_text: 'Solar Panels',
    backgroundVideo:
      'https://res.cloudinary.com/diqfojkri/video/upload/v1785801866/climate%20facility/home-page/hero-background-video.mp4',
    certificationBadge:
      'https://res.cloudinary.com/diqfojkri/image/upload/v1785801868/climate%20facility/home-page/hero-certification-badge.svg',
    certificationBadge_alt_text: 'Climate Bonds Certified',
    stats: [
      { value: '$21.3m', label: 'Total Funding' },
      { value: '35+', label: 'States' },
      { value: '2.4m', label: 'Lives Impacted' },
    ],
  },

  {
    __component: 'home-page.about-section' as const,
    eyebrow: 'Who We Are',
    headingPrimary: 'Mobilising blended finance for ',
    headingSecondary: 'sustainable energy access.',
    body: 'The Climate Finance Blending Facility is a catalytic facility capitalised with USD21.3 million concessional funding by the UK Foreign, Commonwealth & Development Office ("FCDO") and the British International Investment ("BII") to mobilise additional funding from development partners to co-finance off-grid clean energy investments alongside InfraCredit\'s local currency guarantees in Nigeria.',
    ctaLabel: 'Read more about our mission',
    ctaHref: '/about',
    partnersHeading: 'Strategic Partners & Funders',
    statValue: '$21.3m',
    statDescription:
      'Concessional capital committed by FCDO and BII to de-risk green investments in Nigeria.',
    image:
      'https://res.cloudinary.com/diqfojkri/image/upload/v1785801870/climate%20facility/home-page/about-image.jpg',
    image_alt_text: 'Solar Panels Cloudy Sky',
    partners: [
      { name: 'UKaid' },
      { name: 'InfraCredit' },
      { name: 'AIICO' },
      { name: 'LINKAGE ASSURANCE' },
    ],
  },

  {
    __component: 'home-page.impact-section' as const,
    eyebrow: 'Our Impact',
    headingPrimary: 'How we drive ',
    headingSecondary: 'impact',
    numbersCtaLabel: 'Visit Capacity Building Page',
    reportCtaLabel: 'Download Impact & Sustainability Report',
    reportFileName: 'CFBF_Impact_Report_2025.pdf',
    reportFileHref: '/download.pdf',
    capacityCtaLabel: 'Visit Knowledge Hub',
    statsCardEyebrow: 'Impact Metrics',
    galleryCtaLabel: 'View Gallery',
    knowledgeHubTitle: 'Knowledge Hub',
    knowledgeHubSubtitle: 'Access our latest research and reports.',
    theoryEyebrow: 'THEORY OF CHANGE',
    theoryHeadingPrimary: 'Shaping a sustainable',
    theoryHeadingSecondary: 'future with energy',
    theoryFooterLabel: 'Start saving with reliable, sustainable energy today.',
    tabs: [
      {
        tabId: 'numbers',
        label: 'Impact Numbers',
        title: 'Measuring Real-World Change',
        description:
          'Our data-driven approach ensures every dollar invested translates into tangible environmental and social progress.',
      },
      {
        tabId: 'capacity',
        label: 'Capacity Building',
        title: 'Building Market Resilience',
        description:
          'Strengthening local financial institutions and developers to sustain long-term growth in the renewable energy sector.',
      },
      {
        tabId: 'theory',
        label: 'Theory of Change',
        title: 'The Logic of Change',
        description:
          'From mobilising capital to sustainable development: mapping our strategic pathway to impact.',
      },
    ],
    metricCards: [
      { value: '47.2', suffix: 'b', label: 'Total Project Investment Committed' },
      {
        value: '1310',
        suffix: '',
        label: 'Communities Served',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801874/climate%20facility/home-page/impact-metric-card-2-image.jpg',
        image_alt_text: 'Communities Served',
      },
      { value: '232', suffix: 'm', label: 'People with access to new infrastructure' },
      {
        value: '32',
        suffix: ' MW',
        label: 'Capacity Installed',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801875/climate%20facility/home-page/impact-metric-card-4-image.jpg',
        image_alt_text: 'Capacity Installed',
      },
      { value: '258', suffix: '', label: 'Projects Reached Financial Close' },
      { value: '611', suffix: 'k', label: 'Tonnes CO2 Reduced' },
    ],
    capacityStats: [
      { value: '500+', label: 'Trainees Certified' },
      { value: '20+', label: 'Workshops Hosted' },
      { value: '15', label: 'States Covered' },
      { value: '8', label: 'Institutions Partnered' },
    ],
    gallerySlides: [
      {
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801870/climate%20facility/home-page/impact-gallery-slide-1-image.jpg',
        image_alt_text:
          'Cross section of participants representing various institutions.',
        description: 'Cross section of participants representing various institutions.',
      },
      {
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801871/climate%20facility/home-page/impact-gallery-slide-2-image.jpg',
        image_alt_text:
          'Technical workshop session on solar mini-grid maintenance.',
        description: 'Technical workshop session on solar mini-grid maintenance.',
      },
      {
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801872/climate%20facility/home-page/impact-gallery-slide-3-image.jpg',
        image_alt_text:
          'Site inspection and field training with local engineers.',
        description: 'Site inspection and field training with local engineers.',
      },
    ],
    reports: [
      {
        reportId: 'climate24',
        tag: '#ClimateReport2024',
        title: 'Annual Sustainability Assessment',
        size: '2.4MB',
      },
      {
        reportId: 'clean',
        tag: '#CleanEnergy',
        title: 'Off-Grid Solar Market Analysis',
        size: '1.8MB',
      },
      {
        reportId: 'gender',
        tag: '#GenderGap',
        title: 'Women in Renewable Energy',
        size: '3.1MB',
      },
      {
        reportId: 'finance',
        tag: '#GreenFinance',
        title: 'Local Currency Bonds Framework',
        size: '4.2MB',
      },
    ],
    theoryCards: [
      {
        cardId: 'step1',
        cardType: 'image',
        subtitle: 'CLEAN ENERGY ACCESS',
        title: 'Clean Energy Access',
        description:
          'Unlock affordable financing for private sector enterprises providing off-grid energy solutions such as solar mini grids, solar home systems, solar lanterns, fridges, pumps, driers and clean cooking products.',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801873/climate%20facility/home-page/impact-theory-card-1-image.jpg',
        image_alt_text:
          'Clean Energy Access',
        link: '/impact',
        linkLabel: 'Learn More',
      },
      {
        cardId: 'step2',
        cardType: 'solid',
        subtitle: 'DOMESTIC INSTITUTIONAL INVESTORS',
        title: 'Domestic Institutional Investors',
        description:
          'Catalyse green investments in local currency from domestic private institutional investors such as insurance companies, local pension funds, and asset managers.',
        image: '',
        link: '/impact',
        linkLabel: 'Learn More',
      },
      {
        cardId: 'step3',
        cardType: 'image',
        subtitle: 'DEVELOPMENT ASSISTANCE',
        title: 'Development Assistance',
        description:
          'Innovative blended finance approach for donors and concessional financiers, to make smart use of impact-seeking capital to de-risk and mobilise private sector financing.',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801874/climate%20facility/home-page/impact-theory-card-3-image.jpg',
        image_alt_text:
          'Development Assistance',
        link: '/impact',
        linkLabel: 'Learn More',
      },
      {
        cardId: 'step4',
        cardType: 'solid',
        subtitle: 'GREEN ECONOMY',
        title: 'Green Economy',
        description:
          'Promote green growth and climate resilient development by enhancing access to renewable energy for productive uses and boosting agricultural development.',
        image: '',
        link: '/impact',
        linkLabel: 'Learn More',
      },
    ],
  },

  {
    __component: 'home-page.projects-section' as const,
    eyebrow: 'Project Showcase',
    heading: 'Leading with innovation in solar projects worldwide',
    capitalLabel: 'Private Capital',
    capacityLabel: 'Capacity',
    challengeLabel: 'Challenge Analysis',
    solutionLabel: 'Solution',
    impactLabel: 'Impact',
    detailCtaLabel: 'Learn More',
    ctaLabel: 'View All Projects',
    ctaHref: '/projects',
    viewTabs: [
      { tabId: 'list', label: 'List View' },
      { tabId: 'grid', label: 'Grid View' },
    ],
    categories: [
      { label: 'All' },
      { label: 'Solar Grid' },
      { label: 'Telecoms' },
      { label: 'Agro-Processing' },
    ],
    projects: [
      {
        projectId: '01',
        title: 'Darway Coast, Nigeria',
        location: 'Rivers State',
        year: '2022',
        capital: '₦800m',
        capacity: '526KW',
        category: 'Solar Grid',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801876/climate%20facility/home-page/project-1-image.jpg',
        image_alt_text:
          'Darway Coast, Nigeria',
        imageOne:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801877/climate%20facility/home-page/project-1-image-one.jpg',
        imageOne_alt_text:
          'Project detail',
        imageTwo:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801878/climate%20facility/home-page/project-1-image-two.jpg',
        imageTwo_alt_text:
          'Project detail',
        description:
          'Providing clean energy to over 2,000 households and businesses in coastal communities.',
        problem:
          'Coastal communities in Rivers State lacked reliable grid connection, relying on expensive and polluting diesel generators for basic needs.',
        solution:
          'Deployment of a 526KW Solar Hybrid Mini-Grid with battery storage to provide 24/7 reliable power to the community.',
        impact:
          'Replaced 200+ diesel generators, reducing CO2 emissions by 400 tonnes annually and powering 150 SMEs.',
      },
      {
        projectId: '02',
        title: 'Hotspot Network',
        location: 'Kano State',
        year: '2023',
        capital: '₦955m',
        capacity: '324KW',
        category: 'Telecoms',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801878/climate%20facility/home-page/project-2-image.jpg',
        image_alt_text:
          'Hotspot Network',
        imageOne:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801879/climate%20facility/home-page/project-2-image-one.jpg',
        imageOne_alt_text:
          'Project detail',
        imageTwo:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801879/climate%20facility/home-page/project-2-image-two.jpg',
        imageTwo_alt_text:
          'Project detail',
        description:
          'Expanding rural telephony and energy access through innovative solar-powered base stations.',
        problem:
          'Remote rural areas suffer from lack of connectivity and energy access, hindering economic development and social inclusion.',
        solution:
          'Installation of solar-powered telecommunication base stations that serve as community energy hubs.',
        impact:
          'Connected 50,000 people to mobile networks and provided charging services to 5,000 households.',
      },
      {
        projectId: '03',
        title: 'Prado Power Energy',
        location: 'Jigawa State',
        year: '2024',
        capital: '₦1.95bn',
        capacity: '850kW',
        category: 'Agro-Processing',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801880/climate%20facility/home-page/project-3-image.jpg',
        image_alt_text:
          'Prado Power Energy',
        imageOne:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801881/climate%20facility/home-page/project-3-image-one.jpg',
        imageOne_alt_text:
          'Project detail',
        imageTwo:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801881/climate%20facility/home-page/project-3-image-two.jpg',
        imageTwo_alt_text:
          'Project detail',
        description:
          'Agro-processing solar hybrid solution powering industrial growth in the northern region.',
        problem:
          'Post-harvest loss exceeding 40% due to lack of local power for processing and cold storage.',
        solution: 'Industrial-scale solar hybrid solution tailored for agro-processing hubs.',
        impact:
          'Processed 5,000 tonnes of produce, creating 300 direct jobs and significantly reducing food waste.',
      },
    ],
  },

  {
    __component: 'home-page.map-section' as const,
    eyebrow: 'National Footprint',
    headingPrimary: 'Geographical ',
    headingSecondary: 'Distribution',
    statValue: '35',
    statLabel: 'States',
    body: 'Collectively, renewable energy projects located in 35 states across the six geo-political zones in Nigeria have been approved for co-financing by the Facility.',
    ctaLabel: 'View Locations',
    // Inline SVG (FSD Africa mark) lifted verbatim from
    // frontend/components/ui/MapLogos.tsx — markup, not an uploaded asset.
    fsdAfricaLogoSvg:
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,15 C50,15 25,35 25,55 C25,75 50,90 50,90 C50,90 75,75 75,55 C75,35 50,15 50,15 Z M50,78 C38,78 33,68 33,55 C33,40 50,26 50,26 C50,26 67,40 67,55 C67,68 62,78 50,78 Z" /><path d="M50,35 C50,35 37,47 37,58 C37,68 50,76 50,76 C50,76 63,68 63,58 C63,47 50,35 50,35 Z" fill="#00A788" opacity="0.8" /></svg>',
    categories: [
      { label: 'All' },
      { label: 'Solar Grid' },
      { label: 'Hydro' },
      { label: 'Biofuel' },
      { label: 'Telecoms' },
    ],
    markers: [
      { name: 'Lagos', x: '85', y: '490' },
      { name: 'Abuja', x: '320', y: '290' },
      { name: 'Rivers', x: '290', y: '520' },
      { name: 'Kano', x: '370', y: '110' },
      { name: 'Gombe', x: '530', y: '200' },
      { name: 'Ondo', x: '190', y: '430' },
      { name: 'Cross River', x: '420', y: '480' },
      { name: 'Edo', x: '230', y: '450' },
      { name: 'Kaduna', x: '310', y: '200' },
    ],
    activeStates: [
      { stateId: 'gombe' },
      { stateId: 'nasarawa' },
      { stateId: 'edo' },
      { stateId: 'ondo' },
      { stateId: 'cross-river' },
      { stateId: 'akwa-ibom' },
      { stateId: 'benue' },
      { stateId: 'rivers' },
      { stateId: 'abia' },
      { stateId: 'kaduna' },
      { stateId: 'kano' },
      { stateId: 'oyo' },
      { stateId: 'bauchi' },
      { stateId: 'katsina' },
      { stateId: 'jigawa' },
      { stateId: 'sokoto' },
      { stateId: 'zamfara' },
      { stateId: 'kebbi' },
      { stateId: 'kogi' },
      { stateId: 'kwara' },
      { stateId: 'taraba' },
      { stateId: 'adamawa' },
      { stateId: 'borno' },
      { stateId: 'yobe' },
      { stateId: 'plateau' },
      { stateId: 'niger' },
      { stateId: 'ekiti' },
      { stateId: 'osun' },
      { stateId: 'ogun' },
      { stateId: 'lagos' },
      { stateId: 'fct' },
    ],
  },

  {
    __component: 'home-page.stories-section' as const,
    eyebrow: 'Stories',
    heading: 'Featured Stories',
    roleLabel: 'ROLE',
    locationLabel: 'LOCATION',
    typeLabel: 'TYPE',
    viewTabs: [
      { tabId: 'card', label: 'Card View' },
      { tabId: 'list', label: 'List View' },
    ],
    stories: [
      {
        title: 'Meet Felicia Adindu-End User, Darway Coast',
        role: 'Community Voice',
        location: 'Rivers State',
        storyType: 'Video Testimonial',
        badge: 'Case Study',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801882/climate%20facility/home-page/story-1-image.jpg',
        image_alt_text:
          'Meet Felicia Adindu-End User, Darway Coast',
        excerpt:
          'In Akpoku, Rivers State, Felicia Adindu once struggled with unreliable energy. Now, clean solar power has transformed her daily life and business.',
        duration: '4:32 mins',
      },
      {
        title: 'ACOB Lighting Solar Powered Rural Electrification Project',
        role: 'Developer',
        location: 'Akwa-Ibom & Benue States',
        storyType: 'Video Testimonial',
        badge: 'Tech Showcase',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801884/climate%20facility/home-page/story-2-image.jpg',
        image_alt_text:
          'ACOB Lighting Solar Powered Rural Electrification Project',
        excerpt:
          'Investing in clean energy means investing in communities. How ACOB Lighting is powering local development in northern regions.',
        duration: '3:15 mins',
      },
      {
        title: 'Prado Power Solar Powered Rural Electrification Project',
        role: 'Developer',
        location: 'Cross River State',
        storyType: 'Video Testimonial',
        badge: 'Milestone Focus',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801884/climate%20facility/home-page/story-3-image.jpg',
        image_alt_text:
          'Prado Power Solar Powered Rural Electrification Project',
        excerpt:
          'The project will construct solar-hybrid mini-grid installations to power households and small businesses in off-grid rural areas.',
        duration: '5:40 mins',
      },
    ],
  },

  {
    __component: 'home-page.news-section' as const,
    eyebrow: 'Media Center',
    heading: 'Latest News & Updates',
    readArticleLabel: 'Read Article',
    ctaLabel: 'View All News',
    ctaHref: '/news',
    viewTabs: [
      { tabId: 'card', label: 'Card View' },
      { tabId: 'list', label: 'List View' },
    ],
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
        authorAvatar_alt_text:
          'Chinua Okeke',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801886/climate%20facility/home-page/news-1-image.jpg',
        image_alt_text:
          "The Future of Local Currency Financing and its Impact on Sub-Saharan Africa's Renewable Energy Transition",
        keyContext:
          'Understanding how local currency guarantees are de-risking solar energy investments.',
        themes: [{ label: 'FINANCE' }, { label: 'LOCAL CURRENCY' }, { label: 'SOLAR' }],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The transition to clean energy in Sub-Saharan Africa faces a recurring challenge: foreign exchange risk. Historically, clean energy infrastructure projects have been funded in foreign hard currencies (USD or EUR), while their revenues are collected in local currencies (such as Naira). This mismatch leaves developers vulnerable to currency devaluations.',
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Mitigating Currency Mismatch', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'To address this hurdle, the Climate Finance Blending Facility (CFBF), in collaboration with partners like InfraCredit, is pioneering local currency blended financing. By providing local currency guarantees, the facility enables local institutional investors—such as pension funds—to invest confidently in local currency green bonds. This matches the funding currency directly with local utility tariffs.',
            caption: '',
            url: '',
          },
          {
            blockType: 'blockquote',
            text: 'Local currency financing is not just an alternative; it is the bedrock of sustainable infrastructure development in emerging markets.',
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: 'By de-risking the capital structure through a first-loss tranche, the Facility attracts private commercial pension capital that would otherwise steer clear of early-stage solar developments. This creates a sustainable cycle where domestic savings fund domestic infrastructure.',
            caption: '',
            url: '',
          },
          {
            blockType: 'image',
            text: 'Solar panels installation matching local currency investments.',
            caption:
              'Domestic pension funds represent a massive, untapped pool of long-term local capital.',
            url:
              'https://res.cloudinary.com/diqfojkri/image/upload/v1785801887/climate%20facility/home-page/news-1-paragraph-image.jpg',
            url_alt_text:
              'Solar panels installation matching local currency investments.',
          },
          { blockType: 'h2', text: 'Expanding Beyond Solar', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'While solar hybrid mini-grids have been the primary beneficiary of this model, the Facility plans to expand the local currency guarantee framework to encompass clean cooling value chains and agricultural processing hubs, cementing local currency debt as a standard tool for renewable energy developers across West Africa.',
            caption: '',
            url: '',
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
        authorAvatar_alt_text:
          'Folasade Adebayo',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801888/climate%20facility/home-page/news-2-image.jpg',
        image_alt_text:
          'Clean Energy Fund Announces the Successful Closure of Series 2 Capital Raise for Institutional Investors',
        keyContext:
          'A breakdown of the successful closure of our Series 2 capital raise from institutional partners.',
        themes: [{ label: 'FUNDRAISING' }, { label: 'INVESTORS' }, { label: 'GROWTH' }],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The Climate Finance Blending Facility is thrilled to announce the successful final close of its Series 2 capital raise. The raise secured an additional ₦15 Billion from domestic institutional investors, including leading pension fund administrators and assurance companies.',
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Unlocking Pension Liquidity', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'This capital raise demonstrates the growing appetite among local asset managers for yield-bearing green instruments. The capital will be immediately deployed to co-finance a pipeline of solar mini-grids and clean commercial cooling setups across Nigeria, helping developers access credit-enhanced Naira financing.',
            caption: '',
            url: '',
          },
          {
            blockType: 'blockquote',
            text: 'The success of this Series 2 close signals strong institutional trust in our risk-mitigated credit guarantee structure.',
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: "With this round of funding, the Facility's active capital pool increases significantly, enabling the de-risking of larger corporate clean energy bonds and helping developers secure up to 10-year tenor terms from domestic lenders.",
            caption: '',
            url: '',
          },
          {
            blockType: 'image',
            text: 'Strategic meeting finalizing the Series 2 capital raise.',
            caption:
              'Aligning domestic institutional capital with sustainable energy development targets.',
            url:
              'https://res.cloudinary.com/diqfojkri/image/upload/v1785801889/climate%20facility/home-page/news-2-paragraph-image.jpg',
            url_alt_text:
              'Strategic meeting finalizing the Series 2 capital raise.',
          },
          { blockType: 'h2', text: 'Next Milestones', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'Looking forward to 2026, the Facility plans to allocate capital across 12 new projects, focusing heavily on northern states where off-grid agricultural solar processing installations can drive the highest economic and social impacts.',
            caption: '',
            url: '',
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
        authorAvatar_alt_text:
          'Amina Bello',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801891/climate%20facility/home-page/news-3-image.jpg',
        image_alt_text:
          'Annual Impact Report: Bridging the Energy Gap and Fostering Sustainable Economic Growth in Nigeria',
        keyContext:
          'A deep dive into our verified environmental and social metrics from the 2025 Impact Report.',
        themes: [{ label: 'ESG' }, { label: 'SDGS' }, { label: 'COMMUNITIES' }],
        paragraphs: [
          {
            blockType: 'p',
            text: 'Our 2025 Annual Sustainability and Impact Report has been officially released, highlighting key achievements in greenhouse gas reduction, clean energy access, and rural economic empowerment across our blended finance portfolio.',
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Empowering Rural Livelihoods', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'By de-risking solar developers, we have facilitated the installation of over 32 MW of renewable capacity, directly impacting 2.4 million lives. Rural communities that previously relied on toxic diesel generators now enjoy 24/7 reliable power, boosting micro-business yields and reducing local emissions.',
            caption: '',
            url: '',
          },
          {
            blockType: 'blockquote',
            text: 'Our impact goes beyond metrics: we are witnessing the structural transformation of rural economies through clean energy.',
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: 'In addition to carbon reduction, the projects have catalyzed the creation of over 300 direct green jobs, with a specific focus on training female engineers and micro-entrepreneurs to manage local grid systems.',
            caption: '',
            url: '',
          },
          {
            blockType: 'image',
            text: 'Community members benefited by solar installation.',
            caption: 'Access to clean electricity supports local education and healthcare clinics.',
            url:
              'https://res.cloudinary.com/diqfojkri/image/upload/v1785801891/climate%20facility/home-page/news-3-paragraph-image.jpg',
            url_alt_text:
              'Community members benefited by solar installation.',
          },
          { blockType: 'h2', text: 'Verifiable Environmental Outcomes', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'All carbon metrics have been independently audited and verified in compliance with the Climate Bonds Standard, resulting in a reduction of 611k tonnes of CO2 emissions annually, proving that financial de-risking can drive massive, verifiable climate outcomes.',
            caption: '',
            url: '',
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
        authorAvatar_alt_text:
          'Dr. Emmanuel Nwachukwu',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801893/climate%20facility/home-page/news-4-image.jpg',
        image_alt_text:
          'Navigating the New Regulatory Frameworks Supporting Green Bonds and Climate Finance in Nigeria',
        keyContext:
          'Understanding the evolving legal landscape that is facilitating the growth of green finance.',
        themes: [{ label: 'POLICY' }, { label: 'REGULATION' }, { label: 'GREEN BONDS' }],
        paragraphs: [
          {
            blockType: 'p',
            text: 'The regulatory landscape for climate finance in Nigeria is maturing rapidly. Recent guidelines issued by the Securities and Exchange Commission (SEC) and the Central Bank of Nigeria (CBN) are providing much-needed clarity and standardization for green bonds and sustainable investment funds.',
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Standardization and Taxonomy', caption: '', url: '' },
          {
            blockType: 'p',
            text: "One of the most significant developments is the move towards a unified green taxonomy. By clearly defining what constitutes a 'green' or 'climate-aligned' investment, regulators are mitigating the risk of greenwashing and providing institutional investors with the confidence they need to allocate capital.",
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: 'These frameworks align closely with international standards, such as the ICMA Green Bond Principles and the Climate Bonds Initiative standards, ensuring that Nigerian green financial instruments are globally competitive and credible.',
            caption: '',
            url: '',
          },
          {
            blockType: 'image',
            text: 'Legal books and document folders.',
            caption: 'Clear regulatory frameworks are essential for scaling climate finance.',
            url:
              'https://res.cloudinary.com/diqfojkri/image/upload/v1785801893/climate%20facility/home-page/news-4-paragraph-image.jpg',
            url_alt_text:
              'Legal books and document folders.',
          },
          { blockType: 'h2', text: 'Incentivizing Green Capital', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'Beyond standardization, there are ongoing discussions regarding potential incentives for green investments. These could include favorable capital charge treatments for banks holding green bonds or tax exemptions for returns generated from certified sustainable funds.',
            caption: '',
            url: '',
          },
          {
            blockType: 'blockquote',
            text: 'A robust regulatory framework is the invisible infrastructure that allows green capital to flow freely and securely.',
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: "While some of these incentives are still in the proposal stage, the direction of travel is clear. Policymakers recognize that mobilizing private capital is essential to meeting Nigeria's Nationally Determined Contributions (NDCs) under the Paris Agreement.",
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Implications for Fund Managers', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'For vehicles like the Climate Finance Blending Facility, these regulatory advancements are highly positive. They validate our stringent ESG reporting processes and our commitment to third-party verification (such as our CBI certification). As the market becomes more regulated, funds with established, transparent track records will be best positioned to attract institutional capital.',
            caption: '',
            url: '',
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
        authorAvatar_alt_text:
          'Tunde Johnson',
        image:
          'https://res.cloudinary.com/diqfojkri/image/upload/v1785801895/climate%20facility/home-page/news-5-image.jpg',
        image_alt_text:
          'Unlocking Capital for Mini-Grids in Rural Communities',
        keyContext:
          'How first-loss concessional tranches bridge early-stage developer risk profiles.',
        themes: [{ label: 'CAPITAL' }, { label: 'MINI-GRIDS' }, { label: 'PARTNERSHIP' }],
        paragraphs: [
          {
            blockType: 'p',
            text: 'Bridging the capital gap for rural solar developers requires strategic collaboration. Commercial banks and typical debt investors avoid early-stage mini-grid installations due to perceived performance risk and long payback cycles.',
            caption: '',
            url: '',
          },
          { blockType: 'h2', text: 'Concessional Blending at Work', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'To bridge this gap, the partnership between the UK Foreign, Commonwealth & Development Office (FCDO) and InfraCredit leverages first-loss concessional funding. By placing FCDO seed capital in a subordinated position, the facility de-risks the capital stack, enabling institutional pension capital to step in as senior lenders.',
            caption: '',
            url: '',
          },
          {
            blockType: 'blockquote',
            text: 'Subordinated, concessional capital is the key that unlocks long-term commercial credit for clean energy developers.',
            caption: '',
            url: '',
          },
          {
            blockType: 'p',
            text: 'This framework has successfully mobilized private capital at a 1:4 leverage ratio, showing that every Naira of first-loss capital can draw in four Naira of domestic pension fund financing.',
            caption: '',
            url: '',
          },
          {
            blockType: 'image',
            text: 'Rural solar mini-grid installation site.',
            caption: 'Financing local infrastructure in local currency removes exchange rate shocks.',
            url:
              'https://res.cloudinary.com/diqfojkri/image/upload/v1785801895/climate%20facility/home-page/news-5-paragraph-image.jpg',
            url_alt_text:
              'Rural solar mini-grid installation site.',
          },
          { blockType: 'h2', text: 'Creating Investment-Grade Assets', caption: '', url: '' },
          {
            blockType: 'p',
            text: 'By packaging these guarantees, the Facility creates investment-grade debt options from high-risk off-grid projects. This makes green bonds an attractive asset class for conservative pension administrators, establishing a sustainable, long-term funding stream.',
            caption: '',
            url: '',
          },
        ],
      },
    ],
  },

  {
    __component: 'home-page.net-zero-section' as const,
    cardTitle: 'NET ZERO',
    cardSubtitle: 'Strategy Report 2025',
    cardBody:
      'Our commitment to a sustainable future through strategic decarbonization and green investment.',
    eyebrow: 'Our Goal',
    heading: 'Aiming For Net Zero',
    body: 'The Facility will use its impact seeking capital to blend the cost of Eligible Green Projects aimed at fulfilling two main environmental objectives: climate change mitigation and energy transition to a low-carbon economy.',
    image:
      'https://res.cloudinary.com/diqfojkri/image/upload/v1785801896/climate%20facility/home-page/net-zero-image.jpg',
    image_alt_text: 'Nature and Energy',
    features: [
      {
        title: 'Energy Efficiency',
        description:
          'Investing in technologies that maximize output while minimizing consumption across industrial and residential sectors.',
      },
      {
        title: 'GHG Reduction',
        description:
          'Quantifiable reduction of greenhouse gas emissions through verified renewable energy project implementation.',
      },
    ],
  },

  {
    __component: 'home-page.structured-data-section' as const,
    organizationName: 'Climate Finance Blending Facility (CFBF)',
    url: 'https://climatesupportfacility.org',
    logoUrl:
      'https://res.cloudinary.com/diqfojkri/image/upload/v1785801897/climate%20facility/home-page/structured-data-logo.svg',
    logoUrl_alt_text:
      'Climate Finance Blending Facility (CFBF)',
    description:
      'A catalytic facility managed by InfraCredit and capitalized with UK FCDO concessional capital and British International Investment (BII) funding to de-risk green investments in local currency.',
    siteName: 'Climate Finance Blending Facility | CFBF',
    sponsors: [
      { name: 'UK Foreign, Commonwealth & Development Office (FCDO)' },
      { name: 'British International Investment (BII)' },
    ],
  },
];
