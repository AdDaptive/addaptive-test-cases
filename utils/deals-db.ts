import { queryJson, querySingleJson, sqlLiteral } from './db-config';
import { config } from './config';

type DealsDbRow = {
  id: number;
  objectId: string | null;
  advertiserName: string | null;
  campaignName: string | null;
  kpiObjectives: string | null;
  productsOfInterest: string | null;
  targetAudience: string | null;
  geoTargeting: string | null;
  subdeals: string | null;
  completeDealStage: string | null;
  completeDealSource: string | null;
  completeDealViewabilityPartner: string | null;
  completeDealB2BAnalytics: string | null;
  completeDealAccountNotes: string | null;
  completeDealCanAMtargetOutsideOfABMList: string | null;
  billingDetailsCopyFromClient: string | null;
  contactDetailsCopyFromClient: string | null;
  attachments: string | null;
  inflightSubDealDescription: string | null;
  dealType: string | null;
  dsp: string | null;
  buyerSeatId: string | null;
  priceModel: string | null;
  billingProfile: string | null;
  client: string | null;
  retentionStatus: string | null;
  revenueSplits: string | null;
  clientRelationship: string | null;
  contacts: string | null;
  kpiNotes: string | null;
  closedWonBillingProfile: string | null;
  closedWonContactDetails: string | null;
  salesPerson: string | null;
  revOpsPerson: string | null;
  'CMS Person': string | null;
};

type ClientCreateRow = {
  id: number;
  objectId: string | null;
  clientName: string | null;
  permissionGroup: string | null;
  type: string | null;
  salesforceAccountID: string | null;
  target: string | null;
  showDunsNumberOrAnalyticsReport: string | null;
};

type BillingProfileRow = {
  id: number;
  objectId: string | null;
  billingName: string | null;
  billingPhoneNumber: string | null;
  billingEmail: string | null;
  billingAddressLineOne: string | null;
  billingAddressLineTwo: string | null;
  billingState: string | null;
  billingCity: string | null;
  billingZipCode: string | null;
};

type DealAttachmentRow = {
  id: number;
  objectId: string | null;
  Category: string | null;
  NameDescription: string | null;
  FileName: string | null;
};

type SubdealRow = {
  id: number;
  objectId: string | null;
  subDealStartDate: string | null;
  subDealEndDate: string | null;
  subDealDescription: string | null;
  subDealImpressionGoal: string | null;
  subDealCPM: string | null;
  subDealCategory: string | null;
  subDealMediaType: string | null;
  subDealGeoTargeting: string | null;
  curateLineItemId: string | null;
  quotedCPM: string | null;
  nonBillableType: string | null;
  revenueSplits: string | null;
  order: string | null;
  pmpExpectedBudget: string | null;
};

export type DealsCaseSummary = {
  objectId: string;
  advertiserName?: string;
  campaignName?: string;
};

export type DealsContact = {
  name: string;
  email: string;
};

export type DealsCreationFlowValues = {
  objectId: string;
  useExistingClient: boolean;
  clientName: string;
  clientPermissionGroup?: string;
  clientType?: string;
  clientSalesforceAccountId?: string;
  clientTarget?: string;
  clientShowDunsNumberOrAnalyticsReport?: string;
  advertiserName: string;
  campaignName: string;
  kpiObjectives: string[];
  productsOfInterest: string[];
  targetAudience?: string;
  geoTargeting?: string;
  dealType?: string;
  dsp?: string;
  buyerSeatId?: string;
  priceModel?: string;
  retentionStatus?: string;
  clientRelationship?: string;
  salesPerson?: string;
  revOpsPerson?: string;
  contacts: DealsContact[];
  kpiNotes?: string;
  completeDealStage: string;
  completeDealStatus: string;
  completeDealSource: string;
  completeDealViewabilityPartner: string;
  completeDealB2BAnalytics: string[];
  completeDealAccountNotes?: string;
  completeDealCanAMtargetOutsideOfABMList: boolean;
  billingDetailsCopyFromClient?: string;
  contactDetailsCopyFromClient?: string;
  inflightSubDealDescription?: string;
  billingProfile?: BillingProfileRow;
  closedWonBillingProfile?: BillingProfileRow;
  attachments: Array<{
    category: string;
    nameDescription: string;
    fileName: string;
  }>;
  subdeals: SubdealRow[];
};

let cachedKey: string | null = null;
let cachedRow: DealsDbRow | null = null;

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

function currentCacheKey(): string {
  return JSON.stringify({
    objectId: config.dealsDbObjectId || null,
    testCaseName: config.dealsDbTestCaseName || null
  });
}

function isReferenceToken(value?: string): boolean {
  return !!value && /^[*!#]/.test(value);
}

function extractReferenceId(value?: string): string | undefined {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return undefined;
  }

  const match = sanitized.match(/^[*!#]:\s*(\d+)/);
  return match?.[1];
}

function extractNumericTokens(value?: string | null): string[] {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return [];
  }

  return sanitized
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .map((item) => {
      const refMatch = item.match(/^[*!#]:\s*(\d+)/);
      if (refMatch) {
        return refMatch[1];
      }

      const directMatch = item.match(/^(\d+)$/);
      return directMatch?.[1];
    })
    .filter((item): item is string => !!item);
}

function extractConcreteSubdealIds(value?: string | null): string[] {
  const sanitized = sanitizeValue(value);
  if (!sanitized) {
    return [];
  }

  return sanitized
    .split('\n')
    .map((item) => item.trim())
    .map((item) => {
      if (item.startsWith('*')) {
        return undefined;
      }

      const refMatch = item.match(/^[!#]?:?\s*(\d+)/);
      return refMatch?.[1];
    })
    .filter((item): item is string => !!item);
}

function toCadenceLabel(value: string): string {
  switch (value.trim().toLowerCase()) {
    case 'bi-weekly':
      return 'Bi-Weekly';
    case 'end of campaign':
      return 'End of Campaign';
    default:
      return value
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
  }
}

function parseContacts(value?: string | null): DealsContact[] {
  return parseMultiLine(value)
    .map((entry) => {
      const [namePart, emailPart] = entry.split(':');
      const name = sanitizeValue(namePart);
      const email = sanitizeValue(emailPart);
      if (!name || !email) {
        return null;
      }

      return { name, email };
    })
    .filter((entry): entry is DealsContact => !!entry);
}

function resolveClientCreateRow(referenceValue?: string): ClientCreateRow | null {
  const refId = extractReferenceId(referenceValue);
  if (!refId) {
    return null;
  }

  return querySingleJson<ClientCreateRow>(`
    select
      c.id,
      c."objectId",
      c."clientName",
      c."permissionGroup",
      c.type,
      c."salesforceAccountID",
      c.target,
      c."showDunsNumberOrAnalyticsReport"
    from client_create c
    where c.id = ${sqlLiteral(refId)}
       or c."objectId" = ${sqlLiteral(refId)}
    order by c.id
    limit 1
  `);
}

function resolveBillingProfileRow(referenceValue?: string): BillingProfileRow | null {
  const refId = extractReferenceId(referenceValue);
  if (!refId) {
    return null;
  }

  return querySingleJson<BillingProfileRow>(`
    select
      b.id,
      b."objectId",
      b."billingName",
      b."billingPhoneNumber",
      b."billingEmail",
      b."billingAddressLineOne",
      b."billingAddressLineTwo",
      b."billingState",
      b."billingCity",
      b."billingZipCode"
    from billing_profile b
    where b.id = ${sqlLiteral(refId)}
       or b."objectId" = ${sqlLiteral(refId)}
    order by b.id
    limit 1
  `);
}

function resolveAttachmentRows(referenceValue?: string | null): DealAttachmentRow[] {
  const ids = extractNumericTokens(referenceValue);
  if (ids.length === 0) {
    return [];
  }

  return queryJson<DealAttachmentRow[]>(`
    select
      a.id,
      a."objectId",
      a."Category",
      a."NameDescription",
      a."FileName"
    from deal_attachments a
    where a.id in (${ids.map((id) => sqlLiteral(id)).join(', ')})
       or a."objectId" in (${ids.map((id) => sqlLiteral(id)).join(', ')})
    order by a.id
  `);
}

function resolveSubdealRows(referenceValue?: string | null): SubdealRow[] {
  const ids = extractConcreteSubdealIds(referenceValue);
  if (ids.length === 0) {
    return [];
  }

  return queryJson<SubdealRow[]>(`
    select
      s.id,
      s."objectId",
      s."subDealStartDate",
      s."subDealEndDate",
      s."subDealDescription",
      s."subDealImpressionGoal",
      s."subDealCPM",
      s."subDealCategory",
      s."subDealMediaType",
      s."subDealGeoTargeting",
      s."curateLineItemId",
      s."quotedCPM",
      s."nonBillableType",
      s."revenueSplits",
      s."order",
      s."pmpExpectedBudget"
    from subdeals_table s
    where s.id in (${ids.map((id) => sqlLiteral(id)).join(', ')})
       or s."objectId" in (${ids.map((id) => sqlLiteral(id)).join(', ')})
    order by s.id
  `);
}

export function getSelectedDealsObjectIdsFromEnv(): string[] {
  const explicitIds = config.dealsDbIds;
  if (explicitIds.length > 0) {
    return explicitIds;
  }

  const singleId = config.dealsDbObjectId;
  return singleId ? [singleId] : [];
}

export function loadDealsCaseSummaries(objectIds = getSelectedDealsObjectIdsFromEnv()): DealsCaseSummary[] {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const range = parseRange(config.dealsDbRange);
  const filters = [`nullif(dt."objectId", '') is not null`];

  if (ids.length > 0) {
    filters.push(`dt."objectId" in (${ids.map((id) => sqlLiteral(id)).join(', ')})`);
  }

  const whereClause = filters.length > 0 ? `where ${filters.join(' and ')}` : '';
  const rangeClause = range ? `where selected."rowNumber" between ${range.start} and ${range.end}` : '';

  return queryJson<DealsCaseSummary[]>(`
    select
      selected."objectId",
      selected."advertiserName",
      selected."campaignName"
    from (
      select
        dt."objectId" as "objectId",
        dt."advertiserName" as "advertiserName",
        dt."campaignName" as "campaignName",
        row_number() over (order by dt."objectId"::int) as "rowNumber"
      from deals_table dt
      ${whereClause}
    ) selected
    ${rangeClause}
    order by selected."rowNumber"
  `);
}

export function buildDealsCaseSelectionError(objectIds = getSelectedDealsObjectIdsFromEnv()): string {
  const ids = [...new Set(objectIds.map((item) => item.trim()).filter(Boolean))];
  const activeRange = config.dealsDbRange;
  const activeObjectId = config.dealsDbObjectId;
  const activeIds = config.dealsDbIds;
  const filterSummary = [
    `objectId=${activeObjectId || '<unset>'}`,
    `ids=${activeIds.length > 0 ? activeIds.join(',') : '<unset>'}`,
    `range=${activeRange || '<unset>'}`
  ].join(', ');

  let idDetails = '';
  if (ids.length > 0) {
    const requestedRows = queryJson<DealsCaseSummary[]>(`
      select
        dt."objectId" as "objectId",
        dt."advertiserName" as "advertiserName",
        dt."campaignName" as "campaignName"
      from deals_table dt
      where dt."objectId" in (${ids.map((id) => sqlLiteral(id)).join(', ')})
      order by dt."objectId"::int
    `);

    if (requestedRows.length === 0) {
      idDetails = ` Requested IDs were: ${ids.join(', ')}; none exist in deals_table.`;
    } else {
      idDetails = ` Requested IDs resolved to: ${requestedRows.map((row) => row.objectId).join(', ')}.`;
    }
  }

  return `No deals_table rows matched the current selectors/filters. Active filters: ${filterSummary}.${idDetails}`;
}

export function loadDealsCaseData(): DealsDbRow | null {
  const cacheKey = currentCacheKey();
  if (cachedKey === cacheKey) {
    return cachedRow;
  }

  const objectId = config.dealsDbObjectId;
  const testCaseName = config.dealsDbTestCaseName;

  if (!objectId && !testCaseName) {
    cachedKey = cacheKey;
    cachedRow = null;
    return cachedRow;
  }

  const filters = [`nullif(dt."objectId", '') is not null`];
  if (objectId) {
    filters.push(`dt."objectId" = ${sqlLiteral(objectId)}`);
  } else if (testCaseName) {
    filters.push(`dt."campaignName" = ${sqlLiteral(testCaseName)}`);
  }

  cachedRow = querySingleJson<DealsDbRow>(`
    select
      dt.id,
      dt."objectId",
      dt."advertiserName",
      dt."campaignName",
      dt."kpiObjectives",
      dt."productsOfInterest",
      dt."targetAudience",
      dt."geoTargeting",
      dt.subdeals,
      dt."completeDealStage",
      dt."completeDealSource",
      dt."completeDealViewabilityPartner",
      dt."completeDealB2BAnalytics",
      dt."completeDealAccountNotes",
      dt."completeDealCanAMtargetOutsideOfABMList",
      dt."billingDetailsCopyFromClient",
      dt."contactDetailsCopyFromClient",
      dt.attachments,
      dt."inflightSubDealDescription",
      dt."dealType",
      dt.dsp,
      dt."buyerSeatId",
      dt."priceModel",
      dt."billingProfile",
      dt.client,
      dt."retentionStatus",
      dt."revenueSplits",
      dt."clientRelationship",
      dt.contacts,
      dt."kpiNotes",
      dt."closedWonBillingProfile",
      dt."closedWonContactDetails",
      dt."salesPerson",
      dt."revOpsPerson",
      dt."CMS Person"
    from deals_table dt
    where ${filters.join(' and ')}
    limit 1
  `);
  cachedKey = cacheKey;
  return cachedRow;
}

export function requireDealsCaseData(): DealsDbRow {
  const row = loadDealsCaseData();
  if (!row) {
    throw new Error('Failed to load deal-creation flow values from deals_table.');
  }
  return row;
}

export function requireDealsCreationFlowValues(): DealsCreationFlowValues {
  const row = requireDealsCaseData();
  const objectId = sanitizeValue(row.objectId);
  if (!objectId) {
    throw new Error('Deal-creation flow requires a non-empty deals_table.objectId value.');
  }

  const advertiserName = sanitizeValue(row.advertiserName);
  if (!advertiserName) {
    throw new Error(`Deal-creation flow ${objectId} requires deals_table.advertiserName.`);
  }

  const campaignName = sanitizeValue(row.campaignName);
  if (!campaignName) {
    throw new Error(`Deal-creation flow ${objectId} requires deals_table.campaignName.`);
  }

  const clientRow = resolveClientCreateRow(row.client);
  if (!clientRow?.clientName) {
    throw new Error(
      `Deal-creation flow ${objectId} could not resolve deals_table.client="${sanitizeValue(row.client) || ''}" through client_create.`
    );
  }

  const subdealRows = resolveSubdealRows(row.subdeals);
  if (subdealRows.length === 0) {
    throw new Error(
      `Deal-creation flow ${objectId} could not resolve any subdeals from deals_table.subdeals="${sanitizeValue(row.subdeals) || ''}".`
    );
  }

  const attachmentRows = resolveAttachmentRows(row.attachments);
  if (sanitizeValue(row.attachments) && attachmentRows.length === 0) {
    throw new Error(
      `Deal-creation flow ${objectId} could not resolve any attachments from deals_table.attachments="${sanitizeValue(row.attachments) || ''}".`
    );
  }

  const billingProfileRow = resolveBillingProfileRow(row.billingProfile);
  if (sanitizeValue(row.billingProfile) && !billingProfileRow) {
    throw new Error(
      `Deal-creation flow ${objectId} could not resolve deals_table.billingProfile="${sanitizeValue(row.billingProfile) || ''}" through billing_profile.`
    );
  }

  const closedWonBillingProfileRow = resolveBillingProfileRow(row.closedWonBillingProfile);
  if (sanitizeValue(row.closedWonBillingProfile) && !closedWonBillingProfileRow) {
    throw new Error(
      `Deal-creation flow ${objectId} could not resolve deals_table.closedWonBillingProfile="${sanitizeValue(row.closedWonBillingProfile) || ''}" through billing_profile.`
    );
  }

  const kpiObjectives = parseMultiLine(row.kpiObjectives);
  const productsOfInterest = parseMultiLine(row.productsOfInterest);
  const cadenceValues = parseMultiLine(row.completeDealB2BAnalytics).map(toCadenceLabel);

  if (cadenceValues.length === 0) {
    throw new Error(`Deal-creation flow ${objectId} requires deals_table.completeDealB2BAnalytics.`);
  }

  return {
    objectId,
    useExistingClient: (sanitizeValue(row.client) || '').startsWith('!'),
    clientName: clientRow.clientName,
    clientPermissionGroup: sanitizeValue(clientRow.permissionGroup),
    clientType: sanitizeValue(clientRow.type),
    clientSalesforceAccountId: sanitizeValue(clientRow.salesforceAccountID),
    clientTarget: sanitizeValue(clientRow.target),
    clientShowDunsNumberOrAnalyticsReport: sanitizeValue(clientRow.showDunsNumberOrAnalyticsReport),
    advertiserName,
    campaignName,
    kpiObjectives,
    productsOfInterest,
    targetAudience: sanitizeValue(row.targetAudience),
    geoTargeting: sanitizeValue(row.geoTargeting),
    dealType: sanitizeValue(row.dealType),
    dsp: sanitizeValue(row.dsp),
    buyerSeatId: sanitizeValue(row.buyerSeatId),
    priceModel: sanitizeValue(row.priceModel),
    retentionStatus: sanitizeValue(row.retentionStatus),
    clientRelationship: sanitizeValue(row.clientRelationship),
    salesPerson: sanitizeValue(row.salesPerson),
    revOpsPerson: sanitizeValue(row.revOpsPerson),
    contacts: parseContacts(row.contacts),
    kpiNotes: sanitizeValue(row.kpiNotes),
    completeDealStage: sanitizeValue(row.completeDealStage) || 'Closed Won',
    completeDealStatus: 'At Operations',
    completeDealSource: sanitizeValue(row.completeDealSource) || 'AdDaptive',
    completeDealViewabilityPartner: sanitizeValue(row.completeDealViewabilityPartner) || 'DoubleVerify',
    completeDealB2BAnalytics: cadenceValues,
    completeDealAccountNotes: sanitizeValue(row.completeDealAccountNotes),
    completeDealCanAMtargetOutsideOfABMList:
      (sanitizeValue(row.completeDealCanAMtargetOutsideOfABMList) || '').toLowerCase() === 'checked',
    billingDetailsCopyFromClient: sanitizeValue(row.billingDetailsCopyFromClient),
    contactDetailsCopyFromClient: sanitizeValue(row.contactDetailsCopyFromClient),
    inflightSubDealDescription: sanitizeValue(row.inflightSubDealDescription),
    billingProfile: billingProfileRow || undefined,
    closedWonBillingProfile: closedWonBillingProfileRow || undefined,
    attachments: attachmentRows
      .map((item) => {
        const category = sanitizeValue(item.Category);
        const nameDescription = sanitizeValue(item.NameDescription);
        const fileName = sanitizeValue(item.FileName);
        if (!category || !nameDescription || !fileName) {
          return null;
        }

        return { category, nameDescription, fileName };
      })
      .filter((item): item is { category: string; nameDescription: string; fileName: string } => !!item),
    subdeals: subdealRows
  };
}
