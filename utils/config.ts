import { loadEnv } from './load-env';

loadEnv();

function read(name: string): string {
  return process.env[name] || '';
}

function optional(name: string): string | undefined {
  const value = read(name).trim();
  return value ? value : undefined;
}

function bool(name: string): boolean {
  return read(name).toLowerCase() === 'true';
}

function list(name: string): string[] {
  return read(name)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProfileName(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function selectedProfileToken(): string | undefined {
  const requested = read('ADDAPTIVE_PROFILE');
  if (!requested) {
    return undefined;
  }

  return normalizeProfileName(requested)
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function profileAlias(field: string): string {
  const token = selectedProfileToken();
  if (!token) {
    return '';
  }

  return read(`ADDAPTIVE_PROFILE_${token}_${field}`);
}

function profiled(readName: string, aliasField?: string): string {
  if (aliasField) {
    const aliasedValue = profileAlias(aliasField).trim();
    if (aliasedValue) {
      return aliasedValue;
    }
  }

  return read(readName);
}

export const config = {
  get profileName(): string | undefined {
    const requested = read('ADDAPTIVE_PROFILE').trim();
    return requested || undefined;
  },
  get releaseName(): string {
    return profiled('ADDAPTIVE_RELEASE_NAME', 'RELEASE_NAME');
  },
  get frontendUrl(): string {
    return profiled('ADDAPTIVE_FRONTEND_URL', 'FRONTEND_URL');
  },
  get backendUrl(): string {
    return profiled('ADDAPTIVE_BACKEND_URL', 'BACKEND_URL');
  },
  get dbHost(): string {
    return read('ADDAPTIVE_DB_HOST');
  },
  get dbPort(): string {
    return read('ADDAPTIVE_DB_PORT');
  },
  get dbName(): string {
    return read('ADDAPTIVE_DB_NAME');
  },
  get dbUser(): string {
    return read('ADDAPTIVE_DB_USER');
  },
  get dbPassword(): string {
    return read('ADDAPTIVE_DB_PASSWORD');
  },
  get backendCookie(): string {
    return profiled('ADDAPTIVE_BACKEND_COOKIE', 'BACKEND_COOKIE');
  },
  get loginUser(): string {
    return profiled('ADDAPTIVE_LOGIN_USER', 'LOGIN_USER');
  },
  get loginPassword(): string {
    return profiled('ADDAPTIVE_LOGIN_PASSWORD', 'LOGIN_PASSWORD');
  },
  get impersonateUser(): string {
    return profiled('ADDAPTIVE_IMPERSONATE_USER', 'IMPERSONATE_USER');
  },
  get orderEntryImpersonateUser(): string {
    return read('ADDAPTIVE_ORDER_ENTRY_IMPERSONATE_USER');
  },
  get orderEntryUseImpersonation(): boolean {
    return bool('ADDAPTIVE_ORDER_ENTRY_USE_IMPERSONATION');
  },
  get orderEntrySaveDraft(): boolean {
    return bool('ADDAPTIVE_ORDER_ENTRY_SAVE_DRAFT');
  },
  get orderEntryCreativeFile(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_CREATIVE_FILE');
  },
  get orderEntryDbObjectId(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID');
  },
  get orderEntryDbTestCaseName(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME');
  },
  get orderEntryAdServer(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_AD_SERVER');
  },
  get orderEntryAction(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_ACTION');
  },
  get orderEntryDbIds(): string[] {
    return list('ADDAPTIVE_ORDER_ENTRY_DB_IDS');
  },
  get orderEntryDbRange(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_DB_RANGE');
  },
  get orderEntryCreativeDbObjectId(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_CREATIVE_DB_OBJECT_ID');
  },
  get pauseAtEnd(): boolean {
    return bool('ADDAPTIVE_PAUSE_AT_END');
  },
  get audienceUseImpersonation(): boolean {
    return bool('ADDAPTIVE_AUDIENCE_USE_IMPERSONATION');
  },
  get audienceDbId(): string | undefined {
    return optional('ADDAPTIVE_AUDIENCE_DB_ID');
  },
  get audienceDbTestCaseName(): string | undefined {
    return optional('ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME');
  },
  get audienceDbIds(): string[] {
    return list('ADDAPTIVE_AUDIENCE_DB_IDS');
  },
  get audienceDbRange(): string | undefined {
    return optional('ADDAPTIVE_AUDIENCE_DB_RANGE');
  },
  get insightUseImpersonation(): boolean {
    return bool('ADDAPTIVE_INSIGHT_USE_IMPERSONATION');
  },
  get insightDbId(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_DB_ID');
  },
  get insightDbTestCaseName(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_DB_TEST_CASE_NAME');
  },
  get insightWidgetAction(): 'add' | 'edit' | 'delete' {
    const value = read('ADDAPTIVE_INSIGHT_WIDGET_ACTION');
    return value === 'edit' || value === 'delete' ? value : 'add';
  },
  get insightWidgetIndex(): number {
    const parsed = Number(read('ADDAPTIVE_INSIGHT_WIDGET_INDEX') || '1');
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  },
  get insightWidgetDataSource(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_WIDGET_DATA_SOURCE');
  },
  get insightWidgetType(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_WIDGET_TYPE');
  },
  get insightWidgetDimension(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_WIDGET_DIMENSION');
  },
  get insightWidgetMetric(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_WIDGET_METRIC');
  },
  get insightWidgetContent(): string | undefined {
    return optional('ADDAPTIVE_INSIGHT_WIDGET_CONTENT');
  },
  get backendDealId(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_DEAL_ID');
  },
  get backendDealStage(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_DEAL_STAGE');
  },
  get backendDealStatus(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_DEAL_STATUS');
  },
  get backendDealSource(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_DEAL_SOURCE');
  },
  get backendDealViewabilityPartner(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_DEAL_VIEWABILITY_PARTNER');
  },
  get backendCanTargetOutsideAbm(): boolean | undefined {
    const value = read('ADDAPTIVE_BACKEND_CAN_TARGET_OUTSIDE_ABM');
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return undefined;
  },
  get backendInFlightAction(): string | undefined {
    return optional('ADDAPTIVE_BACKEND_IN_FLIGHT_ACTION');
  },
  get dealsDbObjectId(): string | undefined {
    return optional('ADDAPTIVE_DEALS_DB_OBJECT_ID');
  },
  get dealsDbTestCaseName(): string | undefined {
    return optional('ADDAPTIVE_DEALS_DB_TEST_CASE_NAME');
  },
  get dealsDbIds(): string[] {
    return list('ADDAPTIVE_DEALS_DB_IDS');
  },
  get dealsDbRange(): string | undefined {
    return optional('ADDAPTIVE_DEALS_DB_RANGE');
  },
  get clientAction(): 'create' | 'update' {
    return read('ADDAPTIVE_CLIENT_ACTION') === 'create' ? 'create' : 'update';
  },
  get clientName(): string {
    return read('ADDAPTIVE_CLIENT_NAME');
  },
  get existingClientName(): string | undefined {
    return optional('ADDAPTIVE_EXISTING_CLIENT_NAME');
  },
  get clientIsActive(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_IS_ACTIVE');
  },
  get clientTier(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_TIER');
  },
  get clientSalesforceAccountId(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_SF_ACCOUNT_ID');
  },
  get clientType(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_TYPE');
  },
  get clientTarget(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_TARGET');
  },
  get clientSso(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_SSO');
  },
  get clientDpmCpm(): string | undefined {
    return optional('ADDAPTIVE_CLIENT_DPM_CPM');
  },
  get clientAdServers(): string[] {
    return list('ADDAPTIVE_CLIENT_AD_SERVERS');
  },
  get clientIsDelinquent(): boolean | undefined {
    const value = read('ADDAPTIVE_CLIENT_IS_DELINQUENT');
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return undefined;
  },
  get testUserEmail(): string {
    return read('ADDAPTIVE_TEST_USER_EMAIL');
  },
  get testCreateUserEmail(): string {
    return read('ADDAPTIVE_TEST_CREATE_USER_EMAIL');
  },
  get testCreateUserPassword(): string {
    return read('ADDAPTIVE_TEST_CREATE_USER_PASSWORD') || 'ChangeMe123!';
  },
  get testCreateUserStatus(): string {
    return read('ADDAPTIVE_TEST_CREATE_USER_STATUS') || 'Active';
  },
  get testCreateUserClient(): string | undefined {
    return optional('ADDAPTIVE_TEST_CREATE_USER_CLIENT');
  },
  get testCreateUserGroup(): string | undefined {
    return optional('ADDAPTIVE_TEST_CREATE_USER_GROUP');
  },
  get testCreateUserFirstName(): string {
    return read('ADDAPTIVE_TEST_CREATE_USER_FIRST_NAME') || 'Playwright';
  },
  get testCreateUserLastName(): string {
    return read('ADDAPTIVE_TEST_CREATE_USER_LAST_NAME') || 'Migration';
  },
  get createOrderOrderName(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_ORDER_NAME');
  },
  get createOrderAdvertiser(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_ADVERTISER');
  },
  get createOrderSingleObjectDealId(): string | undefined {
    return optional('ADDAPTIVE_ORDER_ENTRY_SINGLE_OBJECT_DEAL_ID');
  }
};
