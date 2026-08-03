import type { Schema, Struct } from '@strapi/strapi';

export interface HomePageAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_about_sections';
  info: {
    description: '';
    displayName: 'About Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    partners: Schema.Attribute.Component<'home-page.partner-item', true>;
    partnersHeading: Schema.Attribute.String;
    statDescription: Schema.Attribute.Text;
    statValue: Schema.Attribute.String;
  };
}

export interface HomePageCategoryItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_category_items';
  info: {
    description: '';
    displayName: 'Category Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface HomePageFeatureCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_feature_card_items';
  info: {
    description: '';
    displayName: 'Feature Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomePageGallerySlideItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_gallery_slide_items';
  info: {
    description: '';
    displayName: 'Gallery Slide Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
  };
}

export interface HomePageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    newsCtaLabel: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'home-page.stat-item', true>;
    subheadline: Schema.Attribute.Text;
  };
}

export interface HomePageImpactSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_impact_sections';
  info: {
    description: '';
    displayName: 'Impact Section';
  };
  attributes: {
    capacityCtaLabel: Schema.Attribute.String;
    capacityStats: Schema.Attribute.Component<'home-page.stat-item', true>;
    eyebrow: Schema.Attribute.String;
    galleryCtaLabel: Schema.Attribute.String;
    gallerySlides: Schema.Attribute.Component<
      'home-page.gallery-slide-item',
      true
    >;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    knowledgeHubSubtitle: Schema.Attribute.Text;
    knowledgeHubTitle: Schema.Attribute.String;
    metricCards: Schema.Attribute.Component<'home-page.metric-card-item', true>;
    numbersCtaLabel: Schema.Attribute.String;
    reportCtaLabel: Schema.Attribute.String;
    reportFileHref: Schema.Attribute.String;
    reportFileName: Schema.Attribute.String;
    reports: Schema.Attribute.Component<'home-page.report-item', true>;
    statsCardEyebrow: Schema.Attribute.String;
    tabs: Schema.Attribute.Component<'home-page.tab-item', true>;
    theoryCards: Schema.Attribute.Component<'home-page.theory-card-item', true>;
    theoryEyebrow: Schema.Attribute.String;
    theoryFooterLabel: Schema.Attribute.Text;
    theoryHeadingPrimary: Schema.Attribute.String;
    theoryHeadingSecondary: Schema.Attribute.String;
  };
}

export interface HomePageMapMarkerItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_marker_items';
  info: {
    description: '';
    displayName: 'Map Marker Item';
  };
  attributes: {
    name: Schema.Attribute.String;
    x: Schema.Attribute.String;
    y: Schema.Attribute.String;
  };
}

export interface HomePageMapSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_sections';
  info: {
    description: '';
    displayName: 'Map Section';
  };
  attributes: {
    activeStates: Schema.Attribute.Component<'home-page.map-state-item', true>;
    body: Schema.Attribute.Text;
    categories: Schema.Attribute.Component<'home-page.category-item', true>;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headingPrimary: Schema.Attribute.String;
    headingSecondary: Schema.Attribute.String;
    markers: Schema.Attribute.Component<'home-page.map-marker-item', true>;
    statLabel: Schema.Attribute.String;
    statValue: Schema.Attribute.String;
  };
}

export interface HomePageMapStateItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_map_state_items';
  info: {
    description: '';
    displayName: 'Map State Item';
  };
  attributes: {
    stateId: Schema.Attribute.String;
  };
}

export interface HomePageMetricCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_metric_card_items';
  info: {
    description: '';
    displayName: 'Metric Card Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HomePageNetZeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_net_zero_sections';
  info: {
    description: '';
    displayName: 'Net Zero Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cardBody: Schema.Attribute.Text;
    cardSubtitle: Schema.Attribute.String;
    cardTitle: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<'home-page.feature-card-item', true>;
    heading: Schema.Attribute.String;
  };
}

export interface HomePageNewsArticleItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_article_items';
  info: {
    description: '';
    displayName: 'News Article Item';
  };
  attributes: {
    articleId: Schema.Attribute.String;
    author: Schema.Attribute.String;
    authorAvatar: Schema.Attribute.String;
    date: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    keyContext: Schema.Attribute.Text;
    paragraphs: Schema.Attribute.Component<
      'home-page.news-paragraph-item',
      true
    >;
    readTime: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    themes: Schema.Attribute.Component<'home-page.news-theme-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomePageNewsParagraphItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_paragraph_items';
  info: {
    description: '';
    displayName: 'News Paragraph Item';
  };
  attributes: {
    blockType: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    text: Schema.Attribute.Text;
    url: Schema.Attribute.String;
  };
}

export interface HomePageNewsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_sections';
  info: {
    description: '';
    displayName: 'News Section';
  };
  attributes: {
    articles: Schema.Attribute.Component<'home-page.news-article-item', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    readArticleLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageNewsThemeItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_news_theme_items';
  info: {
    description: '';
    displayName: 'News Theme Item';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface HomePagePartnerItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_partner_items';
  info: {
    description: '';
    displayName: 'Partner Item';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface HomePageProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_project_items';
  info: {
    description: '';
    displayName: 'Project Item';
  };
  attributes: {
    capacity: Schema.Attribute.String;
    capital: Schema.Attribute.String;
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    imageOne: Schema.Attribute.String;
    imageTwo: Schema.Attribute.String;
    impact: Schema.Attribute.Text;
    location: Schema.Attribute.String;
    problem: Schema.Attribute.Text;
    projectId: Schema.Attribute.String;
    solution: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface HomePageProjectsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_projects_sections';
  info: {
    description: '';
    displayName: 'Projects Section';
  };
  attributes: {
    capacityLabel: Schema.Attribute.String;
    capitalLabel: Schema.Attribute.String;
    categories: Schema.Attribute.Component<'home-page.category-item', true>;
    challengeLabel: Schema.Attribute.String;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    detailCtaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    impactLabel: Schema.Attribute.String;
    projects: Schema.Attribute.Component<'home-page.project-item', true>;
    solutionLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageReportItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_report_items';
  info: {
    description: '';
    displayName: 'Report Item';
  };
  attributes: {
    reportId: Schema.Attribute.String;
    size: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageSponsorItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_sponsor_items';
  info: {
    description: '';
    displayName: 'Sponsor Item';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface HomePageStatItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_stat_items';
  info: {
    description: '';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HomePageStoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_stories_sections';
  info: {
    description: '';
    displayName: 'Stories Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    locationLabel: Schema.Attribute.String;
    roleLabel: Schema.Attribute.String;
    stories: Schema.Attribute.Component<'home-page.story-item', true>;
    typeLabel: Schema.Attribute.String;
    viewTabs: Schema.Attribute.Component<'home-page.view-tab-item', true>;
  };
}

export interface HomePageStoryItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_story_items';
  info: {
    description: '';
    displayName: 'Story Item';
  };
  attributes: {
    badge: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    location: Schema.Attribute.String;
    role: Schema.Attribute.String;
    storyType: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageStructuredDataSection extends Struct.ComponentSchema {
  collectionName: 'components_home_page_structured_data_sections';
  info: {
    description: '';
    displayName: 'Structured Data Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logoUrl: Schema.Attribute.String;
    organizationName: Schema.Attribute.String;
    siteName: Schema.Attribute.String;
    sponsors: Schema.Attribute.Component<'home-page.sponsor-item', true>;
    url: Schema.Attribute.String;
  };
}

export interface HomePageTabItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_tab_items';
  info: {
    description: '';
    displayName: 'Tab Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageTheoryCardItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_theory_card_items';
  info: {
    description: '';
    displayName: 'Theory Card Item';
  };
  attributes: {
    cardId: Schema.Attribute.String;
    cardType: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.String;
    link: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomePageViewTabItem extends Struct.ComponentSchema {
  collectionName: 'components_home_page_view_tab_items';
  info: {
    description: '';
    displayName: 'View Tab Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    tabId: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'home-page.about-section': HomePageAboutSection;
      'home-page.category-item': HomePageCategoryItem;
      'home-page.feature-card-item': HomePageFeatureCardItem;
      'home-page.gallery-slide-item': HomePageGallerySlideItem;
      'home-page.hero-section': HomePageHeroSection;
      'home-page.impact-section': HomePageImpactSection;
      'home-page.map-marker-item': HomePageMapMarkerItem;
      'home-page.map-section': HomePageMapSection;
      'home-page.map-state-item': HomePageMapStateItem;
      'home-page.metric-card-item': HomePageMetricCardItem;
      'home-page.net-zero-section': HomePageNetZeroSection;
      'home-page.news-article-item': HomePageNewsArticleItem;
      'home-page.news-paragraph-item': HomePageNewsParagraphItem;
      'home-page.news-section': HomePageNewsSection;
      'home-page.news-theme-item': HomePageNewsThemeItem;
      'home-page.partner-item': HomePagePartnerItem;
      'home-page.project-item': HomePageProjectItem;
      'home-page.projects-section': HomePageProjectsSection;
      'home-page.report-item': HomePageReportItem;
      'home-page.sponsor-item': HomePageSponsorItem;
      'home-page.stat-item': HomePageStatItem;
      'home-page.stories-section': HomePageStoriesSection;
      'home-page.story-item': HomePageStoryItem;
      'home-page.structured-data-section': HomePageStructuredDataSection;
      'home-page.tab-item': HomePageTabItem;
      'home-page.theory-card-item': HomePageTheoryCardItem;
      'home-page.view-tab-item': HomePageViewTabItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
