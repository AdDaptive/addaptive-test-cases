import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { openBackendDealSpotlight, openOrderFromSubDeal } from '../../pages/backend-deal-stage';
import { verifyPmpBasicSetup } from '../../pages/order-entry';
import { config } from '../../utils/config';

test('backend: create order from subdeal opens PMP order entry', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const dealId = config.backendDealId;
  const username = config.loginUser;
  const password = config.loginPassword;

  test.skip(!baseUrl || !username || !password, 'Backend URL and credentials are required.');

  await loginToBackend(page, username, password, baseUrl);
  await openBackendDealSpotlight(page, dealId);

  const orderPage = await openOrderFromSubDeal(page);
  await verifyPmpBasicSetup(orderPage, {
    orderName: config.createOrderOrderName,
    advertiser: config.createOrderAdvertiser,
    singleObjectDealId: config.createOrderSingleObjectDealId
  });
});
