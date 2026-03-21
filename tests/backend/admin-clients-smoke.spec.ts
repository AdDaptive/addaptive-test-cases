import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { createOrUpdateBackendClient } from '../../pages/backend-admin-clients';
import { config } from '../../utils/config';

test('backend: admin clients create/update flow is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const username = config.loginUser;
  const password = config.loginPassword;
  const action = config.clientAction;
  const clientName = config.clientName;
  const existingClientName = config.existingClientName || clientName;

  test.skip(!baseUrl || !username || !password || !clientName, 'Backend credentials and client name are required.');

  await loginToBackend(page, username, password, baseUrl);
  await createOrUpdateBackendClient(page, {
    action,
    existingClientName,
    clientName,
    isActive: config.clientIsActive,
    tier: config.clientTier,
    salesforceAccountId: config.clientSalesforceAccountId,
    type: config.clientType,
    target: config.clientTarget,
    sso: config.clientSso,
    dpmCpm: config.clientDpmCpm,
    adServers: config.clientAdServers.length ? config.clientAdServers : undefined,
    isDelinquent: config.clientIsDelinquent
  });
});
