/**
 * Replace the LIVE News entry's `news-page.articles-section.articles` array
 * wholesale with the 2 real CFBF press releases (CEESOLAR, First Electric),
 * removing the 3 old placeholder articles. Every other section is left
 * untouched.
 *
 *   node scripts/replace-news-articles.cjs --dry-run    # report, write nothing (default)
 *   node scripts/replace-news-articles.cjs --apply      # write, then publish
 *   node scripts/replace-news-articles.cjs --restore    # roll back from the backup
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader.
 *
 * bootstrap() only seeds a News entry when there isn't one, and only
 * backfills sections the live entry is missing entirely — it never
 * overwrites an existing section's content, so this script exists to make
 * the actual live-content change the seed-once guard deliberately can't.
 *
 * Mirrors scripts/apply-news-media-to-cms.cjs's connection/backup pattern,
 * but replaces `articles` wholesale instead of patching individual fields.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'news-page', 'pre-replace-articles-backup.json');

const DRY_RUN = !process.argv.includes('--apply') && !process.argv.includes('--restore');
const RESTORE = process.argv.includes('--restore');

const SECTION_POPULATE = {
  'news-page.structured-data-section': { populate: '*' },
  'news-page.hero-section': { populate: '*' },
  'news-page.listing-section': {
    populate: { viewTabs: { populate: '*' }, categories: { populate: '*' } },
  },
  'news-page.articles-section': {
    populate: {
      articles: { populate: { themes: { populate: '*' }, paragraphs: { populate: '*' } } },
    },
  },
  'news-page.article-detail-section': { populate: '*' },
  'news-page.next-steps-section': { populate: { links: { populate: '*' } } },
};

const ARTICLE_1_IMAGE =
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop';
const ARTICLE_2_IMAGE =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop';

/** The 2 real articles — kept in sync with cms/src/seed/news-page-copy.ts. */
const NEW_ARTICLES = [
  {
    articleId: '1',
    tag: 'Fund Updates',
    date: 'December 12, 2025',
    readTime: '4 min read',
    title:
      "Climate Finance Blending Facility Enables Local Currency Financing for CEESOLAR's Off-Grid Energy Project in Cross River State",
    excerpt:
      "CFBF's fifth transaction backs four solar hybrid mini-grids in Cross River State, set to electrify 3,600 households and businesses.",
    author: 'Climate Finance Blending Facility',
    authorAvatar: ARTICLE_1_IMAGE,
    authorAvatar_alt_text: 'Climate Finance Blending Facility',
    image: ARTICLE_1_IMAGE,
    image_alt_text:
      "Climate Finance Blending Facility Enables Local Currency Financing for CEESOLAR's Off-Grid Energy Project in Cross River State",
    keyContext:
      "CFBF's fifth transaction backs four solar hybrid mini-grids in Cross River State, set to electrify 3,600 households and businesses.",
    themes: [{ label: 'LOCAL CURRENCY' }, { label: 'MINI-GRIDS' }, { label: 'CROSS RIVER' }],
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
    themes: [{ label: 'MESH GRID' }, { label: 'LOCAL CURRENCY' }, { label: 'PARTNERSHIP' }],
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
        text: "Climate Finance Blending Facility: Capitalized with $21.3 million in concessional funding from the UK Foreign, Commonwealth & Development Office and British International Investment, the facility mobilizes capital through first-loss risk sharing alongside InfraCredit's local currency guarantees.",
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
];

async function main() {
  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const news = await strapi.documents('api::news.news').findFirst({
      status: 'draft',
      populate: { sections: { on: SECTION_POPULATE } },
    });
    if (!news?.sections?.length) throw new Error('no News draft with sections found');

    const section = news.sections.find((item) => item.__component === 'news-page.articles-section');
    if (!section) throw new Error('news-page.articles-section not found on the live entry');

    const currentTitles = (section.articles ?? []).map((a) => `${a.articleId}: ${a.title}`);

    if (RESTORE) {
      if (!fs.existsSync(BACKUP_PATH)) throw new Error(`no backup found at ${BACKUP_PATH}`);
      const backedUp = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8'));
      console.log('Restoring articles:');
      backedUp.forEach((a) => console.log(`  ${a.articleId}: ${a.title}`));
      section.articles = backedUp;
    } else {
      console.log('Current live articles:');
      currentTitles.forEach((t) => console.log(`  ${t}`));
      console.log('\nWill be replaced with:');
      NEW_ARTICLES.forEach((a) => console.log(`  ${a.articleId}: ${a.title}`));

      if (DRY_RUN) {
        console.log('\n--dry-run: nothing written. Pass --apply to write for real.');
        return;
      }

      if (fs.existsSync(BACKUP_PATH)) {
        console.log(`\nbackup kept: ${path.relative(CMS_ROOT, BACKUP_PATH)} already exists (pre-change snapshot preserved)`);
      } else {
        fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(section.articles ?? [], null, 2)}\n`, 'utf8');
        console.log(`\nbackup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
      }

      section.articles = NEW_ARTICLES;
    }

    await strapi.documents('api::news.news').update({
      documentId: news.documentId,
      data: { sections: news.sections },
    });
    console.log('draft updated.');

    await strapi.documents('api::news.news').publish({ documentId: news.documentId });
    console.log('published — draft and published versions now match.');
  } finally {
    try {
      await strapi.destroy();
    } catch (error) {
      console.warn(`shutdown warning (data already committed): ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
