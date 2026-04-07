import { getAddaptiveDbConfig, queryJson, querySingleJson, sqlLiteral } from './db-config';
import { config } from './config';

type OrderEntryDbRow = {
  object_id: string;
  test_case_name: string;
  ad_server: string;
  order_action: string;
  username: string | null;
  password: string | null;
  impersonate_user_profile: string | null;
  display_tabs: string | null;
  objectives_type: string | null;
  objectives_goal: string | null;
  units_value: string | null;
  objectives_conversion_pixels_type: string | null;
  objectives_conversion_pixels: string | null;
  objectives_goal_priority: string | null;
  objectives_optimization_method: string | null;
  objectives_optimization_type: string | null;
  objectives_optimization_amount: string | null;
  objectives_minimum_margin: string | null;
  target_type: string | null;
  order_name: string | null;
  io_name: string | null;
  campaign_name: string | null;
  campaign_type: string | null;
  line_item_name: string | null;
  line_items: string | null;
  curate_deal_name: string | null;
  dsp: string | null;
  advertiser: string | null;
  single_object_id: string | null;
  creative_type: string | null;
  revenue_type: string | null;
  insertion_order: string | null;
  order_notes: string | null;
  cpm_value: string | null;
  optimization_cpm_value: string | null;
  impression_goal: string | null;
  flight_start_date: string | null;
  flight_end_date: string | null;
  subdeal_id: string | null;
  geotargeting_type: string | null;
  geotargeting_search_text: string | null;
  geotargeting_profile_name: string | null;
  inventory_devices: string | null;
  inventory_type: string | null;
  supply_strategy: string | null;
  deal_selection_type: string | null;
  cross_device: string | null;
  targeting_type_browsers: string | null;
  targeting_browsers: string | null;
  targeting_inclusion_list: string | null;
  targeting_exclusion_list: string | null;
  viewability_threshold: string | null;
  completion_rate_threshold: string | null;
  listen_through_threshold: string | null;
  post_bid_measurement: string | null;
  frequency_cap: string | null;
  recency_cap: string | null;
  day_parting_time_slots: string | null;
  pacing_percentage: string | null;
  pacing_impression: string | null;
  pacing_impression_type: string | null;
  daily_budget: string | null;
  xandr_life_buffer: string | null;
  xandr_life_budget: string | null;
  audience_list: string | null;
  creatives_list: string | null;
  bulk_import_use_1st_url_for_all: string | null;
  bulk_import_use_1st_image_for_all: string | null;
  bulk_import_use_1st_icon_for_all: string | null;
  bulk_import_creatives_type: string | null;
  splits_list: string | null;
  splits_allocation_list: string | null;
  splits_divide_equally: string | null;
  order_submit_type: string | null;
  confirmation_messages: string | null;
};

type OrderEntryCreativeDbRow = {
  id: string;
  object_id: string;
  creative_category: string | null;
  type: string | null;
  name: string | null;
  size: string | null;
  file_upload_path: string | null;
  icon_file_upload: string | null;
  protocol: string | null;
  url: string | null;
  third_party_url: string | null;
  html_iframe_mode: string | null;
  title: string | null;
  sponsored_by: string | null;
  body: string | null;
  call_to_action: string | null;
  creative_tag_ids: string | null;
  pixels: string | null;
};

type OrderEntryAudienceDbRow = {
  id: string;
  object_id: string | null;
  include_exclude: string | null;
  audience_type: string | null;
  audience: string | null;
};

type OrderEntrySplitDbRow = {
  id: string;
  group_name: string | null;
  bid_modifiers: string | null;
  status: string | null;
  iab_viewability_rate_checkbox: string | null;
  iab_viewability_rate_operator: string | null;
  iab_viewability_rate_value: string | null;
};

export type OrderEntryCaseSummary = {
  objectId: string;
  testCaseName: string;
  adServer: string;
  orderAction: string;
};

const orderEntryTabsByAdServer: Record<string, string[]> = {
  DFP: ['Objectives', 'Basic Setup', 'Inventory', 'Audience'],
  DPM: ['Objectives', 'Basic Setup', 'Budget & Flight', 'Inventory', 'Audience', 'Creatives', 'Splits'],
  PMP: ['Objectives', 'Basic Setup', 'Budget & Flight', 'Inventory', 'Audience'],
  MEDIAMATH: ['Objectives', 'Basic Setup', 'Budget & Flight', 'Inventory', 'Audience', 'Creatives', 'Splits'],
  MEDIAMATH_GAM: ['Objectives', 'Basic Setup', 'Budget & Flight', 'Inventory', 'Audience', 'Creatives', 'Splits']
};

export function resolveOrderEntryTabs(adServer?: string): string[] {
  const normalized = (sanitizeValue(adServer) || '').toUpperCase();
  return orderEntryTabsByAdServer[normalized] || orderEntryTabsByAdServer.DPM;
}

export type OrderEntryAudienceAction = {
  action: string;
  groupIndex?: number;
  subgroupIndex?: number;
  audienceId?: string;
  includeExclude?: string;
  audienceType?: string;
  audienceName?: string;
};

export type OrderEntrySplitAction = {
  action: '*' | '!' | 'x';
  groupNumber?: number;
  splitId?: string;
  name?: string;
  bidModifiers?: string;
  status?: string;
  iabViewabilityRate?: {
    enabled: boolean;
    operator?: string;
    value?: string;
  };
};

let cachedKey: string | null = null;
let cachedRow: OrderEntryDbRow | null = null;
let cachedCreativeKey: string | null = null;
let cachedCreativeRow: OrderEntryCreativeDbRow | null = null;
const macroTimestamp = new Date();

function sanitizeValue(value?: string | number | null): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const trimmed = String(value).trim();
  if (!trimmed || trimmed === '<NO-CHANGE>') {
    return undefined;
  }

  return trimmed;
}

function sanitizeToggleValue(value?: string | number | null): string | undefined {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return undefined;
  }

  if (sanitized.toLowerCase() === 'off') {
    return undefined;
  }

  return sanitized;
}

function normalizeFilterValue(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const allowedOrderEntryAdServers = ['MEDIAMATH', 'DFP', 'PMP', 'DPM', 'MEDIAMATH_GAM', 'TRADEDESK'] as const;
const allowedOrderEntryAdServersByNormalized = new Map(
  allowedOrderEntryAdServers.map((value) => [normalizeFilterValue(value), value] as const)
);
const allowedOrderEntryActions = ['create', 'edit'] as const;
const allowedOrderEntryActionsSet = new Set(allowedOrderEntryActions);

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

function resolveRelativeDate(value?: string | null): string | undefined {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return undefined;
  }

  const match = sanitized.match(/^current([+-]\d+)?(?:\s+(.+))?$/i);
  if (!match) {
    return sanitized;
  }

  const offset = Number(match[1] || 0);
  const suffix = (match[2] || '').trim();
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();

  return suffix ? `${mm}/${dd}/${yyyy} ${suffix}` : `${mm}/${dd}/${yyyy}`;
}

function toTitleWords(key: string): string {
  return key
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function expandRowMacros(value: string | undefined, row: OrderEntryDbRow): string | undefined {
  if (!value) {
    return value;
  }

  let expanded = value;
  const replacements = new Map<string, string>();
  const releaseName = config.releaseName;

  replacements.set('Release Name', releaseName);
  replacements.set('Time Stamp', macroTimestamp.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14));

  for (const [key, rawValue] of Object.entries(row)) {
    const sanitized = sanitizeValue(rawValue as string | number | null);
    if (!sanitized) {
      continue;
    }
    replacements.set(toTitleWords(key), sanitized);
  }

  for (const [macro, replacement] of replacements.entries()) {
    expanded = expanded.replaceAll(`(${macro})`, replacement);
  }

  return expanded;
}

function currentCacheKey(): string {
  const dbConfig = getAddaptiveDbConfig();

  return [
    dbConfig.host,
    dbConfig.port,
    dbConfig.database,
    dbConfig.user,
    config.orderEntryDbObjectId || '',
    config.orderEntryDbTestCaseName || '',
    config.orderEntryAdServer || '',
    config.orderEntryAction || ''
  ].join('|');
}

function parseFirstCreativeId(value?: string | null): string | undefined {
  return parseCreativeIds(value)[0];
}

function parseCreativeIds(value?: string | null): string[] {
  const entries = parseMultiLine(value);
  const ids: string[] = [];

  for (const entry of entries) {
    const parts = entry.split(':').map((item) => item.trim());
    if (parts.length < 2) {
      continue;
    }

    const action = parts[0];
    if (action === '*' || action === '!') {
      const creativeId = action === '!' ? parts[2] : parts[1];
      const parsed = sanitizeValue(creativeId);
      if (parsed) {
        ids.push(parsed);
      }
    }
  }

  return ids;
}

function parseOrderEntryIdList(rawValue?: string): string[] {
  if (!rawValue) {
    return [];
  }

  return rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseOrderEntryRange(rawValue?: string): { start: number; end: number } | undefined {
  if (!rawValue) {
    return undefined;
  }

  const trimmed = rawValue.trim();
  const singleMatch = trimmed.match(/^(\d+)$/);
  if (singleMatch) {
    const value = Number(singleMatch[1]);
    if (!Number.isFinite(value) || value < 1) {
      return undefined;
    }

    return { start: value, end: value };
  }

  const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
  if (!rangeMatch) {
    return undefined;
  }

  const start = Number(rangeMatch[1]);
  const end = Number(rangeMatch[2]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
    return undefined;
  }

  return { start, end };
}

export function getSelectedOrderEntryObjectIdsFromEnv(): string[] {
  const explicitIds = config.orderEntryDbIds;
  if (explicitIds.length > 0) {
    return explicitIds;
  }

  const singleId = config.orderEntryDbObjectId;
  return singleId ? [singleId] : [];
}

export function loadOrderEntryCaseSummaries(objectIds = getSelectedOrderEntryObjectIdsFromEnv()): OrderEntryCaseSummary[] {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const filters: string[] = [];
  const selectedRange = parseOrderEntryRange(config.orderEntryDbRange);
  const selectedAdServer = sanitizeValue(config.orderEntryAdServer);
  const selectedOrderAction = sanitizeValue(config.orderEntryAction);
  const normalizedAdServer = selectedAdServer ? normalizeFilterValue(selectedAdServer) : undefined;
  const canonicalAdServer = normalizedAdServer ? allowedOrderEntryAdServersByNormalized.get(normalizedAdServer) : undefined;
  const canonicalOrderAction = selectedOrderAction ? normalizeFilterValue(selectedOrderAction) : undefined;
  const hasDirectSelector = ids.length > 0 || Boolean(selectedRange);

  if (selectedAdServer && !canonicalAdServer) {
    throw new Error(
      `Invalid ADDAPTIVE_ORDER_ENTRY_AD_SERVER "${selectedAdServer}". Allowed values: ${allowedOrderEntryAdServers.join(', ')}.`
    );
  }

  if (
    selectedOrderAction &&
    (!canonicalOrderAction || !allowedOrderEntryActionsSet.has(canonicalOrderAction as (typeof allowedOrderEntryActions)[number]))
  ) {
    throw new Error(
      `Invalid ADDAPTIVE_ORDER_ENTRY_ACTION "${selectedOrderAction}". Allowed values: ${allowedOrderEntryActions.join(', ')}.`
    );
  }

  if (!hasDirectSelector && !canonicalAdServer && !canonicalOrderAction) {
    throw new Error(
      'Missing order-entry selection. Set one of ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID, ADDAPTIVE_ORDER_ENTRY_DB_IDS, ADDAPTIVE_ORDER_ENTRY_DB_RANGE, or use ADDAPTIVE_ORDER_ENTRY_AD_SERVER/ADDAPTIVE_ORDER_ENTRY_ACTION filters.'
    );
  }

  if (ids.length > 0) {
    filters.push(`oe.object_id in (${ids.map((id) => sqlLiteral(id)).join(', ')})`);
  }

  if (canonicalAdServer) {
    filters.push(
      `regexp_replace(lower(oe.ad_server), '[^a-z0-9]+', '', 'g') = ${sqlLiteral(normalizeFilterValue(canonicalAdServer))}`
    );
  }
  if (canonicalOrderAction) {
    filters.push(`regexp_replace(lower(oe.order_action), '[^a-z0-9]+', '', 'g') = ${sqlLiteral(canonicalOrderAction)}`);
  }

  const whereClause = filters.length > 0 ? `where ${filters.join(' and ')}` : '';
  const rangeClause = selectedRange ? `where selected."rowNumber" between ${selectedRange.start} and ${selectedRange.end}` : '';

  const query = `
    select
      selected."objectId",
      selected."testCaseName",
      selected."adServer",
      selected."orderAction"
    from (
      select
        oe.object_id as "objectId",
        oe.test_case_name as "testCaseName",
        oe.ad_server as "adServer",
        oe.order_action as "orderAction",
        row_number() over (order by oe.object_id::int) as "rowNumber"
      from order_entry_suite oe
      ${whereClause}
    ) selected
    ${rangeClause}
    order by selected."rowNumber"
  `;

  return queryJson<OrderEntryCaseSummary[]>(query);
}

export function buildOrderEntryCaseSelectionError(objectIds = getSelectedOrderEntryObjectIdsFromEnv()): string {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const selectedRange = parseOrderEntryRange(config.orderEntryDbRange);
  const selectedAdServer = sanitizeValue(config.orderEntryAdServer);
  const selectedOrderAction = sanitizeValue(config.orderEntryAction);
  const normalizedAdServer = selectedAdServer ? normalizeFilterValue(selectedAdServer) : undefined;
  const canonicalAdServer = normalizedAdServer ? allowedOrderEntryAdServersByNormalized.get(normalizedAdServer) : undefined;
  const canonicalOrderAction = selectedOrderAction ? normalizeFilterValue(selectedOrderAction) : undefined;
  const activeRange = config.orderEntryDbRange;
  const activeIds = config.orderEntryDbIds;
  const activeObjectId = config.orderEntryDbObjectId;
  const hasDirectSelector = ids.length > 0 || Boolean(selectedRange) || Boolean(activeObjectId);
  const filterSummary = [
    `adServer=${selectedAdServer || '<unset>'}`,
    `orderAction=${selectedOrderAction || '<unset>'}`,
    `objectId=${activeObjectId || '<unset>'}`,
    `ids=${activeIds.length > 0 ? activeIds.join(',') : '<unset>'}`,
    `range=${activeRange || '<unset>'}`
  ].join(', ');

  if (!hasDirectSelector && !canonicalAdServer && !canonicalOrderAction) {
    return `No order-entry rows matched the current selectors/filters. Active filters: ${filterSummary}.`;
  }
  const sampleFilters: string[] = [];
  if (canonicalAdServer) {
    sampleFilters.push(
      `regexp_replace(lower(oe.ad_server), '[^a-z0-9]+', '', 'g') = ${sqlLiteral(normalizeFilterValue(canonicalAdServer))}`
    );
  }
  if (canonicalOrderAction) {
    sampleFilters.push(`regexp_replace(lower(oe.order_action), '[^a-z0-9]+', '', 'g') = ${sqlLiteral(canonicalOrderAction)}`);
  }
  const sampleWhereClause = sampleFilters.length > 0 ? `where ${sampleFilters.join(' and ')}` : '';
  const sampleMatches = queryJson<OrderEntryCaseSummary[]>(`
    select
      oe.object_id as "objectId",
      oe.test_case_name as "testCaseName",
      oe.ad_server as "adServer",
      oe.order_action as "orderAction"
    from order_entry_suite oe
    ${sampleWhereClause}
    order by oe.object_id::int
    limit 10
  `);

  let idDetails = '';
  if (ids.length > 0) {
    const requestedRows = queryJson<OrderEntryCaseSummary[]>(`
      select
        oe.object_id as "objectId",
        oe.test_case_name as "testCaseName",
        oe.ad_server as "adServer",
        oe.order_action as "orderAction"
      from order_entry_suite oe
      where oe.object_id in (${ids.map((id) => sqlLiteral(id)).join(', ')})
      order by oe.object_id::int
    `);

    if (requestedRows.length === 0) {
      idDetails = ` Requested IDs were: ${ids.join(', ')}; none exist in order_entry_suite.`;
    } else {
      const requestedSummary = requestedRows
        .map((row) => `${row.objectId}:${row.adServer}/${row.orderAction}`)
        .join(', ');
      idDetails = ` Requested IDs resolved to: ${requestedSummary}.`;
    }
  }

  let rangeDetails = '';
  if (selectedRange) {
    const rangeFilters = [...sampleFilters];
    const rangeWhereClause = rangeFilters.length > 0 ? `where ${rangeFilters.join(' and ')}` : '';
    const rangedRows = queryJson<Array<OrderEntryCaseSummary & { rowNumber: number }>>(`
      select
        selected."objectId",
        selected."testCaseName",
        selected."adServer",
        selected."orderAction",
        selected."rowNumber"
      from (
        select
          oe.object_id as "objectId",
          oe.test_case_name as "testCaseName",
          oe.ad_server as "adServer",
          oe.order_action as "orderAction",
          row_number() over (order by oe.object_id::int) as "rowNumber"
        from order_entry_suite oe
        ${rangeWhereClause}
      ) selected
      where selected."rowNumber" between ${selectedRange.start} and ${selectedRange.end}
      order by selected."rowNumber"
    `);

    if (rangedRows.length === 0) {
      rangeDetails = ` Positional range ${selectedRange.start}-${selectedRange.end} returned no rows${sampleFilters.length > 0 ? ' after filtering' : ''}.`;
    } else {
      rangeDetails = ` Positional range ${selectedRange.start}-${selectedRange.end} resolved to object IDs: ${rangedRows
        .map((row) => row.objectId)
        .join(', ')}.`;
    }
  }

  const sampleSummary =
    sampleMatches.length > 0
      ? ` First matching IDs${canonicalAdServer || canonicalOrderAction ? ` for ${canonicalAdServer || '*'}\/${canonicalOrderAction || '*'}` : ''}: ${sampleMatches.map((row) => row.objectId).join(', ')}.`
      : ` No rows exist${canonicalAdServer || canonicalOrderAction ? ` for ${canonicalAdServer || '*'}\/${canonicalOrderAction || '*'}` : ''} in order_entry_suite.`;

  return `No order-entry rows matched the current selectors/filters. Active filters: ${filterSummary}.${idDetails}${rangeDetails}${sampleSummary}`;
}

export function loadOrderEntryCaseData(): OrderEntryDbRow | null {
  const cacheKey = currentCacheKey();
  if (cachedKey === cacheKey) {
    return cachedRow;
  }

  const objectId = config.orderEntryDbObjectId;
  const testCaseName = config.orderEntryDbTestCaseName;
  const explicitAdServer = config.orderEntryAdServer;
  const explicitOrderAction = config.orderEntryAction;
  let inferredAdServer = explicitAdServer;
  let inferredOrderAction = explicitOrderAction;

  if (objectId) {
    if (!inferredAdServer || !inferredOrderAction) {
      const summary = querySingleJson<OrderEntryCaseSummary>(`
        select
          oe.object_id as "objectId",
          oe.test_case_name as "testCaseName",
          oe.ad_server as "adServer",
          oe.order_action as "orderAction"
        from order_entry_suite oe
        where oe.object_id = ${sqlLiteral(objectId)}
        limit 1
      `);
      inferredAdServer = sanitizeValue(summary?.adServer);
      inferredOrderAction = sanitizeValue(summary?.orderAction);
    }
  } else if (testCaseName) {
    if (!inferredAdServer || !inferredOrderAction) {
      const summary = querySingleJson<OrderEntryCaseSummary>(`
        select
          oe.object_id as "objectId",
          oe.test_case_name as "testCaseName",
          oe.ad_server as "adServer",
          oe.order_action as "orderAction"
        from order_entry_suite oe
        where oe.test_case_name = ${sqlLiteral(testCaseName)}
        order by oe.object_id
        limit 1
      `);
      inferredAdServer = sanitizeValue(summary?.adServer);
      inferredOrderAction = sanitizeValue(summary?.orderAction);
    }
  } else {
    cachedRow = null;
    cachedKey = cacheKey;
    return cachedRow;
  }

  const filters: string[] = [];
  if (inferredOrderAction) {
    filters.push(`oe.order_action = ${sqlLiteral(inferredOrderAction)}`);
  }
  if (inferredAdServer) {
    filters.push(`oe.ad_server = ${sqlLiteral(inferredAdServer)}`);
  }

  if (objectId) {
    filters.push(`oe.object_id = ${sqlLiteral(objectId)}`);
  } else if (testCaseName) {
    filters.push(`oe.test_case_name = ${sqlLiteral(testCaseName)}`);
  }

  const query = `
    select
      oe.object_id,
      oe.test_case_name,
      oe.ad_server,
      oe.order_action,
      oe.username,
      oe.password,
      oe.impersonate_user_profile,
      oe.display_tabs,
      oe.objectives_type,
      oe.objectives_goal,
      mm.units_value,
      oe.objectives_conversion_pixels_type,
      oe.objectives_conversion_pixels,
      oe.objectives_goal_priority,
      oe.objectives_optimization_method,
      oe.objectives_optimization_type,
      oe.objectives_optimization_amount,
      oe.objectives_minimum_margin,
      oe.target_type,
      coalesce(oe.order_name, pmp.order_name) as order_name,
      mm.io_name,
      mm.campaign_name,
      mm.campaign_type,
      coalesce(oe.line_item_name, pmp.line_item_name) as line_item_name,
      dfp.line_items,
      pmp.curate_deal_name,
      pmp.dsp,
      oe.advertiser,
      coalesce(oe.single_object_id, mm.single_object_id) as single_object_id,
      oe.creative_type,
      coalesce(oe.revenue_type, dpm.revenue_type) as revenue_type,
      coalesce(oe.insertion_order, mm.io_reference, dpm.insertion_order) as insertion_order,
      coalesce(oe.order_notes, mm.order_notes, dpm.order_notes) as order_notes,
      coalesce(oe.cpm_value, mm.bid_cpm, dpm.budget_cpm_value) as cpm_value,
      coalesce(oe.optimization_cpm_value, dpm.optimization_cpm_value) as optimization_cpm_value,
      coalesce(oe.impression_goal, mm.budget_impression_goal, dpm.budget_impression_goal) as impression_goal,
      oe.flight_start_date,
      oe.flight_end_date,
      coalesce(oe.subdeal_id, dpm.sub_deal_id) as subdeal_id,
      oe.geotargeting_type,
      oe.geotargeting_search_text,
      oe.geotargeting_profile_name,
      coalesce(oe.inventory_devices, dpm.inventory_devices, dpm.inventory_types) as inventory_devices,
      oe.inventory_type,
      coalesce(oe.supply_strategy, dpm.supply_strategy) as supply_strategy,
      coalesce(oe.deal_selection_type, dpm.deal_selection_type) as deal_selection_type,
      coalesce(oe.cross_device, dpm.cross_device) as cross_device,
      oe.targeting_type_browsers,
      oe.targeting_browsers,
      dpm.targeting_inclusion_list,
      dpm.targeting_exclusion_list,
      coalesce(oe.viewability_threshold, dpm.viewability_threshold) as viewability_threshold,
      coalesce(oe.completion_rate_threshold, dpm.completion_rate_threshold) as completion_rate_threshold,
      coalesce(oe.listen_through_threshold, dpm.listen_through_threshold) as listen_through_threshold,
      mm.post_bid_measurement,
      coalesce(oe.frequency_cap, dpm.frequency_cap) as frequency_cap,
      coalesce(oe.recency_cap, dpm.recency_cap) as recency_cap,
      dpm.day_parting_time_slots,
      coalesce(oe.pacing_percentage, dpm.pacing_percentage) as pacing_percentage,
      mm.pacing_impression,
      mm.pacing_impression_type,
      coalesce(oe.daily_budget, dpm.daily_budget) as daily_budget,
      dpm.xandr_life_buffer,
      dpm.xandr_life_budget,
      coalesce(oe.audience_list, dpm.audience_list) as audience_list,
      coalesce(oe.creatives_list, dpm.creatives_list) as creatives_list,
      coalesce(oe.bulk_import_use_1st_url_for_all, dpm.bulk_import_use_1st_url_for_all) as bulk_import_use_1st_url_for_all,
      coalesce(oe.bulk_import_use_1st_image_for_all, dpm.bulk_import_use_1st_image_for_all) as bulk_import_use_1st_image_for_all,
      coalesce(oe.bulk_import_use_1st_icon_for_all, dpm.bulk_import_use_1st_icon_for_all) as bulk_import_use_1st_icon_for_all,
      coalesce(oe.bulk_import_creatives_type, dpm.bulk_import_creatives_type) as bulk_import_creatives_type,
      coalesce(oe.splits_list, dpm.splits_list) as splits_list,
      coalesce(oe.splits_allocation_list, dpm.splits_allocation_list) as splits_allocation_list,
      oe.splits_divide_equally,
      oe.order_submit_type,
      oe.confirmation_messages
    from order_entry_suite oe
    left join dpm_table dpm on dpm.id = oe.dpm_id
    left join dfp_table dfp on dfp.id = oe.dfp_id
    left join media_math_table mm on mm.id = oe.mediamath_id
    left join pmp_table pmp on pmp.id = oe.pmp_id
    where ${filters.join(' and ')}
    order by oe.object_id
    limit 1
  `;

  cachedRow = querySingleJson<OrderEntryDbRow>(query);
  cachedKey = cacheKey;
  return cachedRow;
}

function currentCreativeCacheKey(): string {
  const dbConfig = getAddaptiveDbConfig();

  return [
    dbConfig.host,
    dbConfig.port,
    dbConfig.database,
    dbConfig.user,
    config.orderEntryCreativeDbObjectId || config.orderEntryDbObjectId || '',
    config.orderEntryDbTestCaseName || '',
    config.orderEntryAdServer || ''
  ].join('|');
}

export function loadOrderEntryCreativeData(): OrderEntryCreativeDbRow | null {
  const cacheKey = currentCreativeCacheKey();
  if (cachedCreativeKey === cacheKey) {
    return cachedCreativeRow;
  }

  const forcedCreativeObjectId = config.orderEntryCreativeDbObjectId;
  const selectedObjectId = config.orderEntryDbObjectId;
  const selectedTestCaseName = config.orderEntryDbTestCaseName;
  const selectedAdServer = config.orderEntryAdServer;
  const selectedCase = loadOrderEntryCaseData();
  const creativeIdFromCase = parseFirstCreativeId(selectedCase?.creatives_list);

  let creativeFilter = '';

  if (creativeIdFromCase) {
    creativeFilter = `c.id = ${sqlLiteral(creativeIdFromCase)}::numeric`;
  } else if (forcedCreativeObjectId) {
    creativeFilter = `c."objectId" = ${sqlLiteral(forcedCreativeObjectId)}::numeric`;
  } else if (selectedObjectId) {
    creativeFilter = `c."objectId" = ${sqlLiteral(selectedObjectId)}::numeric`;
  } else if (selectedTestCaseName) {
    creativeFilter = `oe.test_case_name = ${sqlLiteral(selectedTestCaseName)}`;
  } else {
    creativeFilter = 'true';
  }

  const adServerFilter = selectedAdServer ? `and oe.ad_server = ${sqlLiteral(selectedAdServer)}` : '';
  const query = `
    select
      c.id,
      c."objectId"::text as object_id,
      c.creative_category,
      c.type,
      c.name,
      c.size,
      c.file_upload_path,
      c.icon_file_upload,
      c.protocol,
      c."URL" as url,
      c."ThirdPartyURL" as third_party_url,
      c."HTML (With/Without iFrame)" as html_iframe_mode,
      c.title,
      c.sponsered_by as sponsored_by,
      c.body,
      c.call_to_action,
      c.creative_tag_ids,
      c."Pixels" as pixels
    from order_entry_creatives c
    left join order_entry_suite oe on oe.object_id::numeric = c."objectId"
    where ${creativeFilter}
      ${adServerFilter}
    order by c.id
    limit 1
  `;

  cachedCreativeRow = querySingleJson<OrderEntryCreativeDbRow>(query);

  cachedCreativeKey = cacheKey;
  return cachedCreativeRow;
}

export function requireOrderEntryCaseData(): OrderEntryDbRow {
  const row = loadOrderEntryCaseData();
  if (!row) {
    throw new Error(
      'No order_entry_suite row matched the current selection. Override ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID or ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  return row;
}

export function loadOrderEntryBasicSetupValues(): {
  adServer?: string;
  orderName?: string;
  ioName?: string;
  campaignName?: string;
  campaignType?: string;
  lineItemName?: string;
  lineItems?: string[];
  curateDealName?: string;
  curateDSP?: string[];
  revenueType?: string;
  advertiser?: string;
  singleObjectDealId?: string;
  targetType?: string;
  creativeType?: string;
  insertionOrder?: string;
  orderNotes?: string;
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  return {
    adServer: sanitizeValue(row.ad_server),
    orderName: expandRowMacros(sanitizeValue(row.order_name), row),
    ioName: expandRowMacros(sanitizeValue(row.io_name), row),
    campaignName: expandRowMacros(sanitizeValue(row.campaign_name), row),
    campaignType: sanitizeValue(row.campaign_type),
    lineItemName: expandRowMacros(sanitizeValue(row.line_item_name), row),
    lineItems: parseMultiLine(row.line_items).map((value) => expandRowMacros(value, row) || value),
    curateDealName: expandRowMacros(sanitizeValue(row.curate_deal_name), row),
    curateDSP: parseMultiLine(row.dsp).map((value) => expandRowMacros(value, row) || value),
    revenueType: sanitizeValue(row.revenue_type),
    advertiser: sanitizeValue(row.advertiser),
    singleObjectDealId: sanitizeValue(row.single_object_id),
    targetType: sanitizeValue(row.target_type),
    creativeType: sanitizeValue(row.creative_type),
    insertionOrder: sanitizeValue(row.insertion_order),
    orderNotes: sanitizeValue(row.order_notes)
  };
}

export function loadOrderEntryObjectivesValues(): {
  adServer?: string;
  orderAction?: string;
  objectivesType?: string;
  objectivesGoal?: string;
  unitsValue?: string;
  objectivesGoalPriority?: string;
  objectivesOptimizationMethod?: string;
  objectivesOptimizationType?: string;
  objectivesOptimizationAmount?: string;
  objectivesMinimumMargin?: string;
  objectivesConversionPixelsType?: string;
  objectivesConversionPixels: string[];
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  return {
    adServer: sanitizeValue(row.ad_server),
    orderAction: sanitizeValue(row.order_action),
    objectivesType: sanitizeValue(row.objectives_type),
    objectivesGoal: sanitizeValue(row.objectives_goal),
    unitsValue: sanitizeValue(row.units_value),
    objectivesGoalPriority: sanitizeValue(row.objectives_goal_priority),
    objectivesOptimizationMethod: sanitizeValue(row.objectives_optimization_method),
    objectivesOptimizationType: sanitizeValue(row.objectives_optimization_type),
    objectivesOptimizationAmount: sanitizeValue(row.objectives_optimization_amount),
    objectivesMinimumMargin: sanitizeValue(row.objectives_minimum_margin),
    objectivesConversionPixelsType: sanitizeValue(row.objectives_conversion_pixels_type),
    objectivesConversionPixels: parseMultiLine(row.objectives_conversion_pixels)
  };
}

export function requireOrderEntryObjectivesValues(): NonNullable<ReturnType<typeof loadOrderEntryObjectivesValues>> {
  const values = loadOrderEntryObjectivesValues();
  if (!values) {
    throw new Error('Failed to load objectives values from Postgres.');
  }

  return values;
}

export function requireOrderEntryBasicSetupValues(): NonNullable<ReturnType<typeof loadOrderEntryBasicSetupValues>> {
  const values = loadOrderEntryBasicSetupValues();
  if (!values) {
    throw new Error('Failed to load basic setup values from Postgres.');
  }

  return values;
}

export function loadOrderEntryBudgetFlightValues(): {
  adServer?: string;
  orderAction?: string;
  startDate?: string;
  endDate?: string;
  subDealId?: string;
  cpmValue?: string;
  impressionGoal?: string;
  optimizationCpm?: string;
  pacingPercentage?: string;
  pacingImpression?: string;
  pacingImpressionType?: string;
  dailyBudget?: string;
  xandrLifeBuffer?: string;
  xandrLifeBudget?: string;
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  return {
    adServer: sanitizeValue(row.ad_server),
    orderAction: sanitizeValue(row.order_action),
    startDate: resolveRelativeDate(row.flight_start_date),
    endDate: resolveRelativeDate(row.flight_end_date),
    subDealId: sanitizeValue(row.subdeal_id),
    cpmValue: sanitizeValue(row.cpm_value),
    impressionGoal: sanitizeValue(row.impression_goal),
    optimizationCpm: sanitizeValue(row.optimization_cpm_value),
    pacingPercentage: sanitizeValue(row.pacing_percentage),
    pacingImpression: sanitizeValue(row.pacing_impression),
    pacingImpressionType: sanitizeValue(row.pacing_impression_type),
    dailyBudget: sanitizeValue(row.daily_budget),
    xandrLifeBuffer: sanitizeValue(row.xandr_life_buffer),
    xandrLifeBudget: sanitizeValue(row.xandr_life_budget)
  };
}

export function requireOrderEntryBudgetFlightValues(): NonNullable<ReturnType<typeof loadOrderEntryBudgetFlightValues>> {
  const values = loadOrderEntryBudgetFlightValues();
  if (!values) {
    throw new Error('Failed to load budget and flight values from Postgres.');
  }

  return values;
}

export function loadOrderEntryInventoryValues(): {
  adServer?: string;
  geoTargetingType?: string;
  geoTargetingItems?: string[];
  geoTargetingProfileName?: string;
  inventoryDevices?: string[];
  inventoryItem?: string;
  targetingTypeBrowser?: string;
  targetingBrowsers?: string[];
  inventoryInclusionList?: string[];
  inventoryExclusionList?: string[];
  viewabilityThreshold?: string;
  completionRateThreshold?: string;
  listenThroughThreshold?: string;
  postBidMeasurement?: string;
  supplyStrategy?: string;
  dealSelectionType?: string;
  crossDevice?: string;
  frequencyCapEnabled?: boolean;
  frequencyCap?: string;
  frequencyCapUnit?: string;
  recencyCapEnabled?: boolean;
  recencyCap?: string;
  recencyCapUnit?: string;
  dayPartingTimeSlots?: string[];
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  const parseCapValue = (
    rawValue?: string | null,
    kind: 'frequency' | 'recency' = 'frequency'
  ): { value?: string; unit?: string } => {
    const sanitized = sanitizeToggleValue(rawValue);
    if (!sanitized) {
      return {};
    }

    if (kind === 'frequency') {
      const match = sanitized.match(/^(.+?)\s+imps?\s+per\s+(.+)$/i);
      if (match) {
        return {
          value: sanitizeValue(match[1]),
          unit: sanitizeValue(match[2])
        };
      }
    } else {
      const match = sanitized.match(/^.+?\s+per\s+(.+?)\s+(.+)$/i);
      if (match) {
        return {
          value: sanitizeValue(match[1]),
          unit: sanitizeValue(match[2])
        };
      }
    }

    return {};
  };

  const frequencyCap = parseCapValue(row.frequency_cap, 'frequency');
  const recencyCap = parseCapValue(row.recency_cap, 'recency');

  return {
    adServer: sanitizeValue(row.ad_server),
    geoTargetingType: sanitizeValue(row.geotargeting_type),
    geoTargetingItems: parseMultiLine(row.geotargeting_search_text),
    geoTargetingProfileName: sanitizeValue(row.geotargeting_profile_name),
    inventoryDevices: parseMultiLine(row.inventory_devices).flatMap((item) =>
      item
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
    ),
    inventoryItem: sanitizeValue(row.inventory_type),
    targetingTypeBrowser: sanitizeValue(row.targeting_type_browsers),
    targetingBrowsers: parseMultiLine(row.targeting_browsers),
    inventoryInclusionList: parseMultiLine(row.targeting_inclusion_list),
    inventoryExclusionList: parseMultiLine(row.targeting_exclusion_list),
    viewabilityThreshold: sanitizeValue(row.viewability_threshold),
    completionRateThreshold: sanitizeValue(row.completion_rate_threshold),
    listenThroughThreshold: sanitizeValue(row.listen_through_threshold),
    postBidMeasurement: sanitizeValue(row.post_bid_measurement),
    supplyStrategy: sanitizeValue(row.supply_strategy),
    dealSelectionType: sanitizeValue(row.deal_selection_type),
    crossDevice: sanitizeValue(row.cross_device),
    frequencyCapEnabled: !!sanitizeToggleValue(row.frequency_cap),
    frequencyCap: frequencyCap.value,
    frequencyCapUnit: frequencyCap.unit,
    recencyCapEnabled: !!sanitizeToggleValue(row.recency_cap),
    recencyCap: recencyCap.value,
    recencyCapUnit: recencyCap.unit,
    dayPartingTimeSlots: parseMultiLine(row.day_parting_time_slots)
  };
}

export function requireOrderEntryInventoryValues(): NonNullable<ReturnType<typeof loadOrderEntryInventoryValues>> {
  const values = loadOrderEntryInventoryValues();
  if (!values) {
    throw new Error('Failed to load inventory values from Postgres.');
  }

  return values;
}

export function loadOrderEntryCreativeValues(): {
  objectId?: string;
  creativeId?: string;
  creativeCategory?: string;
  creativeName?: string;
  creativeType?: string;
  creativeSize?: string;
  landingPageUrl?: string;
  protocol?: string;
  filePath?: string;
  iconFilePath?: string;
  title?: string;
  sponsoredBy?: string;
  body?: string;
  callToAction?: string;
  thirdPartyUrl?: string;
  htmlWithOrWithoutIframe?: string;
  creativeTagIds?: string;
} | null {
  const row = loadOrderEntryCreativeData();
  if (!row) {
    return null;
  }

  return {
    objectId: sanitizeValue(row.object_id),
    creativeId: sanitizeValue(row.id),
    creativeCategory: sanitizeValue(row.creative_category),
    creativeName: sanitizeValue(row.name),
    creativeType: sanitizeValue(row.type),
    creativeSize: sanitizeValue(row.size),
    landingPageUrl: sanitizeValue(row.url),
    protocol: sanitizeValue(row.protocol),
    filePath: sanitizeValue(row.file_upload_path),
    iconFilePath: sanitizeValue(row.icon_file_upload),
    title: sanitizeValue(row.title),
    sponsoredBy: sanitizeValue(row.sponsored_by),
    body: sanitizeValue(row.body),
    callToAction: sanitizeValue(row.call_to_action),
    thirdPartyUrl: sanitizeValue(row.third_party_url),
    htmlWithOrWithoutIframe: sanitizeValue(row.html_iframe_mode),
    creativeTagIds: sanitizeValue(row.creative_tag_ids)
  };
}

export function loadOrderEntryFlowValues(): {
  username?: string;
  password?: string;
  impersonateUserProfile?: string;
  tabs: string[];
  audienceList: string[];
  creativesList: string[];
  bulkImportCreativesType?: string;
  bulkImportUse1stUrlForAll?: string;
  bulkImportUse1stImageForAll?: string;
  bulkImportUse1stIconForAll?: string;
  splitsList: string[];
  splitsAllocationList: string[];
  splitsDivideEqually?: string;
  orderSubmitType?: string;
  confirmationMessages: string[];
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  return {
    username: sanitizeValue(row.username),
    password: sanitizeValue(row.password),
    impersonateUserProfile: sanitizeValue(row.impersonate_user_profile),
    tabs: resolveOrderEntryTabs(row.ad_server),
    audienceList: parseMultiLine(row.audience_list),
    creativesList: parseMultiLine(row.creatives_list),
    bulkImportCreativesType: sanitizeValue(row.bulk_import_creatives_type),
    bulkImportUse1stUrlForAll: sanitizeValue(row.bulk_import_use_1st_url_for_all),
    bulkImportUse1stImageForAll: sanitizeValue(row.bulk_import_use_1st_image_for_all),
    bulkImportUse1stIconForAll: sanitizeValue(row.bulk_import_use_1st_icon_for_all),
    splitsList: parseMultiLine(row.splits_list),
    splitsAllocationList: parseMultiLine(row.splits_allocation_list),
    splitsDivideEqually: sanitizeValue(row.splits_divide_equally),
    orderSubmitType: sanitizeValue(row.order_submit_type),
    confirmationMessages: parseMultiLine(row.confirmation_messages)
  };
}

export function requireOrderEntryFlowValues(): NonNullable<ReturnType<typeof loadOrderEntryFlowValues>> {
  const values = loadOrderEntryFlowValues();
  if (!values) {
    throw new Error('Failed to load order-entry flow values from Postgres.');
  }

  return values;
}

export function requireOrderEntryCreativeValues(): NonNullable<ReturnType<typeof loadOrderEntryCreativeValues>> {
  const values = loadOrderEntryCreativeValues();
  if (!values) {
    throw new Error('Failed to load creative values from Postgres order_entry_creatives.');
  }

  return values;
}

export type OrderEntryCreativeCaseRow = {
  id: string;
  creativeCategory?: string;
  name?: string;
  type?: string;
  size?: string;
  protocol?: string;
  url?: string;
  filePath?: string;
  iconFilePath?: string;
  title?: string;
  sponsoredBy?: string;
  body?: string;
  callToAction?: string;
  thirdPartyUrl?: string;
  creativeTagIds?: string;
  htmlWithOrWithoutIframe?: string;
  pixels?: OrderEntryCreativePixelCaseRow[];
};

export type OrderEntryCreativePixelCaseRow = {
  id: string;
  creativeType?: string;
  pixelUrl?: string;
  actionType?: string;
  action?: string;
  pixelType?: string;
};

export function loadOrderEntryCreativeRowsForCase(): OrderEntryCreativeCaseRow[] {
  const selectedCase = loadOrderEntryCaseData();
  const creativeIds = parseCreativeIds(selectedCase?.creatives_list);
  if (creativeIds.length === 0) {
    return [];
  }

  const creativeOrderById = new Map(creativeIds.map((id, index) => [id, index] as const));
  const idFilter = creativeIds.map((id) => `${sqlLiteral(id)}::numeric`).join(', ');
  const rows = queryJson<OrderEntryCreativeDbRow[]>(`
    select
      c.id,
      c.creative_category,
      c.name,
      c.type,
      c.size,
      c.protocol,
      c.file_upload_path,
      c.icon_file_upload,
      c."URL" as url,
      c."ThirdPartyURL" as third_party_url,
      c."HTML (With/Without iFrame)" as html_iframe_mode
      ,
      c.title,
      c.sponsered_by as sponsored_by,
      c.body,
      c.call_to_action,
      c.creative_tag_ids,
      c."Pixels" as pixels
    from order_entry_creatives c
    where c.id in (${idFilter})
    order by array_position(array[${idFilter}]::numeric[], c.id)
  `);

  const pixelIds = [...new Set(rows.flatMap((row) => parseMultiLine(row.pixels)))];
  const pixelById = new Map<string, OrderEntryCreativePixelCaseRow>();
  if (pixelIds.length > 0) {
    const pixelIdFilter = pixelIds.map((id) => `${sqlLiteral(id)}::numeric`).join(', ');
    const pixelRows = queryJson<
      Array<{
        id: string;
        creative_type: string | null;
        pixel_url: string | null;
        action_type: string | null;
        action: string | null;
        pixel_type: string | null;
      }>
    >(`
      select
        p.id::text as id,
        p."CreativeType" as creative_type,
        p."PixelURL" as pixel_url,
        p."ActionType" as action_type,
        p."Action" as action,
        p."PixelType" as pixel_type
      from order_entry_creative_pixels p
      where p.id in (${pixelIdFilter})
      order by p.id
    `);

    for (const pixelRow of pixelRows) {
      pixelById.set(pixelRow.id, {
        id: pixelRow.id,
        creativeType: sanitizeValue(pixelRow.creative_type),
        pixelUrl: sanitizeValue(pixelRow.pixel_url),
        actionType: sanitizeValue(pixelRow.action_type),
        action: sanitizeValue(pixelRow.action),
        pixelType: sanitizeValue(pixelRow.pixel_type)
      });
    }
  }

  return rows
    .sort((left, right) => {
      const leftOrder = creativeOrderById.get(String(left.id)) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = creativeOrderById.get(String(right.id)) ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    })
    .map((row) => ({
    id: sanitizeValue(row.id) || '',
    creativeCategory: sanitizeValue(row.creative_category),
    name: sanitizeValue(row.name),
    type: sanitizeValue(row.type),
    size: sanitizeValue(row.size),
    protocol: sanitizeValue(row.protocol),
    url: sanitizeValue(row.url),
    filePath: sanitizeValue(row.file_upload_path),
    iconFilePath: sanitizeValue(row.icon_file_upload),
    title: sanitizeValue(row.title),
    sponsoredBy: sanitizeValue(row.sponsored_by),
    body: sanitizeValue(row.body),
    callToAction: sanitizeValue(row.call_to_action),
    thirdPartyUrl: sanitizeValue(row.third_party_url),
    creativeTagIds: sanitizeValue(row.creative_tag_ids),
    htmlWithOrWithoutIframe: sanitizeValue(row.html_iframe_mode),
    pixels: parseMultiLine(row.pixels)
      .map((pixelId) => pixelById.get(pixelId))
      .filter((pixel): pixel is OrderEntryCreativePixelCaseRow => Boolean(pixel))
    }));
}

export function loadOrderEntryAudienceActions(): OrderEntryAudienceAction[] {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return [];
  }

  const audienceItems = parseMultiLine(row.audience_list);
  const actions: OrderEntryAudienceAction[] = [];

  for (const audienceItem of audienceItems) {
    const parts = audienceItem.split(':').map((item) => item.trim());
    if (parts.length === 0) {
      continue;
    }

    const action = parts[0];
    if (action !== '*') {
      actions.push({ action });
      continue;
    }

    if (parts.length < 4) {
      actions.push({ action });
      continue;
    }

    const groupIndex = Number(parts[1]);
    const subgroupIndex = Number(parts[2]);
    const audienceId = parts[3];
    const audienceRow = querySingleJson<OrderEntryAudienceDbRow>(`
      select
        id::text as id,
        "objectId"::text as object_id,
        "IncludeExclude" as include_exclude,
        "AudienceType" as audience_type,
        "Audience" as audience
      from order_entry_audiences
      where id = ${sqlLiteral(audienceId)}::int
      limit 1
    `);

    actions.push({
      action,
      groupIndex: Number.isFinite(groupIndex) ? groupIndex : undefined,
      subgroupIndex: Number.isFinite(subgroupIndex) ? subgroupIndex : undefined,
      audienceId,
      includeExclude: sanitizeValue(audienceRow?.include_exclude),
      audienceType: sanitizeValue(audienceRow?.audience_type),
      audienceName: sanitizeValue(audienceRow?.audience)
    });
  }

  return actions;
}

export function requireOrderEntryAudienceActions(): OrderEntryAudienceAction[] {
  return loadOrderEntryAudienceActions();
}

export function loadOrderEntrySplitValues(): {
  hasSplits: boolean;
  splitName?: string;
} | null {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return null;
  }

  const splitItems = parseMultiLine(row.splits_list);

  return {
    hasSplits: splitItems.length > 0,
    splitName: splitItems.length > 0 ? `${row.test_case_name} Split` : undefined
  };
}

export function requireOrderEntrySplitValues(): NonNullable<ReturnType<typeof loadOrderEntrySplitValues>> {
  const values = loadOrderEntrySplitValues();
  if (!values) {
    throw new Error('Failed to load split values from Postgres.');
  }

  return values;
}

export function loadOrderEntrySplitActions(): OrderEntrySplitAction[] {
  const row = loadOrderEntryCaseData();
  if (!row) {
    return [];
  }

  const splitItems = parseMultiLine(row.splits_list);
  const splitIds = [...new Set(splitItems.map((item) => item.split(':').map((part) => part.trim())).flatMap((parts) => {
    const action = parts[0];
    if (action === '*' && parts[1]) {
      return [parts[1]];
    }
    if (action === '!' && parts[2]) {
      return [parts[2]];
    }
    return [];
  }))];

  const splitRowsById = new Map<string, OrderEntrySplitDbRow>();
  if (splitIds.length > 0) {
    const splitIdFilter = splitIds.map((id) => `${sqlLiteral(id)}::numeric`).join(', ');
    const splitRows = queryJson<OrderEntrySplitDbRow[]>(`
      select
        s.id::text as id,
        s."BasicSetup-GroupName" as group_name,
        s."BasicSetup-BidModifiers" as bid_modifiers,
        s."BasicSetup-Status" as status,
        s."BasicSetup-IABViewabilityRateCheckbox" as iab_viewability_rate_checkbox,
        s."BasicSetup-IABViewabilityRateOperator" as iab_viewability_rate_operator,
        s."BasicSetup-IABViewabilityRateValue" as iab_viewability_rate_value
      from order_entry_splits s
      where s.id in (${splitIdFilter})
      order by s.id
    `);

    for (const splitRow of splitRows) {
      splitRowsById.set(splitRow.id, splitRow);
    }
  }

  return splitItems
    .map((item) => item.split(':').map((part) => part.trim()))
    .flatMap((parts): OrderEntrySplitAction[] => {
      const action = parts[0];
      if (action !== '*' && action !== '!' && action !== 'x') {
        return [];
      }

      const groupNumber = Number(parts[1]);
      const splitId = action === '*' ? parts[1] : action === '!' ? parts[2] : undefined;
      const splitRow = splitId ? splitRowsById.get(splitId) : undefined;
      const viewabilityChecked = (splitRow?.iab_viewability_rate_checkbox || '').trim().toLowerCase() === 'checked';

      return [
        {
          action,
          groupNumber: Number.isFinite(groupNumber) ? groupNumber : undefined,
          splitId,
          name: sanitizeValue(splitRow?.group_name),
          bidModifiers: sanitizeValue(splitRow?.bid_modifiers),
          status: sanitizeValue(splitRow?.status),
          iabViewabilityRate:
            viewabilityChecked ||
            !!sanitizeValue(splitRow?.iab_viewability_rate_operator) ||
            !!sanitizeValue(splitRow?.iab_viewability_rate_value)
              ? {
                  enabled: viewabilityChecked,
                  operator: sanitizeValue(splitRow?.iab_viewability_rate_operator),
                  value: sanitizeValue(splitRow?.iab_viewability_rate_value)
                }
              : undefined
        }
      ];
    });
}
