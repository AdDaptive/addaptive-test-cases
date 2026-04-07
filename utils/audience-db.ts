import fs from 'node:fs';
import path from 'node:path';
import { getAddaptiveDbConfig, queryJson, querySingleJson, sqlLiteral } from './db-config';
import { config } from './config';

type AudienceDbRow = {
  id: string;
  test_case_name: string | null;
  username: string | null;
  password: string | null;
  impersonate_user_profile: string | null;
  audience_action: string | null;
  segment_activation_type: string | null;
  activation_type: string | null;
  email_type: string | null;
  hash_type: string | null;
  advertiser: string | null;
  file_name: string | null;
  file_contains_header_row: string | null;
  primary_dimensions: string | null;
  filter_criteria: string | null;
  match_criterias_by_type: string | null;
  match_criteria_target: string | null;
  bulk_import: string | null;
  bulk_import_file_type: string | null;
  bulk_import_file_name: string | null;
  alert_messages_match_criteria: string | null;
  segment_name: string | null;
  expiration_date: string | null;
  activation_source: string | null;
  primary_address_only: string | null;
  is_draft_segment: string | null;
  object_id: string | number | null;
  existing_segment_name: string | null;
};

type AudienceCaseSummary = {
  id: string;
  testCaseName: string | null;
  audienceAction: string | null;
  segmentType: string | null;
};

type AudienceMatchCriteriaRow = {
  id: string;
  criteriaType: string | null;
  value: string | null;
  cardGroup: string | null;
  cardText: string | null;
};

let cachedKey: string | null = null;
let cachedRow: AudienceDbRow | null = null;
let cachedColumns: Set<string> | null = null;

function currentCacheKey(): string {
  const dbConfig = getAddaptiveDbConfig();

  return [
    dbConfig.host,
    dbConfig.port,
    dbConfig.database,
    dbConfig.user,
    config.audienceDbId || '',
    config.audienceDbTestCaseName || ''
  ].join('|');
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

function getAudienceTableColumns(): Set<string> {
  if (cachedColumns) {
    return cachedColumns;
  }

  const rows = queryJson<Array<{ column_name: string }>>(`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'audiences_suite'
  `);

  cachedColumns = new Set(rows.map((row) => row.column_name));
  return cachedColumns;
}

function findFileByBasename(rootDir: string, fileName: string): string | undefined {
  if (!fs.existsSync(rootDir)) {
    return undefined;
  }

  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isFile() && entry.name === fileName) {
      return fullPath;
    }

    if (entry.isDirectory()) {
      const nestedMatch = findFileByBasename(fullPath, fileName);
      if (nestedMatch) {
        return nestedMatch;
      }
    }
  }

  return undefined;
}

function resolveImportFile(fileName?: string | null): string | undefined {
  const value = sanitizeValue(fileName);
  if (!value) {
    return undefined;
  }

  if (path.isAbsolute(value) && fs.existsSync(value)) {
    return value;
  }

  const candidates = [
    path.resolve(process.cwd(), 'Data Files/Frontend/Audience/Audience Import Files', value),
    path.resolve(process.cwd(), 'Data Files/Frontend/Audience', value),
    path.resolve(process.cwd(), value)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const importRoot = path.resolve(process.cwd(), 'Data Files/Frontend/Audience/Audience Import Files');
  const basenameMatch = findFileByBasename(importRoot, path.basename(value));
  if (basenameMatch) {
    return basenameMatch;
  }

  return path.resolve(process.cwd(), value);
}

function parseActivationType(value?: string | null): { activationType?: string; emailType?: string } {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return {};
  }

  const [baseRaw, detailRaw] = sanitized.split(':').map((item) => item.trim());
  const base = baseRaw?.toLowerCase() || '';
  const detail = detailRaw?.trim();

  if (base === 'account') {
    return { activationType: 'Account' };
  }
  if (base === 'email') {
    return { activationType: 'Email', emailType: detail };
  }
  if (base === 'alt identifier') {
    return { activationType: 'Alt. Identifier' };
  }
  if (base === 'business address') {
    return { activationType: 'Business Address' };
  }
  if (base === 'consumer address') {
    return { activationType: 'Consumer Address' };
  }

  return {};
}

function resolveFirstPartySubtype(fileName?: string | null): string | undefined {
  const value = sanitizeValue(fileName);
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (normalized.includes('account')) {
    return 'Account';
  }
  if (normalized.includes('email')) {
    return 'Email';
  }
  if (normalized.includes('alt identifier')) {
    return 'Alt. Identifier';
  }
  if (normalized.includes('business address')) {
    return 'Business Address';
  }
  if (normalized.includes('consumer address')) {
    return 'Consumer Address';
  }

  return undefined;
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

function parseDelimitedValues(value?: string | null): string[] {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return [];
  }

  return sanitized
    .split(/[,\r\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveRelativeDate(value?: string | null): string | undefined {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return undefined;
  }

  const currentMatch = sanitized.match(/^current([+-]\d+)$/i);
  if (!currentMatch) {
    return sanitized;
  }

  const offset = Number(currentMatch[1]);
  if (!Number.isFinite(offset)) {
    return sanitized;
  }

  const date = new Date();
  date.setDate(date.getDate() + offset);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}/${day}/${year}`;
}

function convertAudienceMacros(template?: string | null, testCaseName?: string | null): string | undefined {
  const sanitized = sanitizeValue(template);
  if (!sanitized) {
    return undefined;
  }

  const now = new Date();
  const hours24 = now.getHours();
  const hours12 = ((hours24 + 11) % 12) + 1;
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(hours12).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${meridiem}`;

  return sanitized
    .replace(/\(ReleaseName\)/g, config.releaseName || '')
    .replace(/\(TimeStamp\)/g, timestamp)
    .replace(/\(TestScenario\/TestCase\)/g, sanitizeValue(testCaseName) || '');
}

function parseAudienceRange(rawValue?: string): { start: number; end: number } | undefined {
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

export function getSelectedAudienceObjectIdsFromEnv(): string[] {
  const explicitIds = config.audienceDbIds;
  if (explicitIds.length > 0) {
    return explicitIds;
  }

  const singleId = config.audienceDbId;
  return singleId ? [singleId] : [];
}

export function loadAudienceCaseSummaries(objectIds = getSelectedAudienceObjectIdsFromEnv()): AudienceCaseSummary[] {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const filters: string[] = [];
  const selectedRange = parseAudienceRange(config.audienceDbRange);

  if (ids.length > 0) {
    filters.push(`a.id in (${ids.map((id) => sqlLiteral(id)).join(', ')})`);
  }

  const whereClause = `where ${filters.join(' and ')}`;
  const rangeClause = selectedRange ? `where selected."rowNumber" between ${selectedRange.start} and ${selectedRange.end}` : '';

  const query = `
    select
      selected.id,
      selected."testCaseName",
      selected."audienceAction",
      selected."segmentType"
    from (
      select
        a.id,
        a.test_case_name as "testCaseName",
        a.audience_action as "audienceAction",
        a.segment_activation_type as "segmentType",
        row_number() over (order by a.id::int) as "rowNumber"
      from audiences_suite a
      ${whereClause}
    ) selected
    ${rangeClause}
    order by selected."rowNumber"
  `;

  return queryJson<AudienceCaseSummary[]>(query);
}

export function buildAudienceCaseSelectionError(objectIds = getSelectedAudienceObjectIdsFromEnv()): string {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const selectedRange = parseAudienceRange(config.audienceDbRange);
  const activeRange = config.audienceDbRange;
  const activeIds = config.audienceDbIds;
  const activeObjectId = config.audienceDbId;
  const filterSummary = [
    `id=${activeObjectId || '<unset>'}`,
    `ids=${activeIds.length > 0 ? activeIds.join(',') : '<unset>'}`,
    `range=${activeRange || '<unset>'}`
  ].join(', ');

  let idDetails = '';
  if (ids.length > 0) {
    const requestedRows = queryJson<AudienceCaseSummary[]>(`
      select
        a.id,
        a.test_case_name as "testCaseName",
        a.audience_action as "audienceAction",
        a.segment_activation_type as "segmentType"
      from audiences_suite a
      where a.id in (${ids.map((id) => sqlLiteral(id)).join(', ')})
      order by a.id::int
    `);

    if (requestedRows.length === 0) {
      idDetails = ` Requested IDs were: ${ids.join(', ')}; none exist in audiences_suite.`;
    } else {
      const requestedSummary = requestedRows
        .map((row) => `${row.id}:${row.segmentType || '<unset>'}/${row.audienceAction || '<unset>'}`)
        .join(', ');
      idDetails = ` Requested IDs resolved to: ${requestedSummary}.`;
    }
  }

  let rangeDetails = '';
  if (selectedRange) {
    const rangedRows = queryJson<Array<AudienceCaseSummary & { rowNumber: number }>>(`
      select
        selected.id,
        selected."testCaseName",
        selected."audienceAction",
        selected."segmentType",
        selected."rowNumber"
      from (
        select
          a.id,
          a.test_case_name as "testCaseName",
          a.audience_action as "audienceAction",
          a.segment_activation_type as "segmentType",
          row_number() over (order by a.id::int) as "rowNumber"
        from audiences_suite a
      ) selected
      where selected."rowNumber" between ${selectedRange.start} and ${selectedRange.end}
      order by selected."rowNumber"
    `);

    if (rangedRows.length === 0) {
      rangeDetails = ` Positional range ${selectedRange.start}-${selectedRange.end} returned no rows.`;
    } else {
      rangeDetails = ` Positional range ${selectedRange.start}-${selectedRange.end} resolved to IDs: ${rangedRows
        .map((row) => row.id)
        .join(', ')}.`;
    }
  }

  const sampleMatches = queryJson<AudienceCaseSummary[]>(`
    select
      a.id,
      a.test_case_name as "testCaseName",
      a.audience_action as "audienceAction",
      a.segment_activation_type as "segmentType"
    from audiences_suite a
    order by a.id::int
    limit 10
  `);

  const sampleSummary =
    sampleMatches.length > 0
      ? ` First available IDs: ${sampleMatches.map((row) => row.id).join(', ')}.`
      : ' No rows exist in audiences_suite.';

  return `No audience rows matched the current selectors/filters. Active filters: ${filterSummary}.${idDetails}${rangeDetails}${sampleSummary}`;
}

export function loadAudienceCaseData(): AudienceDbRow | null {
  const cacheKey = currentCacheKey();
  if (cachedKey === cacheKey) {
    return cachedRow;
  }

  const id = config.audienceDbId;
  const testCaseName = config.audienceDbTestCaseName;
  const filters: string[] = [];

  if (testCaseName) {
    filters.push(`a.test_case_name = ${sqlLiteral(testCaseName)}`);
  } else if (id) {
    filters.push(`a.id = ${sqlLiteral(id)}`);
  } else {
    throw new Error(
      'Missing audience DB selector. Set ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME in .env.'
    );
  }

  const query = `
    with selected as (
      select
        a.id,
        a.test_case_name,
        ${getAudienceTableColumns().has('username') ? 'a.username' : 'null::text'} as username,
        ${getAudienceTableColumns().has('password') ? 'a.password' : 'null::text'} as password,
        ${getAudienceTableColumns().has('impersonate_user_profile') ? 'a.impersonate_user_profile' : 'null::text'} as impersonate_user_profile,
        a.audience_action,
        a.segment_activation_type,
        a.activation_type,
        a.email_type,
        a.hash_type,
        a.advertiser,
        a.file_name,
        a.file_contains_header_row,
        a.primary_dimensions,
        a.filter_criteria,
        a.match_criterias_by_type,
        a.match_criteria_target,
        a.bulk_import,
        a.bulk_import_file_type,
        a.bulk_import_file_name,
        a.alert_messages_match_criteria,
        a.segment_name,
        a.expiration_date,
        a.activation_source,
        a.primary_address_only,
        a.is_draft_segment,
        a.object_id,
        a.existing_segment_name
      from audiences_suite a
      where ${filters.join(' and ')}
    )
    select
      selected.*
    from selected
    order by selected.id
    limit 1
  `;

  cachedRow = querySingleJson<AudienceDbRow>(query);
  cachedKey = cacheKey;
  return cachedRow;
}

export function requireAudienceFlowValues(): {
  username?: string;
  password?: string;
  impersonateUserProfile?: string;
  audienceAction: 'create' | 'edit';
  segmentType?: string;
  isDraftSegment: boolean;
  objectId?: string;
  existingSegmentName?: string;
} {
  const row = loadAudienceCaseData();
  if (!row) {
    throw new Error(
      'No audiences_suite row matched the current selection. Override ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  const normalizedAction = sanitizeValue(row.audience_action)?.toLowerCase();
  const audienceAction = normalizedAction === 'edit' ? 'edit' : 'create';

  return {
    username: sanitizeValue(row.username),
    password: sanitizeValue(row.password),
    impersonateUserProfile: sanitizeValue(row.impersonate_user_profile),
    audienceAction,
    segmentType: sanitizeValue(row.segment_activation_type) || '1st Party Data',
    isDraftSegment: sanitizeValue(row.is_draft_segment)?.toLowerCase() === 'yes',
    objectId: sanitizeValue(String(row.object_id ?? '')),
    existingSegmentName: sanitizeValue(row.existing_segment_name)
  };
}

export function requireAudienceMatchCriteriaValues(): {
  segmentType?: string;
  activationType?: string;
  activationSubtype?: string;
  emailType?: string;
  hashType?: string;
  advertiser?: string;
  filePath?: string;
  fileContainsHeaderRow?: 'checked' | 'unchecked';
  primaryDimensions: string[];
  filterCriteria?: string;
} {
  const row = loadAudienceCaseData();
  if (!row) {
    throw new Error(
      'No audiences_suite row matched the current selection. Override ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  const parsedActivation = parseActivationType(row.activation_type);

  return {
    segmentType: sanitizeValue(row.segment_activation_type) || '1st Party Data',
    activationType: parsedActivation.activationType || resolveFirstPartySubtype(row.file_name),
    activationSubtype: sanitizeValue(row.activation_type)?.split(':').slice(1).join(':').trim() || undefined,
    emailType: sanitizeValue(row.email_type) || parsedActivation.emailType,
    hashType: sanitizeValue(row.hash_type),
    advertiser: sanitizeValue(row.advertiser),
    filePath: resolveImportFile(row.file_name),
    fileContainsHeaderRow:
      sanitizeValue(row.file_contains_header_row)?.toLowerCase() === 'checked'
        ? 'checked'
        : sanitizeValue(row.file_contains_header_row)?.toLowerCase() === 'unchecked'
          ? 'unchecked'
          : undefined,
    primaryDimensions: parseLineSeparatedValues(row.primary_dimensions),
    filterCriteria: sanitizeValue(row.filter_criteria)
  };
}

export function requireAudienceBusinessDataValues(): {
  criteria: Array<{
    id: string;
    criteriaType?: string;
    value?: string;
    cardGroup?: string;
    cardText?: string;
  }>;
  targetMode: 'all' | 'any';
  bulkImportMode?: 'active' | 'inactive';
  bulkImportFileType?: string;
  bulkImportFilePath?: string;
} {
  const row = loadAudienceCaseData();
  if (!row) {
    throw new Error(
      'No audiences_suite row matched the current selection. Override ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  const criterionIds = [...new Set(parseDelimitedValues(row.match_criterias_by_type))];
  const criteriaRows =
    criterionIds.length > 0
      ? queryJson<AudienceMatchCriteriaRow[]>(`
          select
            amc.id::text as id,
            amc."CriteriaType" as "criteriaType",
            amc."Value" as "value",
            amc."CardGroup" as "cardGroup",
            amc."CardText" as "cardText"
          from audience_matchcriteria amc
          where amc.id in (${criterionIds.map((id) => sqlLiteral(id)).join(', ')})
          order by amc.id::int
        `)
      : [];

  const criteriaById = new Map(criteriaRows.map((item) => [item.id, item]));
  const criteria = criterionIds.map((id) => {
    const match = criteriaById.get(id);
    return {
      id,
      criteriaType: sanitizeValue(match?.criteriaType),
      value: sanitizeValue(match?.value),
      cardGroup: sanitizeValue(match?.cardGroup),
      cardText: sanitizeValue(match?.cardText)
    };
  });

  const bulkImportMode = sanitizeValue(row.bulk_import)?.toLowerCase();

  return {
    criteria,
    targetMode: (sanitizeValue(row.match_criteria_target)?.toLowerCase() || 'any').includes('all') ? 'all' : 'any',
    bulkImportMode:
      bulkImportMode === 'active' ? 'active' : bulkImportMode === 'inactive' || bulkImportMode === 'inctive' ? 'inactive' : undefined,
    bulkImportFileType: sanitizeValue(row.bulk_import_file_type),
    bulkImportFilePath: resolveImportFile(row.bulk_import_file_name)
  };
}

export function requireAudienceSaveSettingsValues(): {
  segmentName?: string;
  expirationDate?: string;
  activationSource?: string;
  primaryAddressOnly?: 'checked' | 'unchecked';
} {
  const row = loadAudienceCaseData();
  if (!row) {
    throw new Error(
      'No audiences_suite row matched the current selection. Override ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  const primaryAddressOnly = sanitizeValue(row.primary_address_only)?.toLowerCase();

  return {
    segmentName: convertAudienceMacros(row.segment_name, row.test_case_name),
    expirationDate: resolveRelativeDate(row.expiration_date),
    activationSource: sanitizeValue(row.activation_source),
    primaryAddressOnly:
      primaryAddressOnly === 'checked' ? 'checked' : primaryAddressOnly === 'unchecked' ? 'unchecked' : undefined
  };
}

export function requireAudienceFilterTargetValues(): { targetMode: 'all' | 'any' } {
  const row = loadAudienceCaseData();
  if (!row) {
    throw new Error(
      'No audiences_suite row matched the current selection. Override ADDAPTIVE_AUDIENCE_DB_ID or ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME if you need a different row.'
    );
  }

  const target = sanitizeValue(row.match_criteria_target)?.toLowerCase() || 'any';
  return {
    targetMode: target.includes('all') ? 'all' : 'any'
  };
}
