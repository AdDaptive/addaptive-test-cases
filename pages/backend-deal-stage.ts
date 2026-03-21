import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { config } from '../utils/config';

export type BackendDealStageOptions = {
  dealStage?: string;
  dealStatus?: string;
  source?: string;
  viewabilityPartner?: string;
  canTargetOutsideAbmList?: boolean;
};

async function clickWithOptionalDialog(page: Page, clicker: () => Promise<void>): Promise<void> {
  const handler = async () => {
    const dialog = await page.waitForEvent('dialog', { timeout: 1500 }).catch(() => null);
    if (dialog) {
      await dialog.accept().catch(() => {});
    }
  };

  await Promise.all([clicker(), handler()]);
}

function resolveBackendRoute(page: Page, fallbackPath: string): string {
  const currentUrl = page.url();

  if (currentUrl) {
    try {
      return new URL(fallbackPath, currentUrl).toString();
    } catch {
      // fall through to configured base URL
    }
  }

  const backendUrl = config.backendUrl;
  if (!backendUrl) {
    throw new Error('Unable to resolve backend deal route. Set ADDAPTIVE_BACKEND_URL.');
  }

  return new URL(fallbackPath, backendUrl).toString();
}

export async function openBackendDealSpotlight(page: Page, dealId?: string): Promise<void> {
  const salesDashboardLink = page.getByRole('link', { name: /Sales Dashboard/i }).first();
  if (await salesDashboardLink.isVisible().catch(() => false)) {
    await salesDashboardLink.click();
    await page.waitForLoadState('domcontentloaded');
  } else {
    await page.goto(resolveBackendRoute(page, '/dpm/deals'), { waitUntil: 'domcontentloaded' });
  }

  const dealsTab = katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Nav Tab', {
    tabName: 'Deals'
  });
  if (await dealsTab.isVisible().catch(() => false)) {
    await dealsTab.click();
    await page.waitForLoadState('domcontentloaded');
  }

  if (dealId) {
    const filterInput = katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Sales Listing Page/Sales Dashboard Filter Input',
      { columnName: 'ID' }
    );
    if (await filterInput.isVisible().catch(() => false)) {
      await filterInput.fill(dealId);
      await page.waitForTimeout(750);
    }
  }

  const filteredDealLink = dealId
    ? page.locator(`a[href*="/dpm/deals/"]:not([href*="/create"])`, { hasText: dealId }).first()
    : page.locator('a[href*="/dpm/deals/"]:not([href*="/create"])').first();
  if (await filteredDealLink.isVisible().catch(() => false)) {
    await filteredDealLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  if (dealId) {
    const hrefMatchedDealLink = page.locator(`a[href*="/dpm/deals/${dealId}"]`).first();
    if (await hrefMatchedDealLink.isVisible().catch(() => false)) {
      await hrefMatchedDealLink.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }
  }

  const firstDealLink = page.locator('a[href*="/dpm/deals/"]:not([href*="/create"])').first();
  if (await firstDealLink.isVisible().catch(() => false)) {
    await firstDealLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  throw new Error('Unable to open a backend deal spotlight page from the Sales Dashboard.');
}

export async function configureBackendDealStage(page: Page, options: BackendDealStageOptions): Promise<void> {
  if (options.dealStage) {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_DealStage').selectOption({
      label: options.dealStage
    });
  }
  if (options.dealStatus) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/select_Deal_Stage_Deal_Status'
    ).selectOption({ label: options.dealStatus });
  }
  if (options.source) {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_Source').selectOption({
      label: options.source
    });
  }
  if (options.viewabilityPartner) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_ViewabilityPartner'
    ).selectOption({ label: options.viewabilityPartner });
  }

  if (typeof options.canTargetOutsideAbmList === 'boolean') {
    const checkbox = katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/input_CompleteDeal_CanAMTargetOutsideOfABMList'
    );
    const checked = await checkbox.isChecked().catch(() => false);
    if (checked !== options.canTargetOutsideAbmList) {
      if (options.canTargetOutsideAbmList) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }
  }
}

export async function sendDealToOperations(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/button_CompleteDeal_SaveSendToOperations').click();
  });
}

export async function saveClosedWonDeal(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/Save Closed Won Form Button').click();
  });
}

export async function sendDealToInFlight(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_In_Flight').click();
  });
}

export async function saveInFlightDeal(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_In_Flight_Save').click();
  });
}

export async function openOrderFromSubDeal(page: Page): Promise<Page> {
  const [orderPage] = await Promise.all([
    page.context().waitForEvent('page'),
    katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/a_Deal_Stage_Sub_Deal_Create_Order_Link'
    ).click()
  ]);

  await orderPage.waitForLoadState();
  return orderPage;
}
