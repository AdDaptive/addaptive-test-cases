import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { openBackendDealSpotlight, sendDealToInFlight } from '../../pages/backend-deal-stage';
import { config } from '../../utils/config';

test('backend: in-flight pending flow is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const dealId = config.backendDealId;
  const username = config.loginUser;
  const password = config.loginPassword;

  test.skip(!baseUrl || !username || !password, 'Backend URL and credentials are required.');

  await loginToBackend(page, username, password, baseUrl);
  await openBackendDealSpotlight(page, dealId);
  await sendDealToInFlight(page);
});
