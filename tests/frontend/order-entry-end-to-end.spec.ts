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
  loadOrderEntryCreativeRowsForCase,
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

function shouldPauseAtEnd(): boolean {
  return config.pauseAtEnd;
}

test.afterEach(async ({ page }, testInfo) => {
  if (shouldPauseAtEnd() && testInfo.status !== testInfo.expectedStatus) {
    await page.pause();
  }
});

test('frontend: order entry end-to-end flow is scriptable', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  test.setTimeout(90000);
  const basicSetupValues = requireOrderEntryBasicSetupValues();
  const audienceActions = requireOrderEntryAudienceActions();
  const budgetFlightValues = requireOrderEntryBudgetFlightValues();
  const inventoryValues = requireOrderEntryInventoryValues();
  const creativeRows = loadOrderEntryCreativeRowsForCase();
  const splitValues = requireOrderEntrySplitValues();
  const splitActions = loadOrderEntrySplitActions();
  const flowValues = requireOrderEntryFlowValues();
  const objectivesValues = requireOrderEntryObjectivesValues();
  const displayTabs = new Set(flowValues.tabs.map((item) => item.toLowerCase()));
  const orderAction = (objectivesValues.orderAction || budgetFlightValues.orderAction || config.orderEntryAction || 'create').toLowerCase();

  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
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
    await configureOrderEntryBudgetFlight(
      page,
      {
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
      }
    );
  }

  if (displayTabs.has('inventory')) {
    await configureOrderEntryInventory(
      page,
      {
        adServer: inventoryValues.adServer,
        geoTargetingType: inventoryValues.geoTargetingType,
        geoTargetingItems: inventoryValues.geoTargetingItems || [],
        profileName: inventoryValues.geoTargetingProfileName,
        inventoryDevices: inventoryValues.inventoryDevices || [],
        inventoryItem: inventoryValues.inventoryItem,
        targetingTypeBrowser: inventoryValues.targetingTypeBrowser,
        targetingBrowsers: inventoryValues.targetingBrowsers || [],
        viewabilityThreshold: inventoryValues.viewabilityThreshold,
        completionRateThreshold: inventoryValues.completionRateThreshold,
        listenThroughThreshold: inventoryValues.listenThroughThreshold,
        postBidMeasurement: inventoryValues.postBidMeasurement,
        supplyStrategy: inventoryValues.supplyStrategy,
        dealSelectionType: inventoryValues.dealSelectionType,
        crossDevice: inventoryValues.crossDevice,
        frequencyCap: inventoryValues.frequencyCap,
        frequencyCapUnit: undefined,
        recencyCap: inventoryValues.recencyCap,
        recencyCapUnit: undefined
      }
    );
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
  } else if (orderSubmitType === 'invalid-order') {
    await verifySubmitOrderDisabled(page);
  } else if (config.orderEntrySaveDraft) {
    await saveOrderAsDraft(page);
  }

  if (shouldPauseAtEnd()) {
    await page.pause();
  }
});
