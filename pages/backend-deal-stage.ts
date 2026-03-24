import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { config } from '../utils/config';

export type BackendDealStageOptions = {
  dealStage?: string;
  dealStatus?: string;
  source?: string;
  viewabilityPartner?: string;
  b2bAnalyticsCadence?: string[];
  accountNotes?: string;
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

function normalizeOptionText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

async function selectOptionFlex(
  locator: ReturnType<typeof katalonLocator>,
  desiredValue: string,
  preferredMode: 'label' | 'value' = 'label'
): Promise<void> {
  const normalizedDesired = normalizeOptionText(desiredValue);
  const options = await locator.locator('option').evaluateAll((nodes) =>
    nodes.map((node) => ({
      value: (node as HTMLOptionElement).value,
      label: (node as HTMLOptionElement).label || node.textContent || ''
    }))
  );

  const directMatch = options.find(
    (option) =>
      normalizeOptionText(option.label) === normalizedDesired || normalizeOptionText(option.value) === normalizedDesired
  );
  const containsMatch = options.find(
    (option) =>
      normalizeOptionText(option.label).includes(normalizedDesired) ||
      normalizedDesired.includes(normalizeOptionText(option.label))
  );
  const match = directMatch || containsMatch;

  if (!match) {
    throw new Error(`Unable to find option "${desiredValue}" in select control.`);
  }

  if (preferredMode === 'value' && match.value) {
    await locator.selectOption({ value: match.value });
    return;
  }

  await locator.selectOption({ label: match.label });
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
    await selectOptionFlex(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_DealStage'),
      options.dealStage
    );
  }
  if (options.dealStatus) {
    await selectOptionFlex(
      katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/select_Deal_Stage_Deal_Status'
      ),
      options.dealStatus
    );
  }
  if (options.source) {
    await selectOptionFlex(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_Source'),
      options.source
    );
  }
  if (options.viewabilityPartner) {
    await selectOptionFlex(
      katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_ViewabilityPartner'
      ),
      options.viewabilityPartner
    );
  }

  if (options.b2bAnalyticsCadence && options.b2bAnalyticsCadence.length > 0) {
    const cadenceSelect = katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/select_CompleteDeal_B2BAnalyticsReportingCadence'
    );
    const optionsList = await cadenceSelect.locator('option').evaluateAll((nodes) =>
      nodes.map((node) => ({
        value: (node as HTMLOptionElement).value,
        label: (node as HTMLOptionElement).label || node.textContent || ''
      }))
    );
    const resolved = options.b2bAnalyticsCadence
      .map((item) => {
        const normalizedDesired = normalizeOptionText(item);
        return (
          optionsList.find((option) => normalizeOptionText(option.label) === normalizedDesired)?.value ||
          optionsList.find((option) => normalizeOptionText(option.value) === normalizedDesired)?.value
        );
      })
      .filter((item): item is string => !!item);

    if (resolved.length > 0) {
      await cadenceSelect.selectOption(resolved.map((value) => ({ value })));
    }
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

  if (options.accountNotes) {
    const notesBody = page.frameLocator('#notes-field_ifr').locator('body');
    await notesBody.click();
    await notesBody.fill(options.accountNotes);
  }
}

export async function sendDealToProposalSentNegotiation(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_Proposal_Sent-Negotiation'
    ).click();
  });
}

export async function sendDealToVerbalAgreement(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/button_Deal_Stage_Send_To_Verbal_Agreement'
    ).click();
  });
}

export async function sendDealToClosedWon(page: Page): Promise<void> {
  await clickWithOptionalDialog(page, async () => {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Spotlight Page/Close-Deal-Stages/saveClosedWon_button'
    ).click();
  });
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
