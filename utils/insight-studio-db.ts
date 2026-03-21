import { queryJson, querySingleJson, sqlLiteral } from './db-config';
import { config } from './config';

type InsightStudioDbRow = {
  id: string;
  object_id: string | number | null;
  test_case_name: string | null;
  template_type: string | null;
  report_name: string | null;
  status: string | null;
  file_types: string | null;
  recipients: string | null;
  cadence: string | null;
  data_sources: string | null;
  export_targets: string | null;
  widget_ids: string | null;
  enable_itemized_reporting: string | null;
  tags_to_use: string | null;
  impersonate_use_profile: string | null;
  advertiser: string | null;
  configure_filters: string | null;
  existing_report_name: string | null;
  report_action: string | null;
};

type InsightStudioDataSourceRow = {
  id: string;
  dateRange: string | null;
  dataSelectionType: string | null;
  lineItems: string | null;
  dataSourceType: string | null;
};

type InsightStudioWidgetRow = {
  id: string;
  dataSource: string | null;
  widgetType: string | null;
  dimensionList: string | null;
  metrics: string | null;
  widgetCustomContent: string | null;
};

type InsightStudioExportTargetRow = {
  id: string;
  targetType: string | null;
};

let cachedKey: string | null = null;
let cachedRow: InsightStudioDbRow | null = null;

function currentCacheKey(): string {
  return [config.insightDbId || '', config.insightDbTestCaseName || '', config.releaseName || ''].join('|');
}

function sanitizeValue(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === '<NO-CHANGE>') {
    return undefined;
  }

  return trimmed;
}

function parseLineSeparatedValues(value?: string | null): string[] {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return [];
  }

  return sanitized
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseActionList(value?: string | null): Array<{ action: string; index: number; sourceId?: number }> {
  return parseLineSeparatedValues(value).map((entry) => {
    const [action = '', index = '', sourceId = ''] = entry.split(':').map((item) => item.trim());
    return {
      action,
      index: Number(index),
      sourceId: sourceId ? Number(sourceId) : undefined
    };
  });
}

function convertCurrentDateToken(value: string): string {
  const match = value.match(/^current([+-]\d+)$/i);
  if (!match) {
    return value;
  }

  const date = new Date();
  date.setDate(date.getDate() + Number(match[1]));
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}/${day}/${year}`;
}

function convertInsightStudioMacros(template?: string | null, testCaseName?: string | null): string | undefined {
  const sanitized = sanitizeValue(template);
  if (!sanitized) {
    return undefined;
  }

  return sanitized
    .replace(/\(ReleaseName\)/g, config.releaseName || '')
    .replace(/\((TestCaseName)\)/g, sanitizeValue(testCaseName) || '');
}

function normalizeInsightStudioDataSourceType(value?: string | null): string | undefined {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return undefined;
  }

  const normalized = sanitized.trim().toLowerCase();
  if (normalized === 'site analytics' || normalized === 'site analytics v2') {
    return 'Site Analytics V2';
  }

  return sanitized;
}

export function loadInsightStudioCaseData(): InsightStudioDbRow | null {
  const cacheKey = currentCacheKey();
  if (cachedKey === cacheKey) {
    return cachedRow;
  }

  const id = config.insightDbId;
  const testCaseName = config.insightDbTestCaseName;
  const filters: string[] = [];

  if (testCaseName) {
    filters.push(`s.test_case_name = ${sqlLiteral(testCaseName)}`);
  } else if (id) {
    filters.push(`s.id = ${sqlLiteral(id)}`);
  } else {
    return null;
  }

  const query = `
    select
      s.id,
      s.object_id,
      s.test_case_name,
      s.template_type,
      s.report_name,
      s.status,
      s.file_types,
      s.recipients,
      s.cadence,
      s.data_sources,
      s.export_targets,
      s.widget_ids,
      s.enable_itemized_reporting,
      s.tags_to_use,
      s.impersonate_use_profile,
      s.advertiser,
      s.configure_filters,
      s.existing_report_name,
      s.report_action
    from insight_studio_suite s
    where ${filters.join(' and ')}
    order by s.id
    limit 1
  `;

  cachedRow = querySingleJson<InsightStudioDbRow>(query);
  cachedKey = cacheKey;
  return cachedRow;
}

export function requireInsightStudioFlowValues(): {
  reportAction: 'create' | 'edit';
  templateType?: string;
  reportName?: string;
  existingReportName?: string;
  impersonateUserProfile?: string;
  status?: string;
  fileTypes: string[];
  cadence?: string;
  enableItemizedReporting: boolean;
  tagsToUse: string[];
  recipients: string[];
  dataSources: string[];
  exportTargets: string[];
  widgetIds: string[];
} {
  const row = loadInsightStudioCaseData();
  if (!row) {
    throw new Error(
      'No insight_studio_suite row matched the current selection. Set ADDAPTIVE_INSIGHT_DB_ID or ADDAPTIVE_INSIGHT_DB_TEST_CASE_NAME.'
    );
  }

  return {
    reportAction: sanitizeValue(row.report_action)?.toLowerCase() === 'edit' ? 'edit' : 'create',
    templateType: sanitizeValue(row.template_type),
    reportName: convertInsightStudioMacros(row.report_name, row.test_case_name),
    existingReportName: sanitizeValue(row.existing_report_name),
    impersonateUserProfile: sanitizeValue(row.impersonate_use_profile),
    status: sanitizeValue(row.status)?.toLowerCase(),
    fileTypes: sanitizeValue(row.file_types)?.toLowerCase() === 'all'
      ? ['all']
      : (sanitizeValue(row.file_types)?.split(',').map((item) => item.trim()).filter(Boolean) || []),
    cadence: sanitizeValue(row.cadence)
      ?.split('|')
      .map((item) => convertCurrentDateToken(item.trim()))
      .join('|'),
    enableItemizedReporting: sanitizeValue(row.enable_itemized_reporting)?.toLowerCase() === 'yes',
    tagsToUse: parseLineSeparatedValues(row.tags_to_use),
    recipients: parseLineSeparatedValues(row.recipients),
    dataSources: parseLineSeparatedValues(row.data_sources),
    exportTargets: parseLineSeparatedValues(row.export_targets),
    widgetIds: parseLineSeparatedValues(row.widget_ids)
  };
}

export function requireInsightStudioDataSourceValues(): Array<{
  action: 'add' | 'edit' | 'delete';
  index: number;
  dataSourceType?: string;
  dateRange?: string;
  dataSelectionType?: string;
  lineItems: string[];
}> {
  const row = loadInsightStudioCaseData();
  if (!row) {
    return [];
  }

  const actions = parseActionList(row.data_sources);
  const sourceIds = [...new Set(actions.map((item) => item.sourceId).filter((item): item is number => Number.isFinite(item)))];
  const sourceRows =
    sourceIds.length > 0
      ? queryJson<InsightStudioDataSourceRow[]>(`
          select
            d.id::text as id,
            d."dateRange" as "dateRange",
            d."dataSelectionType" as "dataSelectionType",
            d."lineItems" as "lineItems",
            d."dataSourceType" as "dataSourceType"
          from insight_studio_datasource d
          where d.id in (${sourceIds.map((id) => sqlLiteral(String(id))).join(', ')})
          order by d.id::int
        `)
      : [];

  const sourceById = new Map((sourceRows || []).map((item) => [Number(item.id), item]));

  return actions.map((item) => {
    const source = item.sourceId ? sourceById.get(item.sourceId) : undefined;
    return {
      action: item.action === '!' ? 'edit' : item.action === 'x' ? 'delete' : 'add',
      index: Number.isFinite(item.index) && item.index > 0 ? item.index - 1 : 0,
      dataSourceType: normalizeInsightStudioDataSourceType(source?.dataSourceType),
      dateRange: sanitizeValue(source?.dateRange),
      dataSelectionType: sanitizeValue(source?.dataSelectionType),
      lineItems: parseLineSeparatedValues(source?.lineItems)
    };
  });
}

export function requireInsightStudioWidgetValues(): Array<{
  action: 'add' | 'edit' | 'delete';
  index: number;
  dataSource?: string;
  widgetType?: string;
  dimension?: string;
  metric?: string;
  content?: string;
}> {
  const row = loadInsightStudioCaseData();
  if (!row) {
    return [];
  }

  const actions = parseActionList(row.widget_ids);
  const widgetIds = [...new Set(actions.map((item) => item.sourceId ?? item.index).filter((item) => Number.isFinite(item)))];
  const widgetRows =
    widgetIds.length > 0
      ? queryJson<InsightStudioWidgetRow[]>(`
          select
            w.id::text as id,
            w."dataSource" as "dataSource",
            w."widgetType" as "widgetType",
            w."dimensionList" as "dimensionList",
            w."metrics" as "metrics",
            w."widgetCustomContent" as "widgetCustomContent"
          from insight_studio_widgets w
          where w.id in (${widgetIds.map((id) => sqlLiteral(String(id))).join(', ')})
          order by w.id::int
        `)
      : [];

  const widgetById = new Map((widgetRows || []).map((item) => [Number(item.id), item]));

  return actions.map((item) => {
    const widget = widgetById.get(item.sourceId ?? item.index);
    return {
      action: item.action === '!' ? 'edit' : item.action === 'x' ? 'delete' : 'add',
      index: Number.isFinite(item.index) && item.index > 0 ? item.index : 1,
      dataSource: sanitizeValue(widget?.dataSource),
      widgetType: sanitizeValue(widget?.widgetType),
      dimension: parseLineSeparatedValues(widget?.dimensionList)[0],
      metric: parseLineSeparatedValues(widget?.metrics)[0],
      content: sanitizeValue(widget?.widgetCustomContent)
    };
  });
}

export function requireInsightStudioExportTargetValues(): Array<{
  action: 'add' | 'edit' | 'delete';
  index: number;
  targetType?: string;
}> {
  const row = loadInsightStudioCaseData();
  if (!row) {
    return [];
  }

  const actions = parseActionList(row.export_targets);
  const exportIds = [...new Set(actions.map((item) => item.sourceId).filter((item): item is number => Number.isFinite(item)))];
  const exportRows =
    exportIds.length > 0
      ? queryJson<InsightStudioExportTargetRow[]>(`
          select
            e.id::text as id,
            e."targetType" as "targetType"
          from insight_studio_export_target e
          where e.id in (${exportIds.map((id) => sqlLiteral(String(id))).join(', ')})
          order by e.id::int
        `)
      : [];

  const exportById = new Map((exportRows || []).map((item) => [Number(item.id), item]));

  return actions.map((item) => {
    const exportTarget = item.sourceId ? exportById.get(item.sourceId) : undefined;
    return {
      action: item.action === '!' ? 'edit' : item.action === 'x' ? 'delete' : 'add',
      index: Number.isFinite(item.index) && item.index > 0 ? item.index - 1 : 0,
      targetType: sanitizeValue(exportTarget?.targetType)
    };
  });
}
