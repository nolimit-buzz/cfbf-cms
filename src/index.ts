import type { Core } from '@strapi/strapi';

import { aboutSections } from './seed/about-page-copy';
import { contactSections } from './seed/contact-page-copy';
import { eligibilitySections } from './seed/eligibility-page-copy';
import { footerPartnerLogos } from './seed/footer-copy';
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

/** A dynamic-zone entry as it arrives from, or is sent to, the document service. */
type ZoneEntry = { __component: string; id?: number } & Record<string, unknown>;

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
 * Builds the populate tree for one component, recursing through nested
 * components.
 *
 * `populate: '*'` only reaches one level down, which is not enough here: a
 * milestones section nests section -> milestone -> event, three levels deep.
 * Anything left unpopulated comes back `undefined`, and since the backfill
 * below rewrites the whole `sections` array, an under-populated read would
 * write those nested lists back as nothing. So the tree is derived from the
 * schema registry rather than guessed.
 *
 * Only `component` attributes need recursion — every "image" on these page
 * components is a plain URL string, not a media relation.
 */
function buildComponentPopulate(
  strapi: Core.Strapi,
  componentUid: string,
  depth = 0
): Record<string, unknown> | null {
  const schema = (strapi.components as any)?.[componentUid];

  // `null` means "nothing deeper to populate" — callers omit the `populate` key
  // entirely for these. A nested `populate: true` is rejected by Strapi: inside
  // a populate object the value must be a string, array of strings, or object.
  if (!schema || depth > 6) return null;

  const populate: Record<string, unknown> = {};

  for (const [name, attribute] of Object.entries<any>(schema.attributes ?? {})) {
    if (attribute?.type === 'component' && attribute.component) {
      const child = buildComponentPopulate(strapi, attribute.component, depth + 1);
      populate[name] = child ? { populate: child } : {};
    }
  }

  return Object.keys(populate).length > 0 ? populate : null;
}

/**
 * Builds the `populate` argument that reads a page's dynamic zone in full.
 *
 * Dynamic zones need the `on` form: each component in the zone has different
 * attribute names, so they cannot share one populate object.
 */
function buildSectionsPopulate(strapi: Core.Strapi, uid: string): any {
  const zone = (strapi.contentType(uid as any) as any)?.attributes?.sections;
  const components: string[] = zone?.components ?? [];

  if (zone?.type !== 'dynamiczone' || components.length === 0) return ['sections'];

  const on: Record<string, unknown> = {};

  for (const componentUid of components) {
    const child = buildComponentPopulate(strapi, componentUid);
    on[componentUid] = child ? { populate: child } : {};
  }

  return { sections: { on } };
}

/**
 * Confirms a section read back from the database carries every nested list its
 * schema declares.
 *
 * This is the guard that makes the backfill safe to write. A populated but
 * genuinely empty repeatable comes back as `[]`; one that was never populated
 * comes back `undefined`. Only the latter would silently discard content on
 * write, and it is exactly what this rejects.
 */
function isFullyPopulated(strapi: Core.Strapi, entry: ZoneEntry): boolean {
  const schema = (strapi.components as any)?.[entry.__component];
  if (!schema) return false;

  for (const [name, attribute] of Object.entries<any>(schema.attributes ?? {})) {
    if (attribute?.type !== 'component') continue;

    const value = (entry as any)[name];
    if (value === undefined) return false;

    const children = Array.isArray(value) ? value : [value];
    for (const child of children) {
      if (child && !isFullyPopulated(strapi, { ...child, __component: attribute.component })) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Seeds a single type if it is empty, backfills any section the seed has gained
 * since the entry was created, then makes sure it is published.
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
  const populate = buildSectionsPopulate(strapi, uid);

  const existingDraft = await documents.findFirst({ populate, status: 'draft' } as any);

  let draft = existingDraft;

  if (!(draft as any)?.sections?.length) {
    draft = await documents.create({ data: { sections } } as any);
    strapi.log.info(`[seed] ${label} page seeded with ${sections.length} sections.`);
  } else {
    draft = await backfillMissingSections(strapi, { uid, label, sections }, draft as any, populate);
  }

  const published = await documents.findFirst({ status: 'published' });

  if (!published && (draft as any)?.documentId) {
    await documents.publish({ documentId: (draft as any).documentId } as any);
    strapi.log.info(`[seed] ${label} page published.`);
  }
}

/**
 * Appends sections the seed file has but the stored entry does not.
 *
 * Entries created from an older seed are missing whatever was added since, and
 * the "only seed when empty" rule above means they never catch up. Appending —
 * rather than replacing — means copy edited in the admin is never overwritten;
 * only genuinely absent sections are added. Matching is by `__component`, which
 * is also how the frontend picks sections, so append order is cosmetic.
 *
 * A dynamic zone can only be written as a whole array, so this rewrites the
 * existing sections alongside the new ones. That is safe only if they were read
 * back complete, hence the `isFullyPopulated` check — and if anything looks
 * partial this bails out rather than risk truncating live content. Likewise the
 * whole thing is wrapped in a try/catch: a failed backfill must never take the
 * rest of the boot down with it.
 */
async function backfillMissingSections(
  strapi: Core.Strapi,
  { uid, label, sections }: SingleTypeSeed,
  draft: { documentId: string; sections: ZoneEntry[] },
  populate: any
) {
  const documents = strapi.documents(uid as any);

  try {
    const existing = draft.sections ?? [];
    const present = new Set(existing.map((section) => section.__component));
    const missing = (sections as ZoneEntry[]).filter((section) => !present.has(section.__component));

    if (missing.length === 0) return draft;

    const partial = existing.filter((section) => !isFullyPopulated(strapi, section));

    if (partial.length > 0) {
      strapi.log.warn(
        `[seed] ${label} page is missing ${missing.map((s) => s.__component).join(', ')}, ` +
          `but ${partial.map((s) => s.__component).join(', ')} read back incomplete — ` +
          'skipping backfill rather than risk overwriting stored content. Add the ' +
          'missing sections in the admin instead.'
      );
      return draft;
    }

    const updated = await documents.update({
      documentId: draft.documentId,
      data: { sections: [...existing, ...missing] },
      populate,
    } as any);

    strapi.log.info(
      `[seed] ${label} page backfilled with ${missing.length} section(s): ` +
        missing.map((s) => s.__component).join(', ')
    );

    // The public API serves the published version, so an unpublished backfill
    // would be invisible. Publishing here also carries across any draft edits
    // an editor had not published yet.
    await documents.publish({ documentId: draft.documentId } as any);
    strapi.log.info(`[seed] ${label} page republished after backfill.`);

    return (updated as any) ?? draft;
  } catch (error) {
    strapi.log.error(
      `[seed] ${label} page backfill failed — leaving the entry untouched. ` +
        (error instanceof Error ? error.message : String(error))
    );
    return draft;
  }
}

/**
 * Seeds the `footer` single type if it is empty.
 *
 * `footer` is flat (a `partnerLogos` component list, no `sections` dynamic
 * zone), so it uses the same "seed once, never overwrite" guard as
 * `seedSingleType` above but skips that function's zone-populate and
 * backfill machinery, which assume a `sections` attribute. Not published —
 * `draftAndPublish: false` on the schema (like `global`) means every write
 * is already the live version.
 */
async function seedFooterSingleType(strapi: Core.Strapi) {
  const documents = strapi.documents('api::footer.footer' as any);
  const existing = await documents.findFirst({ populate: { partnerLogos: true } } as any);

  if ((existing as any)?.partnerLogos?.length) return;

  await documents.create({ data: { partnerLogos: footerPartnerLogos } } as any);
  strapi.log.info(`[seed] FOOTER seeded with ${footerPartnerLogos.length} partner logo(s).`);
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
    await seedFooterSingleType(strapi);

    await grantPublicRead(strapi, [
      // Single types expose `find` only — there is no `findOne` on a single type.
      ...SINGLE_TYPES.map((s) => `${s.uid}.find`),
      'api::project.project.find',
      'api::project.project.findOne',
      // Not in SINGLE_TYPES: `global` holds site-wide settings rather than a
      // page's `sections` zone, so it is not seeded — but the footer reads its
      // `socialLinks`, which needs the same public grant.
      'api::global.global.find',
      // Not in SINGLE_TYPES either: `footer` is flat like `global` and seeded
      // separately above via seedFooterSingleType.
      'api::footer.footer.find',
    ]);
  },
};
