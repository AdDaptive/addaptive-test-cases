import type { Page } from '@playwright/test';
import { impersonateFrontendUser, loginToFrontend } from './frontend-auth';
import {
  addBannerCreativeOnCurrentPage,
  configureOrderEntryBasicSetup,
  configureOrderEntryBudgetFlight,
  configureOrderEntryInventory,
  configureOrderEntryObjectives,
  finalizeDefaultSplit,
  openCreativesTab,
  openOrderEntryPage,
  openBudgetFlightTab,
  openSplitsTab,
  submitOrder
} from './order-entry';
import { katalonLocator } from '../locators/resolve';
import type { OpsDashboardSeedOrder } from '../utils/ops-dashboard-db';
import { config } from '../utils/config';

function addDays(days: number, time = '12:00 AM'): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy} ${time}`;
}

async function waitForCreatedLineItem(page: Page, lineItemName: string): Promise<void> {
  await page.locator('#header-orders-link').click();

  const ordersSearch = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Orders-Tab/input_OrdersSearch');
  await ordersSearch.waitFor({ state: 'visible', timeout: 15000 });
  await ordersSearch.fill('');
  await ordersSearch.fill(lineItemName);
  await ordersSearch.press('Enter');

  const matchingLineItem = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Orders-Tab/h4_CreateOrderListLineItemName_ContainingText',
    { lineItemName, lineItemIndex: 1 }
  );

  await matchingLineItem.waitFor({ state: 'visible', timeout: 120000 });
}

export async function openCreatedLineItem(page: Page, lineItemName: string): Promise<void> {
  await waitForCreatedLineItem(page, lineItemName);
  await katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Orders-Tab/h4_CreateOrderListLineItemName_ContainingText',
    { lineItemName, lineItemIndex: 1 }
  ).click();
}

export async function createOpsDashboardSeedOrders(page: Page, seed: OpsDashboardSeedOrder): Promise<void> {
  if (!config.frontendUrl) {
    throw new Error('ADDAPTIVE_FRONTEND_URL is required to create Ops Dashboard seed orders.');
  }

  await loginToFrontend(page, config.loginUser, config.loginPassword, config.frontendUrl);
  await impersonateFrontendUser(page, seed.impersonateUserProfile);

  for (const lineItemName of seed.lineItemNames) {
    await openOrderEntryPage(page, { orderAction: 'create' });
    await configureOrderEntryObjectives(page, { adServer: 'DPM' });
    await configureOrderEntryBasicSetup(page, {
      adServer: 'DPM',
      orderAction: 'create',
      orderName: `Ops ${lineItemName}`,
      revenueType: 'CPM',
      lineItemName,
      advertiser: 'Advertiser A',
      singleObjectDealId: seed.singleObjectDealId,
      creativeType: 'Banner',
      orderNotes: 'Test'
    });
    await configureOrderEntryBudgetFlight(page, {
      adServer: 'DPM',
      orderAction: 'create',
      startDate: addDays(1, '12:00 AM'),
      endDate: addDays(180, '11:59 AM'),
      cpmValue: '6',
      impressionGoal: '6',
      dailyBudget: seed.dailyBudget,
      pacingPercentage: seed.pacingPercentage
    });
    await configureOrderEntryInventory(page, {
      adServer: 'DPM',
      geoTargetingType: 'Country',
      geoTargetingItems: ['Austria']
    });

    await openCreativesTab(page);
    for (const creative of seed.creatives) {
      await addBannerCreativeOnCurrentPage(page, {
        creativeName: creative.name || 'Ops Dashboard Creative',
        creativeType: creative.type,
        creativeCategory: creative.creativeCategory,
        creativeSize: creative.size,
        landingPageUrl: creative.url,
        protocol: creative.protocol,
        filePath: creative.filePath,
        iconFilePath: creative.iconFilePath,
        nativeTitle: creative.title,
        nativeSponsoredBy: creative.sponsoredBy,
        nativeBody: creative.body,
        nativeCallToAction: creative.callToAction,
        thirdPartyUrl: creative.thirdPartyUrl,
        htmlWithOrWithoutIframe: creative.htmlWithOrWithoutIframe,
        creativeTagIds: creative.creativeTagIds
      });
    }

    await openSplitsTab(page);
    await finalizeDefaultSplit(page, {
      splitsDivideEqually: 'yes',
      splitsAllocations: [],
      creativeName: seed.creatives[0]?.name
    });

    await submitOrder(page, {
      confirmationMessages: ['Running a campaign with no segments targeted could result in extremely fast fulfillment of daily budget.']
    });
    const continueButton = page.getByRole('button', { name: /Continue/i }).first();
    if (await continueButton.isVisible().catch(() => false)) {
      await continueButton.click();
    }
    await waitForCreatedLineItem(page, lineItemName);
  }
}

export async function readFrontendDailyBudget(page: Page, lineItemName: string): Promise<string> {
  await openCreatedLineItem(page, lineItemName);
  await openBudgetFlightTab(page);
  const input = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightDailyBudget');
  await input.waitFor({ state: 'visible', timeout: 15000 });
  return ((await input.inputValue().catch(() => '')) || '').trim();
}
