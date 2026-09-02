/**
 * Point every partner mark — the About page's PARTNERS grid and the footer
 * marquee — at the white/colour SVG pair now hosted on Cloudinary.
 *
 *   node scripts/apply-partner-logos-to-cms.cjs --dry-run   # report, write nothing
 *   node scripts/apply-partner-logos-to-cms.cjs             # apply
 *   node scripts/apply-partner-logos-to-cms.cjs --restore   # roll back from the backup
 *
 * Reads seed-manifests/partners/manifest.json (written by
 * scripts/upload-partner-logos.mjs) and the brand table in
 * scripts/partner-logo-sources.mjs. Partners are matched by `name`, not by
 * array index — the About grid's per-partner styling is already positional and
 * fragile enough without this script depending on order too.
 *
 * CommonJS on purpose: @strapi/strapi's ESM build fails to resolve its own
 * `lodash/fp` directory import under Node's ESM loader. The sources table is
 * ESM, so it comes in via dynamic import().
 *
 * Two structural changes beyond the URL swap:
 *   - British International Investment leaves the About Anchor Funders group
 *     (no artwork in frontend/public/partners) and joins the footer marquee on
 *     its legacy white PNG.
 *   - `about` has draftAndPublish, so it is updated then published; `footer`
 *     does not, so it is just updated.
 */
const fs = require('node:fs');
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const CMS_ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(CMS_ROOT, 'seed-manifests', 'partners', 'manifest.json');
const BACKUP_PATH = path.join(CMS_ROOT, 'seed-manifests', 'partners', 'pre-update-backup.json');

const DRY_RUN = process.argv.includes('--dry-run');
const RESTORE = process.argv.includes('--restore');

const short = (value) => {
  const text = String(value ?? '');
  return text.length > 72 ? `${text.slice(0, 72)}…` : text || '(empty)';
};

async function main() {
  const { partnerLogos, BII_FOOTER_ENTRY, ABOUT_REMOVED_PARTNER_NAME } = await import(
    './partner-logo-sources.mjs'
  );
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  for (const partner of partnerLogos) {
    const entry = manifest[partner.slug];
    if (!entry?.white || !entry?.colour) {
      throw new Error(`manifest is missing both variants for "${partner.slug}" — run upload-partner-logos.mjs first`);
    }
  }

  const appContext = await compileStrapi({ appDir: CMS_ROOT, distDir: path.join(CMS_ROOT, 'dist') });
  const strapi = await createStrapi(appContext).load();

  try {
    const backup = RESTORE ? null : { about: null, footer: null };
    const restorePoint = RESTORE ? JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf8')) : null;

    // ── About page ────────────────────────────────────────────────────────
    const about = await strapi.documents('api::about.about').findFirst({
      status: 'draft',
      populate: { sections: { on: { 'about-page.partners-section': { populate: { groups: { populate: '*' } } } } } },
    });
    if (!about?.sections?.length) throw new Error('no About draft with sections found');

    const section = about.sections.find((s) => s.__component === 'about-page.partners-section');
    if (!section) throw new Error('partners-section not found on the About draft');

    if (!RESTORE) backup.about = JSON.parse(JSON.stringify(section.groups ?? []));

    if (RESTORE) {
      section.groups = restorePoint.about;
      console.log(`about: restored ${section.groups.length} group(s) from backup`);
    } else {
      const byAboutName = new Map(
        partnerLogos.filter((p) => p.aboutName).map((p) => [p.aboutName, p])
      );
      const seen = new Set();

      for (const group of section.groups ?? []) {
        const before = group.partners?.length ?? 0;
        group.partners = (group.partners ?? []).filter((p) => p.name !== ABOUT_REMOVED_PARTNER_NAME);
        if (group.partners.length !== before) {
          console.log(`about: removed "${ABOUT_REMOVED_PARTNER_NAME}" from "${group.category}"`);
        }

        for (const partner of group.partners) {
          const source = byAboutName.get(partner.name);
          if (!source) {
            console.warn(`about: WARNING no artwork mapped for "${partner.name}" — left untouched`);
            continue;
          }
          const urls = manifest[source.slug];
          partner.logo = urls.white;
          partner.logoColour = urls.colour;
          partner.logo_alt_text = source.label;
          partner.logoColour_alt_text = source.label;
          seen.add(partner.name);
          console.log(`about: ${group.category} / ${partner.name}\n         white  ${short(urls.white)}\n         colour ${short(urls.colour)}`);
        }
      }

      const unmatched = [...byAboutName.keys()].filter((name) => !seen.has(name));
      if (unmatched.length) {
        throw new Error(`these mapped partners were not found in the CMS:\n  ${unmatched.join('\n  ')}`);
      }
    }

    // ── Footer marquee ────────────────────────────────────────────────────
    const footer = await strapi.documents('api::footer.footer').findFirst({
      populate: { partnerLogos: true },
    });
    if (!footer?.partnerLogos?.length) throw new Error('no footer entry with partnerLogos found');

    if (!RESTORE) backup.footer = JSON.parse(JSON.stringify(footer.partnerLogos));

    if (RESTORE) {
      footer.partnerLogos = restorePoint.footer;
      console.log(`footer: restored ${footer.partnerLogos.length} logo(s) from backup`);
    } else {
      const byFooterName = new Map(
        partnerLogos.filter((p) => p.footerName).map((p) => [p.footerName, p])
      );
      const seen = new Set();

      for (const item of footer.partnerLogos) {
        const source = byFooterName.get(item.name);
        if (!source) {
          console.warn(`footer: WARNING no artwork mapped for "${item.name}" — left untouched`);
          continue;
        }
        const urls = manifest[source.slug];
        item.logo = urls.white;
        item.logoColour = urls.colour;
        item.logo_alt_text = source.label;
        item.logoColour_alt_text = source.label;
        seen.add(item.name);
        console.log(`footer: ${item.name}\n         white  ${short(urls.white)}\n         colour ${short(urls.colour)}`);
      }

      const unmatched = [...byFooterName.keys()].filter((name) => !seen.has(name));
      if (unmatched.length) {
        throw new Error(`these mapped footer partners were not found in the CMS:\n  ${unmatched.join('\n  ')}`);
      }

      // Re-running must not stack duplicate BII entries.
      if (!footer.partnerLogos.some((item) => item.name === BII_FOOTER_ENTRY.name)) {
        footer.partnerLogos.push({ ...BII_FOOTER_ENTRY, logoColour: null, logoColour_alt_text: null });
        console.log(`footer: appended "${BII_FOOTER_ENTRY.name}" (white PNG only, no colour variant)`);
      } else {
        console.log(`footer: "${BII_FOOTER_ENTRY.name}" already present — not appended again`);
      }
    }

    if (DRY_RUN) {
      console.log('\n--dry-run: nothing written.');
      return;
    }

    if (!RESTORE) {
      fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(backup, null, 2)}\n`, 'utf8');
      console.log(`\nbackup written: ${path.relative(CMS_ROOT, BACKUP_PATH)}`);
    }

    await strapi.documents('api::about.about').update({
      documentId: about.documentId,
      data: { sections: about.sections },
    });
    await strapi.documents('api::about.about').publish({ documentId: about.documentId });
    console.log('about: draft updated and published.');

    await strapi.documents('api::footer.footer').update({
      documentId: footer.documentId,
      data: { partnerLogos: footer.partnerLogos },
    });
    console.log('footer: entry updated.');
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
