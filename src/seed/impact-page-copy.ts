/**
 * IMPACT page copy, extracted verbatim from the Next.js frontend.
 *
 * Sources:
 *   frontend/app/impact/page.tsx        -> structured-data-section,
 *                                          hero-section (topStats),
 *                                          philosophy-section,
 *                                          impact-console-section,
 *                                          stories-tab-section (STORIES),
 *                                          numbers-tab-section (IconStatBox,
 *                                            net-zero wheel, pension bar),
 *                                          investments-tab-section (pillars, SDGs),
 *                                          assets-tab-section (projects table),
 *                                          next-steps-section,
 *                                          video-modal-section
 *   frontend/components/GlassHero.tsx   -> hero-section (breadcrumb)
 *
 * This is a dynamic-zone payload: every entry carries a `__component` key and
 * the array order matches the render order in frontend/app/impact/page.tsx.
 *
 * Strings the frontend derives at runtime are written out here as explicit
 * fields so no user-facing copy is left hardcoded:
 *   - the IconStatBox descriptions, built by matching on the metric label
 *     (page.tsx:119-123), become each metric's `description`
 *   - the "Showing {n} of {n} community case studies" counter (page.tsx:539)
 *     is split into countPrefix / countMiddle / countSuffix
 *   - the ROLE / LOCATION / TYPE row labels, repeated in the card and list
 *     views, become roleLabel / locationLabel / typeLabel
 *   - the net-zero wheel's SVG text and legend labels (page.tsx:789-802)
 *
 * The four pillars appear twice on the page — in the philosophy section and
 * again under the "What we invest in" tab. Both are seeded, so an editor can
 * change them independently.
 */

const META_DESCRIPTION =
  "Tracking our contribution to Nigeria's Net Zero targets, SDG goals, and local clean energy community projects.";

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop';

const FELICIA_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop';
const ACOB_IMAGE =
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop';
const PRADO_IMAGE =
  'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop';
const FIRST_ELECTRIC_IMAGE =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop';
const CEESOLAR_IMAGE =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop';
const HOTSPOT_IMAGE =
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop';

const SDG7_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop';
const SDG8_IMAGE =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop';
const SDG9_IMAGE =
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600&auto=format&fit=crop';
const SDG13_IMAGE =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop';

const SOLAR_VIDEO = '/videos/solar-panels.mp4';
const WIND_VIDEO = '/videos/wind-turbines.mp4';
const HOTSPOT_VIDEO = '/videos/infracredit-hotspot.mp4';

/**
 * The four strategic pillars, rendered both in the philosophy section and
 * under the "What we invest in" tab.
 */
const PILLARS = [
  {
    number: '01',
    title: 'Capital Mobilization',
    description:
      'De-risking private institutional pension fund assets and matching them to clean energy developers under local-currency wrappers.',
  },
  {
    number: '02',
    title: 'Climate Mitigation',
    description:
      'Mitigating greenhouse gas emissions through replacement of off-grid diesel generation with localized solar hybrid solutions.',
  },
  {
    number: '03',
    title: 'Community Empowerment',
    description:
      'Providing micro-enterprises, farming hubs, and households with stable, clean electricity to increase productivity and incomes.',
  },
  {
    number: '04',
    title: 'Local Capacity Building',
    description:
      'Supporting developer project preparation and operations to build local capacity in green infrastructure development.',
  },
];

export const impactSections = [
  {
    __component: 'impact-page.structured-data-section' as const,
    pageTitle: 'Our Impact & Transition Strategy | CFBF',
    metaDescription: META_DESCRIPTION,
    loadingLabel: 'Loading impact...',
  },

  {
    __component: 'impact-page.hero-section' as const,
    breadcrumbLabel: 'impact',
    eyebrow: 'Stories & strategy',
    headingPartOne: 'Our strategy & ',
    headingHighlight: 'impact',
    descriptionPrimary:
      'CFBF is built to bridge the green infrastructure gap, moving local pension assets into clean energy and sustainable developments that empower local communities.',
    descriptionSecondary:
      'Discover our localized case study video stories and our long-term Net Zero transition strategy below.',
    backgroundImage: HERO_IMAGE,
    stats: [
      {
        category: 'Investment',
        value: '₦7.86B+',
        label: 'Capital Deployed',
        description:
          'mobilized from institutional investors and pension funds into the real economy.',
        sdgBadge: 'SDG 9',
      },
      {
        category: 'Mitigation',
        value: '7,500+ tCO₂e',
        label: 'Emissions Avoided',
        description:
          'tonnes of annual carbon emissions mitigated across active installations.',
        sdgBadge: 'SDG 13',
      },
      {
        category: 'Employment',
        value: '5,780+',
        label: 'Job Creation',
        description:
          'sustainable jobs facilitated in local clean energy construction & ops.',
        sdgBadge: 'SDG 8',
      },
      {
        category: 'Generation',
        value: '4.02 MW',
        label: 'Capacity Installed',
        description:
          'installed green capacity de-risked by first-loss co-financing.',
        sdgBadge: 'SDG 7',
      },
      {
        category: 'Energy Access',
        value: '39,438',
        label: 'Connections Powered',
        description:
          'projected household and SME clean energy connections powered across Nigeria.',
        sdgBadge: 'SDG 7',
      },
      {
        category: 'Reach',
        value: '35 States',
        label: 'Active Pipeline',
        description: 'subnational clean energy deal flow coverage across Nigeria.',
        sdgBadge: 'SDG 17',
      },
    ],
  },

  {
    __component: 'impact-page.philosophy-section' as const,
    eyebrow: '— Our Philosophy',
    headingPartOne: 'Mobilizing capital to power ',
    headingHighlight: 'sustainable transitions',
    bodyPartOne:
      "The Climate Finance Blending Facility is strategically structured to address the barriers preventing long-term private investment from entering Nigeria's green infrastructure market.",
    bodyPartTwo:
      'By blending concessional first-loss capital with local currency guarantees, we establish robust, investment-grade opportunities that deliver double-bottom-line returns: financial security for pension savers and clean energy access for rural and underserved communities.',
    pillars: PILLARS,
  },

  {
    __component: 'impact-page.impact-console-section' as const,
    eyebrow: '— Impact Console',
    headingPartOne: 'Stakeholder testimonials & ',
    headingHighlight: 'proof',
    tabs: [
      { tabId: 'stories', label: 'Stories from our communities' },
      { tabId: 'numbers', label: 'Our impact in numbers' },
      { tabId: 'investments', label: 'What we invest in' },
      { tabId: 'assets', label: 'Our assets' },
    ],
  },

  {
    __component: 'impact-page.stories-tab-section' as const,
    countPrefix: 'Showing',
    countMiddle: 'of',
    countSuffix: 'community case studies',
    viewMoreLabel: 'View more testimonials',
    roleLabel: 'ROLE',
    locationLabel: 'LOCATION',
    typeLabel: 'TYPE',
    stories: [
      {
        title: 'Meet Felicia Adindu-End User, Darway Coast',
        role: 'Community Voice',
        location: 'Rivers State',
        type: 'Video Testimonial',
        badge: 'Case Study',
        excerpt:
          'In Akpoku, Rivers State, Felicia Adindu once struggled with unreliable energy. Now, clean solar power has transformed her daily life and business.',
        duration: '4:32 mins',
        image: FELICIA_IMAGE,
        video: SOLAR_VIDEO,
      },
      {
        title: 'ACOB Lighting Solar Powered Rural Electrification Project',
        role: 'Developer',
        location: 'Akwa-Ibom & Benue States',
        type: 'Video Testimonial',
        badge: 'Tech Showcase',
        excerpt:
          'Investing in clean energy means investing in communities. How ACOB Lighting is powering local development in northern regions.',
        duration: '3:15 mins',
        image: ACOB_IMAGE,
        video: WIND_VIDEO,
      },
      {
        title: 'Prado Power Solar Powered Rural Electrification Project',
        role: 'Developer',
        location: 'Cross River State',
        type: 'Video Testimonial',
        badge: 'Milestone Focus',
        excerpt:
          'The project will construct solar-hybrid mini-grid installations to power households and small businesses in off-grid rural areas.',
        duration: '5:40 mins',
        image: PRADO_IMAGE,
        video: HOTSPOT_VIDEO,
      },
      {
        title: 'Mesh Grid Networks Powering Agriculture - First Electric',
        role: 'Developer',
        location: 'Gombe & Nasarawa States',
        type: 'Video Case Study',
        badge: 'Infrastructure',
        excerpt:
          'Mesh grid networks connect rural households and small agricultural processors in Gombe State, facilitating cold storage and local commerce.',
        duration: '3:45 mins',
        image: FIRST_ELECTRIC_IMAGE,
        video: SOLAR_VIDEO,
      },
      {
        title: 'Unlocking Local Capital for Off-Grid Power - CEESOLAR',
        role: 'Project Lead',
        location: 'Cross River State',
        type: 'Project Update',
        badge: 'Clean Finance',
        excerpt:
          'CEESOLAR Energy utilizes concessional funding to build high-capacity solar-hybrid grids, powering rural communities in the Niger Delta region.',
        duration: '4:15 mins',
        image: CEESOLAR_IMAGE,
        video: WIND_VIDEO,
      },
      {
        title: 'Solarizing Rural Telecom Infrastructure - Hotspot Network',
        role: 'Community Partner',
        location: 'Kano & Kaduna States',
        type: 'Field Documentary',
        badge: 'Digital Impact',
        excerpt:
          'Replacing diesel generators with high-efficiency solar hybrid arrays across 120 base stations, bringing continuous clean connectivity to rural Nigeria.',
        duration: '5:10 mins',
        image: HOTSPOT_IMAGE,
        video: HOTSPOT_VIDEO,
      },
    ],
  },

  {
    __component: 'impact-page.numbers-tab-section' as const,
    metrics: [
      {
        label: 'Capacity Installed',
        value: '4.02',
        unit: 'MW',
        description: 'installed clean generating capacity co-financed.',
      },
      {
        label: 'Emissions Avoided',
        value: '7,500+',
        unit: 'tCO₂e',
        description: 'tonnes of annual carbon emissions mitigated.',
      },
      {
        label: 'Job Creation',
        value: '5,780+',
        unit: 'Jobs',
        description: 'sustainable employment opportunities facilitated.',
      },
      {
        label: 'Connections Powered',
        value: '39,438',
        unit: '',
        description: 'projected household and SME connections powered.',
      },
    ],
    wheelCenterYear: '2060',
    wheelCenterLabel: 'Nigeria NZE Target',
    wheelProgressLabel: '~16% progress',
    timelinePoints: [
      { year: '2022', label: 'Current' },
      { year: '2030', label: 'Interim target' },
      { year: '2060', label: 'NZE goal' },
    ],
    etpLabel: 'Nigeria Energy Transition Plan',
    etpBody:
      "Nigeria's ETP sets an ambitious path to net zero by 2060. CFBF is purpose-built to accelerate this transition by mobilising private capital at scale for off-grid and distributed renewables.",
    pensionLabel: 'Pension fund penetration',
    pensionTargetValue: '30% target',
    pensionCurrentLabel: 'Current ~2%',
    pensionTargetLabel: 'Target 30% by 2024',
  },

  {
    __component: 'impact-page.investments-tab-section' as const,
    pillarsHeading: '/ Strategic Investment Pillars',
    pillars: PILLARS,
    sdgHeading: '/ SDG Framework Alignments',
    sdgCards: [
      {
        number: '07',
        title: 'Affordable & Clean Energy',
        badgeLabel: 'SDG 7',
        description:
          'Channelling long-term local currency financing to expand distributed renewable energy, building mini-grids and solar systems across underserved communities.',
        image: SDG7_IMAGE,
      },
      {
        number: '08',
        title: 'Decent Work & Growth',
        badgeLabel: 'SDG 8',
        description:
          'Promoting sustained economic growth by creating high-paying local jobs across clean energy construction, operation, maintenance, and supply chains.',
        image: SDG8_IMAGE,
      },
      {
        number: '09',
        title: 'Industry & Infrastructure',
        badgeLabel: 'SDG 9',
        description:
          'Building resilient clean energy utilities, agro-processing hubs, and green industrial parks powered by sustainable, localized off-grid networks.',
        image: SDG9_IMAGE,
      },
      {
        number: '13',
        title: 'Climate Action',
        badgeLabel: 'SDG 13',
        description:
          "Confronting climate change head-on by accelerating private capital into climate-smart technologies to accelerate Nigeria's energy transition.",
        image: SDG13_IMAGE,
      },
    ],
  },

  {
    __component: 'impact-page.assets-tab-section' as const,
    columns: [
      { label: 'Asset Name' },
      { label: 'Location' },
      { label: 'Asset Class' },
      { label: 'Capacity' },
      { label: 'Connections' },
      { label: 'Jobs' },
      { label: 'Status' },
    ],
    assets: [
      {
        assetId: '01',
        title: 'First Electric Power and Automation Services',
        location: 'Gombe, Nasarawa & Ondo States',
        category: 'Solar Grid',
        capacity: '725KW',
        connections: '5,156',
        jobs: '616',
        ghg: '762 Tonnes',
        capital: '₦1.70b',
        year: '2025',
        status: 'Under Construction',
      },
      {
        assetId: '02',
        title: 'CEESOLAR Energy Limited',
        location: 'Cross River State',
        category: 'Solar Grid',
        capacity: '760KW',
        connections: '3,597',
        jobs: '561',
        ghg: '737 Tonnes',
        capital: '₦1.70b',
        year: '2025',
        status: 'Under Construction',
      },
      {
        assetId: '03',
        title: 'Prado Power Energy Limited',
        location: 'Akwa-Ibom & Benue States',
        category: 'Agro-Processing',
        capacity: '850kW',
        connections: '15,801',
        jobs: '740',
        ghg: '893 Tonnes',
        capital: '₦1.95b',
        year: '2024',
        status: 'Under Construction',
      },
      {
        assetId: '04',
        title: 'Hotspot Network Limited',
        location: '22 States in Nigeria',
        category: 'Telecoms',
        capacity: '324kW',
        connections: '120 Sites',
        jobs: '720',
        ghg: '8.34 Tonnes',
        capital: '₦955m',
        year: '2023',
        status: 'Operational',
      },
      {
        assetId: '05',
        title: 'Darway Coast Limited',
        location: 'Rivers & Abia States',
        category: 'Solar Grid',
        capacity: '526kW',
        connections: '7,711',
        jobs: '2,296',
        ghg: '4,856 Tonnes',
        capital: '₦800m',
        year: '2022',
        status: 'Operational',
      },
      {
        assetId: '06',
        title: 'ACOB Lightning Technology Limited',
        location: 'Edo & Ondo States',
        category: 'Solar Grid',
        capacity: '335kW',
        connections: '3,597',
        jobs: '868',
        ghg: '352 Tonnes',
        capital: '₦755m',
        year: '2023',
        status: 'Operational',
      },
    ],
  },

  {
    __component: 'impact-page.next-steps-section' as const,
    eyebrow: 'Next steps',
    headingPartOne: 'Explore the ',
    headingItalic: 'facility portal',
    links: [
      {
        eyebrow: 'About us',
        title: 'Who we are',
        description: 'Learn about our seed capital and mandates',
        href: '/about',
      },
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
    ],
  },

  {
    __component: 'impact-page.video-modal-section' as const,
    nowPlayingLabel: 'Now Playing',
  },
];
