import { test } from '@playwright/test';
import { createOrUpdateBackendClient } from '../../pages/backend-admin-clients';
import { loginToBackend } from '../../pages/backend-auth';
import {
  configureBackendDealStage,
  openBackendDealSpotlight,
  saveClosedWonDeal,
  sendDealToInFlight,
  sendDealToOperations
} from '../../pages/backend-deal-stage';
import { config } from '../../utils/config';

test('backend: deal lifecycle flow is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const dealId = config.backendDealId;
  const username = config.loginUser;
  const password = config.loginPassword;

  test.skip(!baseUrl || !username || !password, 'Backend URL and credentials are required.');

  await loginToBackend(page, username, password, baseUrl);

  if (config.clientName) {
    await createOrUpdateBackendClient(page, {
      action: config.clientAction,
      existingClientName: config.existingClientName || config.clientName,
      clientName: config.clientName
    });
  }

  await openBackendDealSpotlight(page, dealId);
  await configureBackendDealStage(page, {
    dealStage: config.backendDealStage,
    dealStatus: config.backendDealStatus,
    source: config.backendDealSource,
    viewabilityPartner: config.backendDealViewabilityPartner
  });

  await sendDealToOperations(page);
  await saveClosedWonDeal(page);
  await sendDealToInFlight(page);
});
