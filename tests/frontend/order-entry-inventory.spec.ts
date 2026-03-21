import { test } from '../../fixtures/session';
import { configureOrderEntryInventory, openOrderEntryPage, waitForInventoryTab } from '../../pages/order-entry';
import { requireOrderEntryInventoryValues } from '../../utils/order-entry-db';
import { config } from '../../utils/config';

test('frontend: order entry inventory tab is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const dbValues = requireOrderEntryInventoryValues();

  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await configureOrderEntryInventory(page, {
    adServer: dbValues.adServer,
    geoTargetingType: dbValues.geoTargetingType,
    geoTargetingItems: dbValues.geoTargetingItems || [],
    profileName: dbValues.geoTargetingProfileName,
    inventoryDevices: dbValues.inventoryDevices || [],
    inventoryItem: dbValues.inventoryItem,
    targetingTypeBrowser: dbValues.targetingTypeBrowser,
    targetingBrowsers: dbValues.targetingBrowsers || [],
    viewabilityThreshold: dbValues.viewabilityThreshold,
    completionRateThreshold: dbValues.completionRateThreshold,
    listenThroughThreshold: dbValues.listenThroughThreshold,
    postBidMeasurement: dbValues.postBidMeasurement,
    supplyStrategy: dbValues.supplyStrategy,
    dealSelectionType: dbValues.dealSelectionType,
    crossDevice: dbValues.crossDevice,
    frequencyCap: dbValues.frequencyCap,
    frequencyCapUnit: undefined,
    recencyCap: dbValues.recencyCap,
    recencyCapUnit: undefined
  });
});

test('frontend: order entry inventory tab renders', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await waitForInventoryTab(page);
});
