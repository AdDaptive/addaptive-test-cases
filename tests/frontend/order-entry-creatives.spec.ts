import { test } from '../../fixtures/session';
import {
  addBannerCreative,
  configureOrderEntryBasicSetup,
  configureOrderEntryObjectives,
  openOrderEntryPage
} from '../../pages/order-entry';
import {
  requireOrderEntryBasicSetupValues,
  requireOrderEntryCreativeValues,
  requireOrderEntryObjectivesValues
} from '../../utils/order-entry-db';
import { config } from '../../utils/config';

test('frontend: order entry creatives tab is scriptable', async ({ page, loginAsDefaultUser }) => {
  const objectivesValues = requireOrderEntryObjectivesValues();
  const basicSetupValues = requireOrderEntryBasicSetupValues();
  const dbValues = requireOrderEntryCreativeValues();

  await loginAsDefaultUser();
  await openOrderEntryPage(page);
  await configureOrderEntryObjectives(page, objectivesValues);
  await configureOrderEntryBasicSetup(page, {
    adServer: basicSetupValues.adServer,
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
  await addBannerCreative(page, {
    creativeName: dbValues.creativeName || 'Playwright Banner Creative',
    creativeType: dbValues.creativeType,
    creativeCategory: dbValues.creativeCategory,
    creativeSize: dbValues.creativeSize,
    landingPageUrl: dbValues.landingPageUrl,
    protocol: dbValues.protocol,
    filePath: config.orderEntryCreativeFile || dbValues.filePath || undefined,
    creativeTagIds: dbValues.creativeTagIds
  });
});
