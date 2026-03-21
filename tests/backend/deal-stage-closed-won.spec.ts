import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { configureBackendDealStage, openBackendDealSpotlight, saveClosedWonDeal } from '../../pages/backend-deal-stage';
import { config } from '../../utils/config';

test('backend: deal stage closed won save is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const dealId = config.backendDealId;
  const username = config.loginUser;
  const password = config.loginPassword;

  test.skip(!baseUrl || !username || !password, 'Backend URL and credentials are required.');

  await loginToBackend(page, username, password, baseUrl);
  await openBackendDealSpotlight(page, dealId);
  await configureBackendDealStage(page, {
    dealStage: config.backendDealStage,
    dealStatus: config.backendDealStatus,
    source: config.backendDealSource,
    viewabilityPartner: config.backendDealViewabilityPartner,
    canTargetOutsideAbmList: config.backendCanTargetOutsideAbm
  });
  await saveClosedWonDeal(page);
});
