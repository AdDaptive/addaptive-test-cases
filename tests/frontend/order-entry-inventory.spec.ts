import { test } from '../../fixtures/session';
import { configureOrderEntryInventory, openOrderEntryPage, waitForInventoryTab } from '../../pages/order-entry';
import { requireOrderEntryFlowValues, requireOrderEntryInventoryValues } from '../../utils/order-entry-db';
import { config } from '../../utils/config';
import { env } from '../../utils/env';
import { shouldUseOrderEntryImpersonation } from '../../utils/auth-config';

test('frontend: order entry inventory tab is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const dbValues = requireOrderEntryInventoryValues();
  const flowValues = requireOrderEntryFlowValues();

  await loginAsDefaultUser();

  if (shouldUseOrderEntryImpersonation({ impersonateUserProfile: flowValues.impersonateUserProfile }, [env.impersonateUser, env.orderEntryImpersonateUser])) {
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
  const flowValues = requireOrderEntryFlowValues();
  await loginAsDefaultUser();

  if (shouldUseOrderEntryImpersonation({ impersonateUserProfile: flowValues.impersonateUserProfile }, [env.impersonateUser, env.orderEntryImpersonateUser])) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await waitForInventoryTab(page);
});
