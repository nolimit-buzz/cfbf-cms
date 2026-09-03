import ExcelJS from 'exceljs';

/**
 * Builds the .xlsx the Email Log export downloads.
 *
 * The contact form collects different fields per role, so each role gets its own
 * sheet with its own columns — one flat table would leave half of every row
 * blank. Acknowledgement emails go on their own sheet (they carry no form data,
 * only a delivery outcome), and anything with an unrecognised type lands in a
 * catch-all so a future mail type can never vanish from the export unnoticed.
 */

type ColumnSpec = { header: string; key: string; width: number; wrap?: boolean };

/** Present on every sheet, so a row is always traceable back to its entry. */
const LEAD_COLUMNS: ColumnSpec[] = [
  { header: 'Reference', key: 'ref', width: 12 },
  { header: 'Date', key: 'date', width: 34 },
  { header: 'Status', key: 'status', width: 10 },
];

const CONTACT_TAIL: ColumnSpec[] = [
  { header: 'Assessment outcome', key: 'readiness', width: 22 },
  { header: 'Readiness score', key: 'score', width: 16 },
  { header: 'Assessment technology', key: 'tech', width: 24 },
  { header: 'Message', key: 'message', width: 60, wrap: true },
];

const CONTACT_HEAD: ColumnSpec[] = [
  { header: 'Full name', key: 'fullName', width: 26 },
  { header: 'Organization', key: 'organization', width: 26 },
  { header: 'Email', key: 'emailAddress', width: 30 },
];

const DEVELOPER_COLUMNS: ColumnSpec[] = [
  ...LEAD_COLUMNS,
  ...CONTACT_HEAD,
  { header: 'Technology type', key: 'techType', width: 24 },
  { header: 'Capacity', key: 'capacity', width: 14 },
  ...CONTACT_TAIL,
];

const INVESTOR_COLUMNS: ColumnSpec[] = [
  ...LEAD_COLUMNS,
  ...CONTACT_HEAD,
  { header: 'Institution type', key: 'institutionType', width: 24 },
  { header: 'Investment tranche', key: 'investmentTranche', width: 22 },
  ...CONTACT_TAIL,
];

// Also the catch-all's column set: the fields every contact enquiry has.
const DONOR_COLUMNS: ColumnSpec[] = [...LEAD_COLUMNS, ...CONTACT_HEAD, ...CONTACT_TAIL];

const ACK_COLUMNS: ColumnSpec[] = [
  ...LEAD_COLUMNS,
  { header: 'Full name', key: 'fullName', width: 26 },
  { header: 'Email', key: 'to', width: 30 },
  { header: 'Subject', key: 'subject', width: 44 },
  { header: 'Error', key: 'error', width: 60, wrap: true },
];

// Reads like the admin table but stays a genuine datetime, so the column sorts
// and filters properly — which a text date does not.
const DATE_FORMAT = 'dddd, d mmmm yyyy h:mm AM/PM';

const HEADER_FILL: ExcelJS.Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFEFEFEF' },
};

const text = (value: unknown) => (value === null || value === undefined ? '' : String(value));

const toDate = (value: unknown) => {
  if (!value) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** `payload` comes back from the API as an object, but may be a JSON string. */
export const readPayload = (value: unknown): Record<string, unknown> => {
  if (!value) return {};
  if (typeof value === 'object') return value as Record<string, unknown>;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
};

/**
 * Recovers the fields from the archived plain-text email body.
 *
 * The sender renders `Label: value` lines above a blank line, then the visitor's
 * free-text message. This is the fallback for entries whose `payload` is missing
 * — a field added to the form but not to the payload still exports correctly.
 */
const parseBody = (body: string) => {
  const lines = body.split('\n');
  const labels: Record<string, string> = {};

  let blankAt = -1;
  lines.forEach((line, index) => {
    if (blankAt === -1 && line.trim() === '') blankAt = index;
    const match = /^([A-Za-z][A-Za-z .'-]*):\s*(.*)$/.exec(line);
    if (match && (blankAt === -1 || index < blankAt)) {
      labels[match[1].toLowerCase()] = match[2].trim();
    }
  });

  // Everything after the first blank line is the visitor's free-text message.
  const message = blankAt === -1 ? '' : lines.slice(blankAt + 1).join('\n').trim();

  return { labels, message };
};

/** Payload value first, then the label the email body rendered it under. */
const pick = (
  payload: Record<string, unknown>,
  labels: Record<string, string>,
  key: string,
  label: string
) => text(payload[key]) || labels[label.toLowerCase()] || '';

const contactRow = (row: Record<string, unknown>) => {
  const payload = readPayload(row.payload);
  const { labels, message } = parseBody(text(row.body));

  return {
    ref: text(row.ref),
    date: toDate(row.sentAt ?? row.createdAt),
    status: text(row.status),
    fullName: pick(payload, labels, 'fullName', 'Full name'),
    organization: pick(payload, labels, 'organization', 'Organization'),
    emailAddress: pick(payload, labels, 'emailAddress', 'Email'),
    techType: pick(payload, labels, 'techType', 'Technology type'),
    capacity: pick(payload, labels, 'capacity', 'Capacity'),
    institutionType: pick(payload, labels, 'institutionType', 'Institution type'),
    investmentTranche: pick(payload, labels, 'investmentTranche', 'Investment tranche'),
    readiness: pick(payload, labels, 'readiness', 'Assessment outcome'),
    score: pick(payload, labels, 'score', 'Readiness score'),
    tech: pick(payload, labels, 'tech', 'Assessment technology'),
    message: text(payload.message) || message,
  };
};

const ackRow = (row: Record<string, unknown>) => {
  const payload = readPayload(row.payload);
  const { labels } = parseBody(text(row.body));

  return {
    ref: text(row.ref),
    date: toDate(row.sentAt ?? row.createdAt),
    status: text(row.status),
    fullName: pick(payload, labels, 'fullName', 'Full name'),
    to: text(row.to),
    subject: text(row.subject),
    error: text(row.error),
  };
};

const addSheet = (
  book: ExcelJS.Workbook,
  name: string,
  columns: ColumnSpec[],
  rows: Record<string, unknown>[]
) => {
  const sheet = book.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] });

  sheet.columns = columns.map(({ header, key, width }) => ({ header, key, width }));
  rows.forEach((row) => sheet.addRow(row));

  const header = sheet.getRow(1);
  header.font = { bold: true };
  header.fill = HEADER_FILL;

  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };

  columns.forEach((column, index) => {
    const sheetColumn = sheet.getColumn(index + 1);
    // Top-aligned so a wrapped message does not push its row's other values to
    // the vertical middle of a tall cell.
    sheetColumn.alignment = { vertical: 'top', wrapText: Boolean(column.wrap) };
    if (column.key === 'date') sheetColumn.numFmt = DATE_FORMAT;
  });

  // Re-apply: setting column alignment above also overwrites the header's.
  header.alignment = { vertical: 'middle' };

  return sheet;
};

/** Builds the .xlsx as a blob, ready to hand to a download link. */
export const toWorkbookBlob = async (rows: Record<string, unknown>[]) => {
  const book = new ExcelJS.Workbook();
  book.created = new Date();

  const contact = rows.filter((row) => row.type === 'contact');
  const ack = rows.filter((row) => row.type === 'contact-ack');
  const other = rows.filter((row) => row.type !== 'contact' && row.type !== 'contact-ack');

  const developer: Record<string, unknown>[] = [];
  const investor: Record<string, unknown>[] = [];
  // Donor also takes any contact row whose payload has no recognised role: it
  // carries the shared columns, so an unknown role still lands on a contact
  // sheet rather than being dropped into Other.
  const donor: Record<string, unknown>[] = [];

  contact.forEach((row) => {
    const role = readPayload(row.payload).role;
    if (role === 'developer') developer.push(row);
    else if (role === 'investor') investor.push(row);
    else donor.push(row);
  });

  const sheets: Array<[string, ColumnSpec[], Record<string, unknown>[]]> = [
    ['Developer', DEVELOPER_COLUMNS, developer.map(contactRow)],
    ['Investor', INVESTOR_COLUMNS, investor.map(contactRow)],
    ['Donor', DONOR_COLUMNS, donor.map(contactRow)],
    ['Acknowledgements', ACK_COLUMNS, ack.map(ackRow)],
    ['Other', DONOR_COLUMNS, other.map(contactRow)],
  ];

  const populated = sheets.filter(([, , sheetRows]) => sheetRows.length > 0);
  // A workbook must never be sheetless — ExcelJS writes one happily and Excel
  // then refuses to open it.
  const toAdd = populated.length > 0 ? populated : [sheets[0]];

  toAdd.forEach(([name, columns, sheetRows]) => addSheet(book, name, columns, sheetRows));

  const buffer = await book.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
};

/** `email-log-2026-09-03.xlsx` — a filename that sorts chronologically. */
export const workbookFilename = (date = new Date()) =>
  `email-log-${date.toISOString().slice(0, 10)}.xlsx`;
