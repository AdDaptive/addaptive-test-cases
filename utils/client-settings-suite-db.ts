import { queryJson, sqlLiteral } from './db-config';
import { config } from './config';

export type ClientSettingsSuiteGroup = {
  groupId: string;
  objectId: string;
  testCaseName: string;
  status?: string;
  username?: string;
  password?: string;
  impersonateUserProfile?: string;
  clientName?: string;
  backendClientName?: string;
  advertiser?: string;
  adServer?: string;
  orderAction?: string;
  expectedProfile?: string;
};

export type ClientSettingsSuiteStep = {
  stepId: string;
  groupId: string;
  sortOrder: number;
  stepType: string;
  fieldName: string;
  fieldValue: string;
};

export type ClientSettingsSuiteGroupRun = {
  group: ClientSettingsSuiteGroup;
  steps: ClientSettingsSuiteStep[];
};

type ClientSettingsSuiteLoadResult = {
  groups: ClientSettingsSuiteGroupRun[];
  selectionError?: string;
};

const DEFAULT_GROUP_TABLE = 'client_settings_preflight_suite';
const DEFAULT_STEP_TABLE = 'client_settings_suite_group_steps';

function normalizeStepFieldName(stepType: string, fieldName: string): string {
  const normalizedStepType = stepType.trim().toLowerCase();
  const trimmedFieldName = fieldName.trim();
  if (
    /^(css=|xpath=|\/\/|#|\.|\[|input\b|select\b|button\b|span\b|div\b)/i.test(trimmedFieldName)
  ) {
    return trimmedFieldName;
  }
  const normalizedField = fieldName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  if (normalizedStepType === 'backend_set' || normalizedStepType === 'backend_assert') {
    if (normalizedField === 'billing_cpm_banner') {
      return 'billing_cpm_banner';
    }
    if (normalizedField === 'bid_cpm_banner') {
      return 'bid_cpm_banner';
    }
    return normalizedField;
  }

  if (normalizedStepType === 'frontend_assert') {
    if (normalizedField === 'bid_cpm') {
      return 'budget_admin_bid_cpm';
    }
    if (normalizedField === 'billing_cpm') {
      return 'budget_flight_cpm';
    }
    if (normalizedField === 'goal_value') {
      return 'objectives_goal_value';
    }
    return normalizedField;
  }

  return normalizedField;
}

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

function parseRange(rawValue?: string): { start: number; end: number } | undefined {
  if (!rawValue) {
    return undefined;
  }

  const match = rawValue.trim().match(/^(\d+)\s*-\s*(\d+)$/);
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

function normalizeFilterValue(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function sqlIdentifier(value: string): string {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
    throw new Error(`Invalid client-settings DB table name "${value}".`);
  }

  return `"${value}"`;
}

function resolveGroupTableName(): string {
  return sanitizeValue(config.clientSettingsGroupTable) || sanitizeValue(config.clientSettingsDbTable) || DEFAULT_GROUP_TABLE;
}

function resolveStepTableName(): string {
  return sanitizeValue(config.clientSettingsStepTable) || DEFAULT_STEP_TABLE;
}

function tableExists(tableName: string): boolean {
  const result = queryJson<Array<{ exists: boolean }>>(`
    select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = ${sqlLiteral(tableName)}
    ) as "exists"
  `);

  return result[0]?.exists === true;
}

function getTableColumns(tableName: string): Set<string> {
  const rows = queryJson<Array<{ columnName: string }>>(`
    select column_name as "columnName"
    from information_schema.columns
    where table_schema = 'public'
      and table_name = ${sqlLiteral(tableName)}
  `);

  return new Set(rows.map((row) => row.columnName));
}

export function getSelectedClientSettingsObjectIdsFromEnv(): string[] {
  const explicitIds = config.clientSettingsDbIds;
  if (explicitIds.length > 0) {
    return explicitIds;
  }

  const singleId = config.clientSettingsDbId;
  return singleId ? [singleId] : [];
}

export function buildClientSettingsCaseSelectionError(extraMessage?: string): string {
  const selectedGroupTable = resolveGroupTableName();
  const selectedStepTable = resolveStepTableName();
  const selectedIds = config.clientSettingsDbIds;
  const selectedId = config.clientSettingsDbId;
  const selectedRange = config.clientSettingsDbRange;
  const selectedTestCaseName = config.clientSettingsDbTestCaseName;
  const selectedAdServer = config.clientSettingsAdServer;

  const summary = [
    `groupTable=${selectedGroupTable}`,
    `stepTable=${selectedStepTable}`,
    `objectId=${selectedId || '<unset>'}`,
    `ids=${selectedIds.length > 0 ? selectedIds.join(',') : '<unset>'}`,
    `range=${selectedRange || '<unset>'}`,
    `testCaseName=${selectedTestCaseName || '<unset>'}`,
    `adServer=${selectedAdServer || '<unset>'}`
  ].join(', ');

  return extraMessage
    ? `Client-settings suite selection failed. ${extraMessage} Active filters: ${summary}.`
    : `No client-settings suite rows matched the current selectors. Active filters: ${summary}.`;
}

export function loadClientSettingsSuiteGroups(filters: {
  allowedAdServers?: string[];
  requiredOrderAction?: string;
} = {}): ClientSettingsSuiteGroupRun[] {
  const ids = [...new Set(getSelectedClientSettingsObjectIdsFromEnv().map((item) => item.trim()).filter(Boolean))];
  const selectedRange = parseRange(config.clientSettingsDbRange);
  const selectedAdServer = sanitizeValue(config.clientSettingsAdServer);
  const groupTableColumns = getTableColumns(resolveGroupTableName());
  const groupTableName = sqlIdentifier(resolveGroupTableName());
  const stepTableName = sqlIdentifier(resolveStepTableName());
  const whereClauses: string[] = [];
  const impersonateUserProfileSelect = groupTableColumns.has('impersonate_user_profile')
    ? 'g.impersonate_user_profile'
    : 'null::text';
  const usernameSelect = groupTableColumns.has('username') ? 'g.username' : 'null::text';
  const passwordSelect = groupTableColumns.has('password') ? 'g.password' : 'null::text';
  const clientNameSelect = groupTableColumns.has('client_name') ? 'g.client_name' : 'null::text';
  const statusSelect = groupTableColumns.has('status') ? 'g.status' : 'null::text';
  const adServerSelect = groupTableColumns.has('ad_server') ? 'g.ad_server' : `'MEDIAMATH'`;
  const orderActionSelect = groupTableColumns.has('order_action') ? 'g.order_action' : `'create'`;

  if (ids.length > 0) {
    whereClauses.push(`g.object_id in (${ids.map((id) => sqlLiteral(id)).join(', ')})`);
  }

  if (config.clientSettingsDbTestCaseName) {
    whereClauses.push(`g.test_case_name = ${sqlLiteral(config.clientSettingsDbTestCaseName)}`);
  }

  const whereClause = whereClauses.length > 0 ? `where ${whereClauses.join(' and ')}` : '';
  const rangeClause = selectedRange ? `where selected."rowNumber" between ${selectedRange.start} and ${selectedRange.end}` : '';

  const rows = queryJson<Array<{
    groupId: string;
    objectId: string;
    testCaseName: string;
    status?: string;
    username?: string;
    password?: string;
    impersonateUserProfile?: string;
    clientName?: string;
    backendClientName?: string;
    advertiser?: string;
    adServer?: string;
    orderAction?: string;
    expectedProfile?: string;
    stepId: string;
    sortOrder: number;
    stepType: string;
    fieldName: string;
    fieldValue: string;
  }>>(`
    select
      selected."groupId",
      selected."objectId",
      selected."testCaseName",
      selected."status",
      selected."username",
      selected."password",
      selected."impersonateUserProfile",
      selected."clientName",
      selected."backendClientName",
      selected."advertiser",
      selected."adServer",
      selected."orderAction",
      selected."expectedProfile",
      selected."stepId",
      selected."sortOrder",
      selected."stepType",
      selected."fieldName",
      selected."fieldValue"
    from (
      select
        g.object_id::text as "groupId",
        g.object_id::text as "objectId",
        g.test_case_name as "testCaseName",
        ${statusSelect} as "status",
        ${usernameSelect} as "username",
        ${passwordSelect} as "password",
        ${impersonateUserProfileSelect} as "impersonateUserProfile",
        ${clientNameSelect} as "clientName",
        ${clientNameSelect} as "backendClientName",
        null::text as "advertiser",
        ${adServerSelect} as "adServer",
        ${orderActionSelect} as "orderAction",
        'mediamath-defaults' as "expectedProfile",
        s.id::text as "stepId",
        coalesce(s.step_order, s.id) as "sortOrder",
        s.step_type as "stepType",
        case
          when lower(coalesce(s.step_type, '')) in ('backend_set', 'backend_assert') then s.backend_field
          else s.frontend_field
        end as "fieldName",
        s.value as "fieldValue",
        dense_rank() over (order by g.object_id::int nulls last, g.id) as "rowNumber"
      from ${groupTableName} g
      join ${stepTableName} s on s.object_id = g.object_id
      ${whereClause}
    ) selected
    ${rangeClause}
    order by selected."rowNumber", selected."sortOrder", selected."stepId"
  `);

  const grouped = new Map<string, ClientSettingsSuiteGroupRun>();
  for (const row of rows) {
    const existing = grouped.get(row.groupId);
    if (existing) {
      existing.steps.push({
        stepId: row.stepId,
        groupId: row.groupId,
        sortOrder: row.sortOrder,
        stepType: row.stepType,
        fieldName: normalizeStepFieldName(row.stepType, row.fieldName),
        fieldValue: row.fieldValue
      });
      continue;
    }

    grouped.set(row.groupId, {
      group: {
        groupId: row.groupId,
        objectId: row.objectId,
        testCaseName: row.testCaseName,
        status: row.status,
        username: sanitizeValue(row.username),
        password: sanitizeValue(row.password),
        impersonateUserProfile: row.impersonateUserProfile,
        clientName: row.clientName,
        backendClientName: row.backendClientName,
        advertiser: row.advertiser,
        adServer: row.adServer,
        orderAction: row.orderAction,
        expectedProfile: row.expectedProfile
      },
      steps: [
        {
          stepId: row.stepId,
          groupId: row.groupId,
          sortOrder: row.sortOrder,
          stepType: row.stepType,
          fieldName: normalizeStepFieldName(row.stepType, row.fieldName),
          fieldValue: row.fieldValue
        }
      ]
    });
  }

  return [...grouped.values()];
}

function formatLoadError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const groupTableName = resolveGroupTableName();
  const stepTableName = resolveStepTableName();

  if (/relation .* does not exist/i.test(message)) {
    return `Required client-settings suite tables "${groupTableName}" and "${stepTableName}" do not both exist.`;
  }

  if (/column .* does not exist/i.test(message)) {
    return `Client-settings suite tables are missing required columns. Expected current group columns include id, object_id, test_case_name, impersonate_user_profile, and client_name. Expected current step columns include id, object_id, frontend_field, backend_field, step_type, value, and optionally step_order.`;
  }

  return message;
}

export function tryLoadClientSettingsSuiteGroups(filters: {
  allowedAdServers?: string[];
  requiredOrderAction?: string;
} = {}): ClientSettingsSuiteLoadResult {
  try {
    const groupTableName = resolveGroupTableName();
    const stepTableName = resolveStepTableName();
    if (!tableExists(groupTableName) || !tableExists(stepTableName)) {
      return {
        groups: [],
        selectionError: buildClientSettingsCaseSelectionError(
          `Required client-settings suite tables "${groupTableName}" and "${stepTableName}" do not both exist.`
        )
      };
    }

    return { groups: loadClientSettingsSuiteGroups(filters) };
  } catch (error) {
    return {
      groups: [],
      selectionError: buildClientSettingsCaseSelectionError(formatLoadError(error))
    };
  }
}
