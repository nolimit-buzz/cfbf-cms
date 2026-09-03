import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@strapi/design-system';
import { Download } from '@strapi/icons';
import { useFetchClient, useNotification } from '@strapi/strapi/admin';

import { toWorkbookBlob, workbookFilename } from './workbook';

export const EMAIL_LOG_UID = 'api::email-log.email-log';

// The Content Manager's own admin endpoint — already authorised by the admin
// session and by the reader's permissions on this collection, so the export can
// never show more than the person could see in the table itself.
const CM_ENDPOINT = `/content-manager/collection-types/${EMAIL_LOG_UID}`;

const PAGE_SIZE = 100;
// A guard rail so a runaway loop can never hang the browser.
const MAX_PAGES = 200;

// Asked for explicitly: the list view is configured to show only a few columns,
// and the export needs `payload` and `body` to fill in the detail columns.
// `type` is listed deliberately — it drives the sheet partitioning, and relying
// on Strapi returning it incidentally means one upgrade silently dumps every
// row into the catch-all sheet.
const FIELDS = [
  'ref',
  'type',
  'to',
  'subject',
  'body',
  'payload',
  'status',
  'error',
  'sentAt',
  'createdAt',
];

const triggerDownload = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = workbookFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

/**
 * Builds and downloads the workbook. `ids` limits the export to the given
 * entries; omit it to export the whole archive.
 */
export const useExportEmailLog = () => {
  const { get } = useFetchClient();
  const { toggleNotification } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const exportLog = React.useCallback(
    async (ids?: Array<string | number>) => {
      setIsLoading(true);
      try {
        const rows: Record<string, unknown>[] = [];

        for (let page = 1; page <= MAX_PAGES; page += 1) {
          const params: Record<string, unknown> = {
            page,
            pageSize: PAGE_SIZE,
            sort: 'sentAt:DESC',
            fields: FIELDS,
          };
          if (ids?.length) {
            params['filters[documentId][$in]'] = ids;
          }

          const { data } = await get(CM_ENDPOINT, { params });
          rows.push(...(data?.results ?? []));

          const pageCount = data?.pagination?.pageCount ?? 1;
          if (page >= pageCount) break;
        }

        if (rows.length === 0) {
          toggleNotification({ type: 'warning', message: 'There is nothing to export.' });
          return;
        }

        triggerDownload(await toWorkbookBlob(rows));

        toggleNotification({
          type: 'success',
          message: `Exported ${rows.length} ${rows.length === 1 ? 'entry' : 'entries'}.`,
        });
      } catch (error) {
        console.error('[email-log] export failed', error);
        toggleNotification({
          type: 'danger',
          message: 'Could not export the email log. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [get, toggleNotification]
  );

  return { exportLog, isLoading };
};

/**
 * "Export all" button for the list view header. The injection zone is shared by
 * every collection type, so it renders nothing outside the email log.
 */
export const ExportAllButton = () => {
  const { slug } = useParams<{ slug: string }>();
  const { exportLog, isLoading } = useExportEmailLog();

  if (slug !== EMAIL_LOG_UID) return null;

  return (
    <Button
      variant="secondary"
      startIcon={<Download />}
      loading={isLoading}
      onClick={() => exportLog()}
    >
      Export all
    </Button>
  );
};
