import type { Core } from '@strapi/strapi';

import { aboutSections } from './seed/about-page-copy';
import { contactSections } from './seed/contact-page-copy';
import { eligibilitySections } from './seed/eligibility-page-copy';
import { homeSections } from './seed/home-page-copy';
import { howItWorksSections } from './seed/how-it-works-page-copy';
import { impactSections } from './seed/impact-page-copy';
import { newsSections } from './seed/news-page-copy';
import { projectRecords } from './seed/projects-collection';
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
 * Seeds the `project` collection — one entry per case study at /projects/[id].
 *
 * Same two subtleties as seedSingleType: look the entry up as a *draft* (a fresh
 * instance has no published version, so a published-only lookup would reseed on
 * every boot), and publish explicitly so the public REST API serves it.
 *
 * Idempotency is per record, keyed on `projectId`, so adding a seventh entry to
 * the seed file backfills it without disturbing the six already in the database
 * — and edits made in the admin UI are never overwritten.
 *
 * The dedupe step is not belt-and-braces: `unique: true` in Strapi 5 is scoped
 * per document, so it does not stop two *different* documents from sharing a
 * projectId. If bootstrap ever runs twice concurrently (as `strapi develop` can
 * do around a rebuild), both passes see no existing draft and both create one.
 * Collapsing extras here means the next boot repairs the database instead of
 * serving /projects/01 twice.
 */
async function seedProjectRecords(strapi: Core.Strapi) {
  const documents = strapi.documents('api::project.project' as any);

  for (const record of projectRecords) {
    const existingDrafts = (await documents.findMany({
      filters: { projectId: record.projectId },
      status: 'draft',
    } as any)) as any[];

    let draft = existingDrafts?.[0];

    for (const duplicate of existingDrafts?.slice(1) ?? []) {
      await documents.delete({ documentId: duplicate.documentId } as any);
      strapi.log.warn(
        `[seed] PROJECT ${record.projectId}: removed duplicate ${duplicate.documentId}.`
      );
    }

    if (!draft) {
      draft = await documents.create({ data: record } as any);
      strapi.log.info(`[seed] PROJECT ${record.projectId} (${record.title}) seeded.`);
    }

    const published = await documents.findFirst({
      filters: { projectId: record.projectId },
      documentId: (draft as any)?.documentId,
      status: 'published',
    } as any);

    if (!published && (draft as any)?.documentId) {
      await documents.publish({ documentId: (draft as any).documentId } as any);
      strapi.log.info(`[seed] PROJECT ${record.projectId} published.`);
    }
  }
}

/**
 * Grants the Public role each of the given permission actions.
 *
 * Without this a fresh database rejects anonymous reads, so the frontend gets
 * nothing back and every page renders empty. Doing it here means a new clone or
 * a dropped database works without anyone clicking through the admin UI.
 *
 * Callers pass whole action strings because the set differs by kind: a single
 * type only exposes `find`, while a collection needs `find` *and* `findOne` —
 * /projects/[id] fetches one record at a time.
 *
 * In Strapi 5 the permission model is just `{ action, role }` — there is no
 * `enabled` column, so a row's presence *is* the grant.
 */
async function grantPublicRead(strapi: Core.Strapi, actions: string[]) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[permissions] No public role found — skipping grants.');
    return;
  }

  const granted: string[] = [];

  for (const action of actions) {
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

    await seedProjectRecords(strapi);

    await grantPublicRead(strapi, [
      // Single types expose `find` only — there is no `findOne` on a single type.
      ...SINGLE_TYPES.map((s) => `${s.uid}.find`),
      'api::project.project.find',
      'api::project.project.findOne',
    ]);
  },
};
