import { test } from '../../fixtures/session';
import {
  bulkImportCsvCreativesOnCurrentPage,
  addBannerCreativeOnCurrentPage,
  configureOrderEntryBasicSetup,
  configureOrderEntryAudience,
  configureOrderEntryBudgetFlight,
  configureOrderEntryInventory,
  configureOrderEntryObjectives,
  createSplitOnCurrentPage,
  deleteSplit,
  editSplit,
  finalizeDefaultSplit,
  openAudienceTab,
  openCreativesTab,
  openOrderEntryPage,
  openSplitsTab,
  saveOrderAsDraft,
  submitOrder,
  verifySubmitOrderDisabled,
  verifySplitGroupCount
} from '../../pages/order-entry';
import {
  buildOrderEntryCaseSelectionError,
  loadOrderEntryCaseData,
  loadOrderEntryCreativeRowsForCase,
  loadOrderEntryCaseSummaries,
  requireOrderEntryBasicSetupValues,
  requireOrderEntryAudienceActions,
  requireOrderEntryBudgetFlightValues,
  requireOrderEntryFlowValues,
  requireOrderEntryInventoryValues,
  requireOrderEntryObjectivesValues,
  loadOrderEntrySplitActions,
  requireOrderEntrySplitValues
} from '../../utils/order-entry-db';
import { config } from '../../utils/config';
import { env } from '../../utils/env';
import { shouldUseOrderEntryImpersonation } from '../../utils/auth-config';
import {
  clearValidationQueueFile,
  queueCurrentOrderEntryValidations,
  runQueuedOrderEntryValidations,
  shouldGenerateOrderEntryValidations,
  shouldRunOrderEntryValidations
} from '../../utils/order-entry-validation';

const selectedCases = loadOrderEntryCaseSummaries();
const batchValidationEnabled = selectedCases.some((selectedCase) => shouldGenerateOrderEntryValidations(selectedCase.adServer));
test.describe.configure({ mode: batchValidationEnabled ? 'serial' : 'parallel' });

function shouldPauseAtEnd(): boolean {
  return config.pauseAtEnd;
}

test.afterEach(async ({ page }, testInfo) => {
  if (shouldPauseAtEnd() && testInfo.status !== testInfo.expectedStatus) {
    await page.pause();
  }
});

async function runOrderEntryEndToEnd(
  page: Parameters<typeof openOrderEntryPage>[0],
  request: Parameters<typeof runQueuedOrderEntryValidations>[0],
  loginAsDefaultUser: () => Promise<void>,
  impersonateConfiguredUser: () => Promise<void>
): Promise<void> {
  const basicSetupValues = requireOrderEntryBasicSetupValues();
  const audienceActions = requireOrderEntryAudienceActions();
  const budgetFlightValues = requireOrderEntryBudgetFlightValues();
  const inventoryValues = requireOrderEntryInventoryValues();
  const creativeRows = loadOrderEntryCreativeRowsForCase();
  const splitValues = requireOrderEntrySplitValues();
  const splitActions = loadOrderEntrySplitActions();
  const flowValues = requireOrderEntryFlowValues();
  const objectivesValues = requireOrderEntryObjectivesValues();
  const currentCase = loadOrderEntryCaseData();
  const displayTabs = new Set(flowValues.tabs.map((item) => item.toLowerCase()));
  const orderAction = (objectivesValues.orderAction || budgetFlightValues.orderAction || config.orderEntryAction || 'create').toLowerCase();
  const generateValidations = shouldGenerateOrderEntryValidations(basicSetupValues.adServer);

  await loginAsDefaultUser();

  if (shouldUseOrderEntryImpersonation({ impersonateUserProfile: flowValues.impersonateUserProfile }, [env.impersonateUser, env.orderEntryImpersonateUser])) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page, {
    orderAction,
    existingLineItemName: basicSetupValues.lineItemName
  });

  if (displayTabs.has('objectives')) {
    await configureOrderEntryObjectives(page, objectivesValues);
  }

  if (displayTabs.has('basic setup')) {
    await configureOrderEntryBasicSetup(page, {
      adServer: basicSetupValues.adServer,
      orderAction,
      orderName: basicSetupValues.orderName,
      ioName: basicSetupValues.ioName,
      campaignName: basicSetupValues.campaignName,
      campaignType: basicSetupValues.campaignType,
      revenueType: basicSetupValues.revenueType,
      lineItemName: basicSetupValues.lineItemName,
      lineItems: basicSetupValues.lineItems,
      curateDealName: basicSetupValues.curateDealName,
      curateDSP: basicSetupValues.curateDSP,
      advertiser: basicSetupValues.advertiser,
      singleObjectDealId: basicSetupValues.singleObjectDealId,
      targetType: basicSetupValues.targetType,
      creativeType: basicSetupValues.creativeType,
      insertionOrder: basicSetupValues.insertionOrder,
      orderNotes: basicSetupValues.orderNotes
    });
  }

  if (displayTabs.has('budget & flight')) {
    await configureOrderEntryBudgetFlight(page, {
      adServer: budgetFlightValues.adServer,
      orderAction: budgetFlightValues.orderAction,
      startDate: budgetFlightValues.startDate,
      endDate: budgetFlightValues.endDate,
      subDealId: budgetFlightValues.subDealId,
      cpmValue: budgetFlightValues.cpmValue,
      impressionGoal: budgetFlightValues.impressionGoal,
      optimizationCpm: budgetFlightValues.optimizationCpm,
      pacingPercentage: budgetFlightValues.pacingPercentage,
      pacingImpressionType: budgetFlightValues.pacingImpressionType,
      pacingImpression: budgetFlightValues.pacingImpression,
      dailyBudget: budgetFlightValues.dailyBudget,
      xandrLifeBuffer: budgetFlightValues.xandrLifeBuffer,
      xandrLifeBudget: budgetFlightValues.xandrLifeBudget
    });
  }

  if (displayTabs.has('inventory')) {
    await configureOrderEntryInventory(page, {
      adServer: inventoryValues.adServer,
      geoTargetingType: inventoryValues.geoTargetingType,
      geoTargetingItems: inventoryValues.geoTargetingItems || [],
      profileName: inventoryValues.geoTargetingProfileName,
      inventoryDevices: inventoryValues.inventoryDevices || [],
      inventoryItem: inventoryValues.inventoryItem,
      targetingTypeBrowser: inventoryValues.targetingTypeBrowser,
      targetingBrowsers: inventoryValues.targetingBrowsers || [],
      inventoryInclusionList: inventoryValues.inventoryInclusionList || [],
      inventoryExclusionList: inventoryValues.inventoryExclusionList || [],
      viewabilityThreshold: inventoryValues.viewabilityThreshold,
      completionRateThreshold: inventoryValues.completionRateThreshold,
      listenThroughThreshold: inventoryValues.listenThroughThreshold,
      postBidMeasurement: inventoryValues.postBidMeasurement,
      supplyStrategy: inventoryValues.supplyStrategy,
      dealSelectionType: inventoryValues.dealSelectionType,
      crossDevice: inventoryValues.crossDevice,
      frequencyCapEnabled: inventoryValues.frequencyCapEnabled,
      frequencyCap: inventoryValues.frequencyCap,
      frequencyCapUnit: inventoryValues.frequencyCapUnit,
      recencyCapEnabled: inventoryValues.recencyCapEnabled,
      recencyCap: inventoryValues.recencyCap,
      recencyCapUnit: inventoryValues.recencyCapUnit,
      dayPartingTimeSlots: inventoryValues.dayPartingTimeSlots || []
    });
  }

  if (displayTabs.has('audience')) {
    if (audienceActions.length > 0) {
      await configureOrderEntryAudience(page, audienceActions);
    } else {
      await openAudienceTab(page);
    }
  }

  if (displayTabs.has('creatives') && creativeRows.length > 0) {
    await openCreativesTab(page);
    const bulkImportType = (flowValues.bulkImportCreativesType || '').toLowerCase();
    if (bulkImportType === 'csv') {
      await bulkImportCsvCreativesOnCurrentPage(page, {
        creativeType: basicSetupValues.creativeType,
        rows: creativeRows,
        use1stUrlForAll: flowValues.bulkImportUse1stUrlForAll,
        use1stImageForAll: flowValues.bulkImportUse1stImageForAll,
        use1stIconForAll: flowValues.bulkImportUse1stIconForAll
      });
    } else {
      for (const creativeRow of creativeRows) {
        await addBannerCreativeOnCurrentPage(page, {
          orderAction: objectivesValues.orderAction,
          creativeName: creativeRow.name || 'Playwright Banner Creative',
          creativeType: creativeRow.type,
          creativeCategory: creativeRow.creativeCategory,
          creativeSize: creativeRow.size,
          landingPageUrl: creativeRow.url,
          protocol: creativeRow.protocol,
          filePath: config.orderEntryCreativeFile || creativeRow.filePath || undefined,
          iconFilePath: creativeRow.iconFilePath || undefined,
          nativeTitle: creativeRow.title,
          nativeSponsoredBy: creativeRow.sponsoredBy,
          nativeBody: creativeRow.body,
          nativeCallToAction: creativeRow.callToAction,
          htmlWithOrWithoutIframe: creativeRow.htmlWithOrWithoutIframe,
          thirdPartyUrl: creativeRow.thirdPartyUrl,
          creativeTagIds: creativeRow.creativeTagIds,
          pixels: creativeRow.pixels,
          allowDisabledSave: (flowValues.orderSubmitType || "").toLowerCase() !== "valid-order"
        });
      }
    }
  }

  if (displayTabs.has('splits')) {
    await openSplitsTab(page);
    if (splitValues.hasSplits) {
      for (const splitAction of splitActions) {
        if (splitAction.action === '*') {
          await createSplitOnCurrentPage(page, {
            name: splitAction.name || splitValues.splitName || 'Playwright Split',
            bidModifiers: splitAction.bidModifiers,
            status: splitAction.status,
            iabViewabilityRate: splitAction.iabViewabilityRate
          });
        } else if (splitAction.action === '!' && splitAction.groupNumber) {
          await editSplit(page, splitAction.groupNumber, {
            name: splitAction.name,
            bidModifiers: splitAction.bidModifiers,
            status: splitAction.status,
            iabViewabilityRate: splitAction.iabViewabilityRate
          });
        } else if (splitAction.action === 'x' && splitAction.groupNumber) {
          await deleteSplit(page, splitAction.groupNumber);
        }
      }
      await verifySplitGroupCount(page, 1);
    } else {
      await finalizeDefaultSplit(page, {
        splitsDivideEqually: flowValues.splitsDivideEqually,
        splitsAllocations: flowValues.splitsAllocationList,
        creativeName: creativeRows[0]?.name
      });
    }
  }

  const orderSubmitType = (flowValues.orderSubmitType || '').toLowerCase();

  if (orderSubmitType === 'valid-order') {
    await submitOrder(page, {
      adServer: basicSetupValues.adServer,
      splitsDivideEqually: flowValues.splitsDivideEqually,
      splitsAllocations: flowValues.splitsAllocationList,
      confirmationMessages: flowValues.confirmationMessages
    });
    if (generateValidations && currentCase) {
      await queueCurrentOrderEntryValidations(page, {
        testCaseName: currentCase.test_case_name,
        adServer: basicSetupValues.adServer,
        lineItemName: basicSetupValues.lineItemName
      });
    }
  } else if (orderSubmitType === 'invalid-order') {
    await verifySubmitOrderDisabled(page);
  } else if (config.orderEntrySaveDraft) {
    await saveOrderAsDraft(page);
  }

  if (shouldPauseAtEnd()) {
    await page.pause();
  }
}

if (selectedCases.length === 0) {
  test('frontend: order entry end-to-end batch requires matching filters', async () => {
    throw new Error(buildOrderEntryCaseSelectionError());
  });
}

test.beforeAll(async () => {
  if (batchValidationEnabled) {
    await clearValidationQueueFile();
  }
});

test.afterAll(async ({ request }) => {
  if (batchValidationEnabled && shouldRunOrderEntryValidations()) {
    await runQueuedOrderEntryValidations(request);
  }
});

for (const selectedCase of selectedCases) {
  test(`frontend: order entry end-to-end for DB object ${selectedCase.objectId} (${selectedCase.testCaseName})`, async ({
    page,
    request,
    loginAsDefaultUser,
    impersonateConfiguredUser
  }) => {
    const timeoutOverride = Number(process.env.ADDAPTIVE_TEST_TIMEOUT_MS || '90000');
    test.setTimeout(Number.isFinite(timeoutOverride) && timeoutOverride > 0 ? timeoutOverride : 90000);

    const previousObjectId = process.env.ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID;
    const previousTestCaseName = process.env.ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME;
    const previousAdServer = process.env.ADDAPTIVE_ORDER_ENTRY_AD_SERVER;
    const previousOrderAction = process.env.ADDAPTIVE_ORDER_ENTRY_ACTION;

    process.env.ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID = selectedCase.objectId;
    process.env.ADDAPTIVE_ORDER_ENTRY_AD_SERVER = selectedCase.adServer;
    process.env.ADDAPTIVE_ORDER_ENTRY_ACTION = selectedCase.orderAction;
    delete process.env.ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME;

    try {
      await runOrderEntryEndToEnd(page, request, loginAsDefaultUser, impersonateConfiguredUser);
    } finally {
      if (previousObjectId === undefined) {
        delete process.env.ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID;
      } else {
        process.env.ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID = previousObjectId;
      }

      if (previousTestCaseName === undefined) {
        delete process.env.ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME;
      } else {
        process.env.ADDAPTIVE_ORDER_ENTRY_DB_TEST_CASE_NAME = previousTestCaseName;
      }

      if (previousAdServer === undefined) {
        delete process.env.ADDAPTIVE_ORDER_ENTRY_AD_SERVER;
      } else {
        process.env.ADDAPTIVE_ORDER_ENTRY_AD_SERVER = previousAdServer;
      }

      if (previousOrderAction === undefined) {
        delete process.env.ADDAPTIVE_ORDER_ENTRY_ACTION;
      } else {
        process.env.ADDAPTIVE_ORDER_ENTRY_ACTION = previousOrderAction;
      }
    }
  });
}
