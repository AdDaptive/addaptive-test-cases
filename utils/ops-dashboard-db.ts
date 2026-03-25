import path from 'node:path';
import { queryJson, querySingleJson, sqlLiteral } from './db-config';
import { config } from './config';

export const allowedOpsDashboardTables = [
  'daily-budget',
  'life-budget',
  'pacing-percentage',
  'resync',
  'delete',
  'user-notes',
  'xandr-life-budget'
] as const;

export type OpsDashboardTable = (typeof allowedOpsDashboardTables)[number];

type OpsDashboardDailyBudgetRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItemName: string | null;
  creatives: string | null;
  apDailyBudget: string | null;
  apDailyBudgetNew: string | null;
};

type OpsDashboardLifeBudgetRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItemName: string | null;
  creatives: string | null;
  apLifeBudget: string | null;
  apLifeBudgetNew: string | null;
};

type OpsDashboardPacingPercentageRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItems: string | null;
  creatives: string | null;
  lineItemSearchText: string | null;
  pacingPercentage: string | null;
  pacingPercentageNew: string | null;
};

type OpsDashboardResyncRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItems: string | null;
  creatives: string | null;
  lineItemSearchText: string | null;
};

type OpsDashboardDeleteRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItems: string | null;
  creatives: string | null;
  lineItemSearchText: string | null;
};

type OpsDashboardUserNotesRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItemName: string | null;
  creatives: string | null;
  lineItemSearchText: string | null;
  userNotes: string | null;
};

type OpsDashboardXandrLifeBudgetRow = {
  id: number;
  impersonateUserProfile: string | null;
  lineItems: string | null;
  creatives: string | null;
  lineItemSearchText: string | null;
  xandrLifeBuffer: string | null;
  xandrLifeBudget: string | null;
  xandrLifeBufferNew: string | null;
  xandrLifeBudgetNew: string | null;
};

type OrderEntryCreativeRow = {
  id: number;
  creative_category: string | null;
  type: string | null;
  name: string | null;
  size: string | null;
  file_upload_path: string | null;
  icon_file_upload: string | null;
  protocol: string | null;
  URL: string | null;
  ThirdPartyURL: string | null;
  'HTML (With/Without iFrame)': string | null;
  title: string | null;
  sponsered_by: string | null;
  body: string | null;
  call_to_action: string | null;
  creative_tag_ids: string | null;
};

export type OpsDashboardCaseSummary = {
  id: string;
  table: OpsDashboardTable;
  impersonateUserProfile?: string;
  lineItemPreview?: string;
};

export type OpsDashboardCreative = {
  id: string;
  creativeCategory?: string;
  type?: string;
  name?: string;
  size?: string;
  filePath?: string;
  iconFilePath?: string;
  protocol?: string;
  url?: string;
  thirdPartyUrl?: string;
  htmlWithOrWithoutIframe?: string;
  title?: string;
  sponsoredBy?: string;
  body?: string;
  callToAction?: string;
  creativeTagIds?: string;
};

export type OpsDashboardSeedOrder = {
  impersonateUserProfile: string;
  lineItemNames: string[];
  searchText?: string;
  creatives: OpsDashboardCreative[];
  singleObjectDealId: string;
  dailyBudget?: string;
  lifeBudget?: string;
  pacingPercentage?: string;
};

export type OpsDashboardDailyBudgetCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
  apDailyBudget: string;
  apDailyBudgetNew: string;
};

export type OpsDashboardLifeBudgetCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
  apLifeBudget: string;
  apLifeBudgetNew: string;
};

export type OpsDashboardPacingPercentageCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
  pacingPercentage: string;
  pacingPercentageNew: string;
};

export type OpsDashboardResyncCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
};

export type OpsDashboardDeleteCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
};

export type OpsDashboardUserNotesCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
  userNotes: string;
};

export type OpsDashboardXandrLifeBudgetCase = {
  id: string;
  seed: OpsDashboardSeedOrder;
  xandrLifeBuffer: string;
  xandrLifeBudget?: string;
  xandrLifeBufferNew: string;
  xandrLifeBudgetNew?: string;
};

function sanitizeValue(value?: string | number | null): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const trimmed = String(value).trim();
  return trimmed || undefined;
}

function parseMultiLine(value?: string | null): string[] {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return [];
  }

  return sanitized
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseRange(value?: string): { start: number; end: number } | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.trim().match(/^(\d+)\s*-\s*(\d+)$/);
  if (!match) {
    return undefined;
  }

  const start = Number(match[1]);
  const end = Number(match[2]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
    return undefined;
  }

  return { start, end };
}

function parseCreativeIds(value?: string | null): string[] {
  return parseMultiLine(value)
    .flatMap((item) => item.split(','))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const match = item.match(/^[*!#]:\s*(\d+)/);
      return match?.[1] || item;
    });
}

function formatOpsTimestamp(date: Date): string {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  let hour = date.getHours() % 12;
  if (hour === 0) {
    hour = 12;
  }
  const hh = String(hour).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${yyyy}${mm}${dd}${hh}${mi}${ss}${ampm}`;
}

export function materializeOpsTemplate(value: string, now = new Date()): string {
  return value
    .replaceAll('(ReleaseName)', config.releaseName || 'test')
    .replaceAll('(TimeStamp)', formatOpsTimestamp(now));
}

function resolveOpsTableName(table: OpsDashboardTable): string {
  switch (table) {
    case 'daily-budget':
      return 'ops_dashboard_daily_budget';
    case 'life-budget':
      return 'ops_dashboard_life_budget';
    case 'pacing-percentage':
      return 'ops_dashboard_pacing_percentage';
    case 'resync':
      return 'ops_dashboard_resync';
    case 'delete':
      return 'ops_dashboard_delete';
    case 'user-notes':
      return 'ops_dashboard_user_notes';
    case 'xandr-life-budget':
      return 'ops_dashboard_xandr_life_budget';
  }
}

export function resolveSelectedOpsDashboardTable(): OpsDashboardTable {
  const selected = (config.opsDashboardTable || '').trim().toLowerCase();
  if (!selected) {
    throw new Error(
      `Missing required batch filter: ADDAPTIVE_OPS_DASHBOARD_TABLE. Allowed values: ${allowedOpsDashboardTables.join(', ')}.`
    );
  }

  if (!allowedOpsDashboardTables.includes(selected as OpsDashboardTable)) {
    throw new Error(
      `Invalid ADDAPTIVE_OPS_DASHBOARD_TABLE "${selected}". Allowed values: ${allowedOpsDashboardTables.join(', ')}.`
    );
  }

  return selected as OpsDashboardTable;
}

function getSelectedIds(): string[] {
  const ids = config.opsDashboardDbIds;
  if (ids.length > 0) {
    return ids;
  }

  return config.opsDashboardDbId ? [config.opsDashboardDbId] : [];
}

export function loadOpsDashboardCaseSummaries(table = resolveSelectedOpsDashboardTable()): OpsDashboardCaseSummary[] {
  const ids = [...new Set(getSelectedIds().map((item) => item.trim()).filter(Boolean))];
  const range = parseRange(config.opsDashboardDbRange);
  const tableName = resolveOpsTableName(table);
  const where = ids.length > 0 ? `where t.id in (${ids.map((id) => sqlLiteral(id)).join(', ')})` : '';
  const rangeWhere = range ? `where selected."rowNumber" between ${range.start} and ${range.end}` : '';

  return queryJson<OpsDashboardCaseSummary[]>(`
    select
      selected.id,
      ${sqlLiteral(table)} as table,
      selected."impersonateUserProfile",
      selected."lineItemPreview"
    from (
      select
        t.id::text as id,
        t."impersonateUserProfile" as "impersonateUserProfile",
        coalesce(t."lineItemName", t."lineItems") as "lineItemPreview",
        row_number() over (order by t.id) as "rowNumber"
      from ${tableName} t
      ${where}
    ) selected
    ${rangeWhere}
    order by selected."rowNumber"
  `);
}

function requireSelectedCaseId(): string {
  const selected = config.opsDashboardDbId;
  if (!selected) {
    throw new Error('Set ADDAPTIVE_OPS_DASHBOARD_DB_ID to load a single Ops Dashboard case.');
  }

  return selected;
}

function loadCreativeRows(creativeRefs?: string | null): OpsDashboardCreative[] {
  const creativeIds = parseCreativeIds(creativeRefs);
  if (creativeIds.length === 0) {
    return [];
  }

  const idFilter = creativeIds.map((id) => `${sqlLiteral(id)}::numeric`).join(', ');
  const rows = queryJson<OrderEntryCreativeRow[]>(`
    select *
    from order_entry_creatives
    where id in (${idFilter})
    order by array_position(array[${idFilter}]::numeric[], id)
  `);

  return rows.map((row) => ({
    id: String(row.id),
    creativeCategory: sanitizeValue(row.creative_category),
    type: sanitizeValue(row.type),
    name: sanitizeValue(row.name),
    size: sanitizeValue(row.size),
    filePath: sanitizeValue(row.file_upload_path)
      ? path.resolve(process.cwd(), '..', 'katalon-test-cases', sanitizeValue(row.file_upload_path)!)
      : undefined,
    iconFilePath: sanitizeValue(row.icon_file_upload)
      ? path.resolve(process.cwd(), '..', 'katalon-test-cases', sanitizeValue(row.icon_file_upload)!)
      : undefined,
    protocol: sanitizeValue(row.protocol),
    url: sanitizeValue(row.URL),
    thirdPartyUrl: sanitizeValue(row.ThirdPartyURL),
    htmlWithOrWithoutIframe: sanitizeValue(row['HTML (With/Without iFrame)']),
    title: sanitizeValue(row.title),
    sponsoredBy: sanitizeValue(row.sponsered_by),
    body: sanitizeValue(row.body),
    callToAction: sanitizeValue(row.call_to_action),
    creativeTagIds: sanitizeValue(row.creative_tag_ids)
  }));
}

function buildSeedOrder(
  impersonateUserProfile: string | undefined,
  lineItemsValue: string | undefined,
  creativesValue: string | null | undefined,
  options: {
    singleObjectDealId: string;
    searchText?: string;
    dailyBudget?: string;
    lifeBudget?: string;
    pacingPercentage?: string;
  }
): OpsDashboardSeedOrder {
  const lineItemTemplates = parseMultiLine(lineItemsValue);
  if (!impersonateUserProfile) {
    throw new Error('Ops Dashboard row requires impersonateUserProfile.');
  }
  if (lineItemTemplates.length === 0) {
    throw new Error('Ops Dashboard row requires at least one line item template.');
  }

  const now = new Date();
  const lineItemNames = lineItemTemplates.map((item) => materializeOpsTemplate(item, now));
  const searchText = options.searchText ? materializeOpsTemplate(options.searchText, now) : undefined;

  return {
    impersonateUserProfile,
    lineItemNames,
    searchText,
    creatives: loadCreativeRows(creativesValue),
    singleObjectDealId: options.singleObjectDealId,
    dailyBudget: options.dailyBudget,
    lifeBudget: options.lifeBudget,
    pacingPercentage: options.pacingPercentage
  };
}

export function requireOpsDashboardDailyBudgetCase(): OpsDashboardDailyBudgetCase {
  const row = querySingleJson<OpsDashboardDailyBudgetRow>(`
    select *
    from ops_dashboard_daily_budget
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_daily_budget row matched id=${requireSelectedCaseId()}.`);
  }

  const apDailyBudget = sanitizeValue(row.apDailyBudget);
  const apDailyBudgetNew = sanitizeValue(row.apDailyBudgetNew);
  if (!apDailyBudget || !apDailyBudgetNew) {
    throw new Error(`Ops daily-budget case ${row.id} requires apDailyBudget and apDailyBudgetNew.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItemName), row.creatives, {
      singleObjectDealId: '19180',
      dailyBudget: apDailyBudget
    }),
    apDailyBudget,
    apDailyBudgetNew
  };
}

export function requireOpsDashboardLifeBudgetCase(): OpsDashboardLifeBudgetCase {
  const row = querySingleJson<OpsDashboardLifeBudgetRow>(`
    select *
    from ops_dashboard_life_budget
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_life_budget row matched id=${requireSelectedCaseId()}.`);
  }

  const apLifeBudget = sanitizeValue(row.apLifeBudget);
  const apLifeBudgetNew = sanitizeValue(row.apLifeBudgetNew);
  if (!apLifeBudget || !apLifeBudgetNew) {
    throw new Error(`Ops life-budget case ${row.id} requires apLifeBudget and apLifeBudgetNew.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItemName), row.creatives, {
      singleObjectDealId: '19180',
      lifeBudget: apLifeBudget
    }),
    apLifeBudget,
    apLifeBudgetNew
  };
}

export function requireOpsDashboardPacingPercentageCase(): OpsDashboardPacingPercentageCase {
  const row = querySingleJson<OpsDashboardPacingPercentageRow>(`
    select *
    from ops_dashboard_pacing_percentage
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_pacing_percentage row matched id=${requireSelectedCaseId()}.`);
  }

  const pacingPercentage = sanitizeValue(row.pacingPercentage);
  const pacingPercentageNew = sanitizeValue(row.pacingPercentageNew);
  if (!pacingPercentage || !pacingPercentageNew) {
    throw new Error(`Ops pacing-percentage case ${row.id} requires pacingPercentage and pacingPercentageNew.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItems), row.creatives, {
      singleObjectDealId: '19180',
      searchText: sanitizeValue(row.lineItemSearchText),
      pacingPercentage
    }),
    pacingPercentage,
    pacingPercentageNew
  };
}

export function requireOpsDashboardResyncCase(): OpsDashboardResyncCase {
  const row = querySingleJson<OpsDashboardResyncRow>(`
    select *
    from ops_dashboard_resync
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_resync row matched id=${requireSelectedCaseId()}.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItems), row.creatives, {
      singleObjectDealId: '19165',
      searchText: sanitizeValue(row.lineItemSearchText)
    })
  };
}

export function requireOpsDashboardDeleteCase(): OpsDashboardDeleteCase {
  const row = querySingleJson<OpsDashboardDeleteRow>(`
    select *
    from ops_dashboard_delete
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_delete row matched id=${requireSelectedCaseId()}.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItems), row.creatives, {
      singleObjectDealId: '19180',
      searchText: sanitizeValue(row.lineItemSearchText)
    })
  };
}

export function requireOpsDashboardUserNotesCase(): OpsDashboardUserNotesCase {
  const row = querySingleJson<OpsDashboardUserNotesRow>(`
    select *
    from ops_dashboard_user_notes
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_user_notes row matched id=${requireSelectedCaseId()}.`);
  }

  const userNotes = sanitizeValue(row.userNotes);
  if (!userNotes) {
    throw new Error(`Ops user-notes case ${row.id} requires userNotes.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItemName), row.creatives, {
      singleObjectDealId: '19180',
      searchText: sanitizeValue(row.lineItemSearchText)
    }),
    userNotes
  };
}

export function requireOpsDashboardXandrLifeBudgetCase(): OpsDashboardXandrLifeBudgetCase {
  const row = querySingleJson<OpsDashboardXandrLifeBudgetRow>(`
    select *
    from ops_dashboard_xandr_life_budget
    where id = ${sqlLiteral(requireSelectedCaseId())}
  `);
  if (!row) {
    throw new Error(`No ops_dashboard_xandr_life_budget row matched id=${requireSelectedCaseId()}.`);
  }

  const xandrLifeBuffer = sanitizeValue(row.xandrLifeBuffer);
  const xandrLifeBufferNew = sanitizeValue(row.xandrLifeBufferNew);
  if (!xandrLifeBuffer || !xandrLifeBufferNew) {
    throw new Error(`Ops xandr-life-budget case ${row.id} requires xandrLifeBuffer and xandrLifeBufferNew.`);
  }

  return {
    id: String(row.id),
    seed: buildSeedOrder(sanitizeValue(row.impersonateUserProfile), sanitizeValue(row.lineItems), row.creatives, {
      singleObjectDealId: '19180',
      searchText: sanitizeValue(row.lineItemSearchText)
    }),
    xandrLifeBuffer,
    xandrLifeBudget: sanitizeValue(row.xandrLifeBudget),
    xandrLifeBufferNew,
    xandrLifeBudgetNew: sanitizeValue(row.xandrLifeBudgetNew)
  };
}
