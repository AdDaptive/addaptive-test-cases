import type { APIRequestContext } from '@playwright/test';
import type { Page } from '@playwright/test';
import { appendFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { extractSessionCookie, loginToBackendApi } from '../api/backend-auth';
import { katalonLocator } from '../locators/resolve';
import {
  loadOrderEntryCreativeRowsForCase,
  loadOrderEntryFlowValues,
  loadOrderEntryInventoryValues,
  loadOrderEntryObjectivesValues,
  loadOrderEntryBasicSetupValues,
  loadOrderEntryBudgetFlightValues
} from './order-entry-db';
import { config } from './config';
import { queryJson, sqlLiteral } from './db-config';

export type ValidationOperator = '=' | '!=' | 'IN' | 'NOT IN';

export type ValidationRule = {
  field: string;
  operator: ValidationOperator;
  path: string;
  value: unknown;
};

export type ValidationProvider = 'MEDIAMATH' | 'TRADEDESK';

export type ValidationQueueEntry = {
  version: 1;
  testCaseName: string;
  provider: ValidationProvider;
  orderId: string;
  objectType: 'orderId';
  loginUser: string;
  loginPassword: string;
  impersonateUserProfile?: string;
  validations: ValidationRule[];
};

type ValidationGenerationContext = {
  basicSetup: NonNullable<ReturnType<typeof loadOrderEntryBasicSetupValues>>;
  objectives: NonNullable<ReturnType<typeof loadOrderEntryObjectivesValues>>;
  budgetFlight: NonNullable<ReturnType<typeof loadOrderEntryBudgetFlightValues>>;
  inventory: NonNullable<ReturnType<typeof loadOrderEntryInventoryValues>>;
  flow: NonNullable<ReturnType<typeof loadOrderEntryFlowValues>>;
  creatives: ReturnType<typeof loadOrderEntryCreativeRowsForCase>;
};

type OrderApiObject = Record<string, unknown> & {
  status?: string;
  is_processed_readable?: string;
  line_item_id?: string | number | null;
  ap_line_item_id?: string | number | null;
};

type ProviderRuntime = {
  objectType: string;
  objectIdField: string;
  urlTemplate: string;
};

type PathToken =
  | { kind: 'property'; value: string }
  | { kind: 'index'; value: number }
  | { kind: 'wildcard' };

type MappingEntry = {
  provider: ValidationProvider;
  field: string;
  path: string;
  operator: ValidationOperator;
  transformKey?: string;
};

const DEFAULT_QUEUE_FILE_NAME = 'order-entry-validations.jsonl';

export function shouldGenerateOrderEntryValidations(adServer?: string): boolean {
  return config.orderEntryGenerateValidations && Boolean(resolveValidationProvider(adServer));
}

export function shouldRunOrderEntryValidations(): boolean {
  return config.orderEntryRunValidations;
}

export function shouldUseSerialValidationMode(): boolean {
  return shouldGenerateOrderEntryValidations(config.orderEntryAdServer) && shouldRunOrderEntryValidations();
}

export function resolveValidationQueueFilePath(): string {
  return config.orderEntryValidationQueueFile || join(tmpdir(), DEFAULT_QUEUE_FILE_NAME);
}

export async function clearValidationQueueFile(): Promise<void> {
  await rm(resolveValidationQueueFilePath(), { force: true });
}

export async function appendValidationQueueEntry(entry: ValidationQueueEntry): Promise<void> {
  const filePath = resolveValidationQueueFilePath();
  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(entry)}\n`, 'utf8');
}

export async function readValidationQueueEntries(): Promise<ValidationQueueEntry[]> {
  const filePath = resolveValidationQueueFilePath();
  const raw = await readFile(filePath, 'utf8').catch(() => '');
  if (!raw.trim()) {
    return [];
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as ValidationQueueEntry);
}

export async function writeValidationQueueEntries(entries: ValidationQueueEntry[]): Promise<void> {
  const filePath = resolveValidationQueueFilePath();
  if (entries.length === 0) {
    await clearValidationQueueFile();
    return;
  }

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${entries.map((entry) => JSON.stringify(entry)).join('\n')}\n`, 'utf8');
}

export function resolveValidationProvider(adServer?: string): ValidationProvider | undefined {
  const normalized = String(adServer || '').trim().toUpperCase();
  if (normalized === 'MEDIAMATH' || normalized === 'MEDIAMATH_GAM') {
    return 'MEDIAMATH';
  }
  if (normalized === 'TRADEDESK') {
    return 'TRADEDESK';
  }
  return undefined;
}

export function generateValidationRulesForCurrentCase(provider: ValidationProvider): ValidationRule[] {
  const basicSetup = loadOrderEntryBasicSetupValues();
  const objectives = loadOrderEntryObjectivesValues();
  const budgetFlight = loadOrderEntryBudgetFlightValues();
  const inventory = loadOrderEntryInventoryValues();
  const flow = loadOrderEntryFlowValues();
  const creatives = loadOrderEntryCreativeRowsForCase();

  if (!basicSetup || !objectives || !budgetFlight || !inventory || !flow) {
    throw new Error('Cannot generate validations without the selected order-entry case values.');
  }

  const context: ValidationGenerationContext = {
    basicSetup,
    objectives,
    budgetFlight,
    inventory,
    flow,
    creatives
  };

  const mappings = loadValidationMappings(provider);
  const rules = mappings
    .flatMap((mapping): ValidationRule[] => {
      const values = resolveFieldValues(context, mapping.field).flatMap((value) =>
        applyTransform(mapping.transformKey, value)
      );
      return values
        .filter((value) => value !== undefined && value !== null && value !== '')
        .map((value) => ({
          field: mapping.field,
          operator: mapping.operator,
          path: mapping.path,
          value
        }));
    });

  return dedupeValidationRules(rules);
}

export async function queueCurrentOrderEntryValidations(
  page: Page,
  options: {
    testCaseName: string;
    adServer?: string;
    lineItemName?: string;
  }
): Promise<ValidationQueueEntry | null> {
  const provider = resolveValidationProvider(options.adServer);
  if (!provider || !shouldGenerateOrderEntryValidations(options.adServer)) {
    return null;
  }

  const orderId = await resolveSubmittedOrderId(page, options.lineItemName);
  if (!orderId) {
    throw new Error('Submitted order validation is enabled, but no order id could be resolved after submit.');
  }

  const validations = generateValidationRulesForCurrentCase(provider);
  if (validations.length === 0) {
    return null;
  }

  const entry: ValidationQueueEntry = {
    version: 1,
    testCaseName: options.testCaseName,
    provider,
    orderId,
    objectType: 'orderId',
    loginUser: config.loginUser,
    loginPassword: config.loginPassword,
    impersonateUserProfile: loadOrderEntryFlowValues()?.impersonateUserProfile,
    validations
  };

  await appendValidationQueueEntry(entry);
  return entry;
}

export async function runQueuedOrderEntryValidations(request: APIRequestContext): Promise<void> {
  const entries = await readValidationQueueEntries();
  if (entries.length === 0) {
    return;
  }

  const pending: ValidationQueueEntry[] = [...entries];
  const reprocess: ValidationQueueEntry[] = [];
  let attempt = 0;
  const maxAttempts = config.orderEntryValidationRetryAttempts;

  while (pending.length > 0) {
    const entry = pending.shift()!;
    const result = await validateQueueEntry(request, entry);
    if (result === 'retry') {
      reprocess.push(entry);
    }

    if (pending.length === 0 && reprocess.length > 0) {
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw new Error(`Queued order validations never became ready after ${maxAttempts} attempts.`);
      }
      await wait(config.orderEntryValidationRetryDelayMs);
      pending.push(...reprocess.splice(0, reprocess.length));
    }
  }

  await clearValidationQueueFile();
}

export async function validateQueueEntry(
  request: APIRequestContext,
  entry: ValidationQueueEntry
): Promise<'validated' | 'retry'> {
  const sessionCookie = await createBackendSessionCookie(request, entry);
  const orderObject = await getOrderById(request, entry.orderId, sessionCookie);
  const status = String(orderObject.is_processed_readable || '').trim().toLowerCase();
  const orderStatus = String(orderObject.status || '').trim().toLowerCase();

  if ((orderStatus !== 'active' && status !== 'complete_inactive') || !['complete', 'complete_inactive'].includes(status)) {
    return 'retry';
  }

  const providerRuntime = resolveProviderRuntime(entry.provider);
  const providerObjectId =
    readField(orderObject, providerRuntime.objectIdField) ??
    readField(orderObject, 'line_item_id') ??
    readField(orderObject, 'ap_line_item_id') ??
    entry.orderId;

  const providerPayload = await getProviderObject(
    request,
    entry.provider,
    sessionCookie,
    String(providerObjectId),
    providerRuntime.objectType
  );

  for (const validation of entry.validations) {
    const passed = evaluateValidationRule(providerPayload, validation);
    if (!passed) {
      throw new Error(
        `Validation failed for ${entry.provider} order ${entry.orderId}: field=${validation.field} path=${validation.path} operator=${validation.operator} expected=${JSON.stringify(validation.value)}`
      );
    }
  }

  return 'validated';
}

export function evaluateValidationRule(payload: unknown, validation: ValidationRule): boolean {
  const values = evaluatePath(payload, validation.path);
  if (values.length === 0) {
    throw new Error(`Could not find path ${validation.path}`);
  }

  if (validation.operator === 'IN') {
    return values.some((value) => compareValues(value, validation.value));
  }

  if (validation.operator === 'NOT IN') {
    return values.every((value) => !compareValues(value, validation.value));
  }

  if (values.length === 1) {
    return validation.operator === '='
      ? compareValues(values[0], validation.value)
      : !compareValues(values[0], validation.value);
  }

  const anyMatch = values.some((value) => compareValues(value, validation.value));
  return validation.operator === '=' ? anyMatch : !anyMatch;
}

export async function resolveSubmittedOrderId(page: Page, lineItemName?: string): Promise<string | undefined> {
  const directFromUrl = extractOrderIdFromText(page.url());
  if (directFromUrl) {
    return directFromUrl;
  }

  const exactLink = lineItemName
    ? katalonLocator(page, 'Object Repository/Frontend/Order-Entry/li_name', { headerText: lineItemName })
    : null;

  if (exactLink) {
    await exactLink.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined);
    const href = await exactLink.getAttribute('href').catch(() => null);
    const hrefOrderId = extractOrderIdFromText(href || '');
    if (hrefOrderId) {
      return hrefOrderId;
    }
  }

  const partialLink = lineItemName
    ? page.locator(`a[href*="/orders/"]`).filter({ hasText: lineItemName }).first()
    : page.locator(`a[href*="/orders/"]`).first();
  await partialLink.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined);
  const href = await partialLink.getAttribute('href').catch(() => null);
  return extractOrderIdFromText(href || '');
}

function extractOrderIdFromText(value: string): string | undefined {
  const match = value.match(/\/orders\/(\d+)(?:\/|$)/i);
  return match?.[1];
}

async function createBackendSessionCookie(request: APIRequestContext, entry: ValidationQueueEntry): Promise<string> {
  const response = await loginToBackendApi(request, {
    baseUrl: config.backendUrl,
    username: entry.loginUser,
    password: entry.loginPassword
  });

  if (!response.ok()) {
    throw new Error(`Backend API login failed with status ${response.status()}.`);
  }

  let cookie = extractSessionCookie(response.headers()['set-cookie'] || null);
  if (!cookie) {
    throw new Error('Backend API login did not return a session cookie.');
  }

  if (entry.impersonateUserProfile) {
    const impersonateResponse = await request.get(
      `${config.backendUrl}/ng-api/v2/account/impersonate?email=${encodeURIComponent(entry.impersonateUserProfile)}`,
      {
        headers: {
          Cookie: cookie
        }
      }
    );

    if (!impersonateResponse.ok()) {
      throw new Error(`Backend impersonation failed with status ${impersonateResponse.status()}.`);
    }

    const impersonationCookie = extractSessionCookie(impersonateResponse.headers()['set-cookie'] || null);
    if (impersonationCookie) {
      cookie = impersonationCookie;
    }
  }

  return cookie;
}

async function getOrderById(request: APIRequestContext, orderId: string, cookie: string): Promise<OrderApiObject> {
  const response = await request.get(`${config.backendUrl}/ng-api/v2/order/${orderId}`, {
    headers: {
      Cookie: cookie,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok()) {
    throw new Error(`Get order by id failed with status ${response.status()} for order ${orderId}.`);
  }

  return (await response.json()) as OrderApiObject;
}

async function getProviderObject(
  request: APIRequestContext,
  provider: ValidationProvider,
  cookie: string,
  objectId: string,
  objectType: string
): Promise<unknown> {
  const runtime = resolveProviderRuntime(provider);
  const url = applyObjectViewerTemplate(runtime.urlTemplate, {
    objectId,
    objectType,
    baseUrl: config.backendUrl
  });

  const response = await request.get(url, {
    headers: {
      Cookie: cookie
    }
  });

  if (!response.ok()) {
    throw new Error(`${provider} object viewer request failed with status ${response.status()} for object ${objectId}.`);
  }

  return response.json();
}

function resolveProviderRuntime(provider: ValidationProvider): ProviderRuntime {
  if (provider === 'MEDIAMATH') {
    return {
      objectType: config.mediaMathObjectViewerObjectType || 'line_item',
      objectIdField: config.mediaMathObjectViewerIdField || 'line_item_id',
      urlTemplate:
        config.mediaMathObjectViewerUrlTemplate ||
        '{baseUrl}/ng-api/v2/account/mediamath-object-viewer-data?objectType={objectType}&id={objectId}'
    };
  }

  return {
    objectType: config.tradeDeskObjectViewerObjectType || 'line_item',
    objectIdField: config.tradeDeskObjectViewerIdField || 'line_item_id',
    urlTemplate:
      config.tradeDeskObjectViewerUrlTemplate ||
      '{baseUrl}/ng-api/v2/account/tradedesk-object-viewer-data?objectType={objectType}&id={objectId}'
  };
}

function loadValidationMappings(provider: ValidationProvider): MappingEntry[] {
  const table = config.orderEntryValidationMappingTable;
  const rows = queryJson<
    Array<{
      provider: string | null;
      field_name: string | null;
      path: string | null;
      operator: string | null;
      transform_key: string | null;
      enabled: boolean | null;
      sort_order: number | null;
    }>
  >(`
    select
      provider,
      field_name,
      path,
      operator,
      transform_key,
      enabled,
      sort_order
    from ${table}
    where enabled = true
      and upper(provider) = ${sqlLiteral(provider)}
    order by sort_order asc, id asc
  `);

  return rows
    .map((row) => ({
      provider,
      field: String(row.field_name || '').trim(),
      path: String(row.path || '').trim(),
      operator: normalizeOperator(row.operator),
      transformKey: String(row.transform_key || '').trim() || undefined
    }))
    .filter((row) => row.field && row.path);
}

function applyObjectViewerTemplate(
  template: string,
  values: { objectId: string; objectType: string; baseUrl: string }
): string {
  return template
    .replace(/\{baseUrl\}/g, values.baseUrl.replace(/\/$/, ''))
    .replace(/\{objectType\}/g, encodeURIComponent(values.objectType))
    .replace(/\{objectId\}/g, encodeURIComponent(values.objectId));
}

function readField(record: Record<string, unknown>, field: string): unknown {
  if (!field) {
    return undefined;
  }
  return record[field];
}

function dedupeValidationRules(rules: ValidationRule[]): ValidationRule[] {
  const seen = new Set<string>();
  return rules.filter((rule) => {
    const key = `${rule.field}|${rule.path}|${rule.operator}|${JSON.stringify(rule.value)}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeOperator(value: string | null): ValidationOperator {
  const normalized = String(value || '=').trim().toUpperCase();
  if (normalized === '!=' || normalized === 'IN' || normalized === 'NOT IN') {
    return normalized;
  }
  return '=';
}

function resolveFieldValues(context: ValidationGenerationContext, fieldName: string): unknown[] {
  switch (fieldName) {
    case 'objectivesGoal':
      return [context.objectives.objectivesGoal];
    case 'unitsValue':
      return [context.objectives.unitsValue];
    case 'startDate':
      return [context.budgetFlight.startDate];
    case 'endDate':
      return [context.budgetFlight.endDate];
    case 'impressionGoal':
      return [context.budgetFlight.impressionGoal];
    case 'cpmValue':
      return [context.budgetFlight.cpmValue];
    case 'frequencyCap':
      return [context.inventory.frequencyCap];
    case 'frequencyCapUnit':
      return [context.inventory.frequencyCapUnit];
    case 'creativeSize':
      return context.creatives.map((creative) => creative.size).filter(Boolean);
    case 'creativeType':
      return context.creatives.map((creative) => creative.type).filter(Boolean);
    case 'creativeName':
      return context.creatives.map((creative) => creative.name).filter(Boolean);
    case 'lineItemName':
      return [context.basicSetup.lineItemName];
    case 'campaignName':
      return [context.basicSetup.campaignName];
    case 'ioName':
      return [context.basicSetup.ioName];
    case 'advertiser':
      return [context.basicSetup.advertiser];
    default:
      return [];
  }
}

function applyTransform(transformKey: string | undefined, value: unknown): unknown[] {
  if (value === undefined || value === null || value === '') {
    return [];
  }

  switch ((transformKey || '').trim().toLowerCase()) {
    case '':
      return [value];
    case 'number': {
      const numberValue = toNumber(String(value));
      return numberValue === undefined ? [] : [numberValue];
    }
    case 'date': {
      const normalized = normalizeDateComparable(String(value));
      return normalized ? [normalized] : [String(value)];
    }
    case 'mediamath_goal_type': {
      const normalized = normalizeMediaMathGoalType(String(value));
      return normalized ? [normalized] : [];
    }
    case 'mediamath_frequency_unit': {
      const normalized = normalizeMediaMathFrequencyUnit(String(value));
      return normalized ? [normalized] : [];
    }
    case 'lowercase':
      return [String(value).trim().toLowerCase()];
    default:
      return [value];
  }
}

function normalizeMediaMathGoalType(value?: string): string | undefined {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  return normalized;
}

function normalizeMediaMathFrequencyUnit(value?: string): string | undefined {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  if (normalized.endsWith('s')) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function toNumber(value?: string): number | undefined {
  const normalized = String(value || '').trim().replace(/,/g, '');
  if (!normalized) {
    return undefined;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function compareValues(actual: unknown, expected: unknown): boolean {
  if (actual === expected) {
    return true;
  }

  const normalizedActual = normalizeComparable(actual);
  const normalizedExpected = normalizeComparable(expected);
  return normalizedActual === normalizedExpected;
}

function normalizeComparable(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  const stringValue = String(value).trim();
  const numeric = Number(stringValue.replace(/,/g, ''));
  if (Number.isFinite(numeric) && stringValue !== '') {
    return String(numeric);
  }

  const dateKey = normalizeDateComparable(stringValue);
  if (dateKey) {
    return dateKey;
  }

  return stringValue.toLowerCase();
}

function normalizeDateComparable(value: string): string | undefined {
  const slashMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slashMatch) {
    const [, mm, dd, yyyy] = slashMatch;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  return undefined;
}

function evaluatePath(payload: unknown, path: string): unknown[] {
  const tokens = parsePath(path);
  let current: unknown[] = [payload];

  for (const token of tokens) {
    const next: unknown[] = [];
    for (const item of current) {
      if (token.kind === 'property') {
        if (item && typeof item === 'object' && token.value in (item as Record<string, unknown>)) {
          next.push((item as Record<string, unknown>)[token.value]);
        }
      } else if (token.kind === 'index') {
        if (Array.isArray(item) && item.length > token.value) {
          next.push(item[token.value]);
        }
      } else if (token.kind === 'wildcard') {
        if (Array.isArray(item)) {
          next.push(...item);
        }
      }
    }
    current = next;
  }

  return current.flatMap((item) => (Array.isArray(item) ? item : [item]));
}

function parsePath(path: string): PathToken[] {
  if (!path.startsWith('$')) {
    throw new Error(`Unsupported path ${path}`);
  }

  const tokens: PathToken[] = [];
  let index = 1;

  while (index < path.length) {
    const char = path[index];
    if (char === '.') {
      index += 1;
      const start = index;
      while (index < path.length && /[A-Za-z0-9_]/.test(path[index])) {
        index += 1;
      }
      tokens.push({ kind: 'property', value: path.slice(start, index) });
      continue;
    }

    if (char === '[') {
      const closeIndex = path.indexOf(']', index);
      if (closeIndex === -1) {
        throw new Error(`Unsupported path ${path}`);
      }
      const content = path.slice(index + 1, closeIndex).trim();
      if (content === '*') {
        tokens.push({ kind: 'wildcard' });
      } else if (/^'[^']+'$/.test(content) || /^"[^"]+"$/.test(content)) {
        tokens.push({ kind: 'property', value: content.slice(1, -1) });
      } else if (/^\d+$/.test(content)) {
        tokens.push({ kind: 'index', value: Number(content) });
      } else {
        throw new Error(`Unsupported path token ${content} in ${path}`);
      }
      index = closeIndex + 1;
      continue;
    }

    throw new Error(`Unsupported path ${path}`);
  }

  return tokens;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
