import type { Core } from '@strapi/strapi';

import { aboutSections } from './seed/about-page-copy';
import { contactSections } from './seed/contact-page-copy';
import { eligibilitySections } from './seed/eligibility-page-copy';
import { homeSections } from './seed/home-page-copy';
import { howItWorksSections } from './seed/how-it-works-page-copy';
import { impactSections } from './seed/impact-page-copy';
import { newsSections } from './seed/news-page-copy';
import { projectsSections } from './seed/projects-page-copy';

type SingleTypeSeed = {
  uid: string;
  label: string;
  sections: unknown[];
};

/**
 * Every page single type, with the copy used to pre-fill it on a fresh boot.
 * Order is cosmetic — it only affects the log output.
 */
const SINGLE_TYPES: SingleTypeSeed[] = [
  { uid: 'api::home.home', label: 'HOME', sections: homeSections },
  { uid: 'api::about.about', label: 'ABOUT', sections: aboutSections },
  { uid: 'api::projects.projects', label: 'PROJECTS', sections: projectsSections },
  { uid: 'api::impact.impact', label: 'IMPACT', sections: impactSections },
  { uid: 'api::eligibility.eligibility', label: 'ELIGIBILITY', sections: eligibilitySections },
  { uid: 'api::news.news', label: 'NEWS', sections: newsSections },
  { uid: 'api::how-it-works.how-it-works', label: 'HOW IT WORKS', sections: howItWorksSections },
  { uid: 'api::contact.contact', label: 'CONTACT', sections: contactSections },
];

/**
 * Seeds a single type if it is empty, then makes sure it is published.
 *
 * `status: 'draft'` on the lookup matters: entries are created as unpublished
 * drafts, and findFirst defaults to looking for the *published* version — which
 * would be null on a fresh instance and make this reseed on every boot.
 *
 * Publishing is the step that makes a fresh instance actually serve content:
 * the public REST API returns published entries only, so a seeded-but-draft
 * entry yields `data: null` and an empty page.
 */
async function seedSingleType(
  strapi: Core.Strapi,
  { uid, label, sections }: SingleTypeSeed
) {
  const documents = strapi.documents(uid as any);

  const existingDraft = await documents.findFirst({
    populate: ['sections'],
    status: 'draft',
  });

  let draft = existingDraft;

  if (!(draft as any)?.sections?.length) {
    draft = await documents.create({ data: { sections } } as any);
    strapi.log.info(`[seed] ${label} page seeded with ${sections.length} sections.`);
  }

  const published = await documents.findFirst({ status: 'published' });

  if (!published && (draft as any)?.documentId) {
    await documents.publish({ documentId: (draft as any).documentId } as any);
    strapi.log.info(`[seed] ${label} page published.`);
  }
}

/**
 * Grants the Public role read access to each single type.
 *
 * Without this a fresh database rejects anonymous reads, so the frontend gets
 * nothing back and every page renders empty. Doing it here means a new clone or
 * a dropped database works without anyone clicking through the admin UI.
 *
 * In Strapi 5 the permission model is just `{ action, role }` — there is no
 * `enabled` column, so a row's presence *is* the grant.
 */
async function grantPublicFind(strapi: Core.Strapi, uids: string[]) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[permissions] No public role found — skipping grants.');
    return;
  }

  const granted: string[] = [];

  for (const uid of uids) {
    // Single types expose `find` (there is no `findOne` on a single type).
    const action = `${uid}.find`;

    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });

      granted.push(action);
    }
  }

  if (granted.length > 0) {
    strapi.log.info(
      `[permissions] Granted public read on: ${granted.join(', ')}`
    );
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   *
   * Both steps below are idempotent — this runs on every boot, including in
   * production where everything is already seeded, published and granted, and
   * each call is then a no-op.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    for (const singleType of SINGLE_TYPES) {
      await seedSingleType(strapi, singleType);
    }

    await grantPublicFind(
      strapi,
      SINGLE_TYPES.map((s) => s.uid)
    );
  },
};
