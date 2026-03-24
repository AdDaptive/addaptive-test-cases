import path from 'node:path';
import { expect, type Dialog, type Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import type { DealsCreationFlowValues } from '../utils/deals-db';
import { config } from '../utils/config';

function resolveBackendRoute(page: Page, fallbackPath: string): string {
  const currentUrl = page.url();

  if (currentUrl) {
    try {
      return new URL(fallbackPath, currentUrl).toString();
    } catch {
      // fall through
    }
  }

  if (!config.backendUrl) {
    throw new Error('ADDAPTIVE_BACKEND_URL is required to open the backend deal-create page.');
  }

  return new URL(fallbackPath, config.backendUrl).toString();
}

async function fillRichTextFrame(page: Page, frameSelector: string, value?: string): Promise<void> {
  if (!value) {
    return;
  }

  const body = page.frameLocator(frameSelector).locator('body');
  await body.click();
  await body.fill(value);
}

async function setDateInput(input: ReturnType<typeof katalonLocator>, value?: string): Promise<void> {
  if (!value) {
    return;
  }

  const resolved = resolveRelativeDate(value);
  await input.click();
  await input.fill('');
  await input.fill(resolved);
  await input.press('Escape').catch(() => {});
}

function resolveRelativeDate(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^current([+-]\d+)$/i);
  if (!match) {
    return trimmed;
  }

  const offset = Number(match[1]);
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function selectMultiple(select: ReturnType<typeof katalonLocator>, labels: string[]): Promise<void> {
  if (labels.length === 0) {
    return;
  }

  await select.selectOption(labels.map((label) => ({ label })));
}

async function fillIfVisible(locator: ReturnType<typeof katalonLocator>, value?: string): Promise<void> {
  if (!value) {
    return;
  }

  if (await locator.isVisible().catch(() => false)) {
    await locator.fill(value);
  }
}

async function typeIntoLegacyInput(locator: ReturnType<typeof katalonLocator>, value: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  const isEditable = await locator.isEditable().catch(() => false);

  if (isEditable) {
    await locator.fill(value);
    return;
  }

  await locator.evaluate((element) => {
    const input = element as HTMLInputElement;
    input.removeAttribute('readonly');
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await locator.click({ force: true });
  await locator.pressSequentially(value, { delay: 25 });
}

function deriveImpressionGoal(cpmValue?: string | null, budgetValue?: string | null): string | undefined {
  const cpm = Number(cpmValue);
  const budget = Number(budgetValue);
  if (!Number.isFinite(cpm) || !Number.isFinite(budget) || cpm <= 0 || budget <= 0) {
    return undefined;
  }

  return String(Math.round((budget * 1000) / cpm));
}

async function clickWithOptionalDialog(page: Page, locator: ReturnType<typeof katalonLocator>): Promise<void> {
  const handler = (dialog: Dialog) => {
    void dialog.accept().catch(() => {});
  };
  page.on('dialog', handler);
  try {
    await locator.waitFor({ state: 'visible' });
    await locator.evaluate((element) => {
      (element as HTMLElement).click();
    });
    await page.waitForTimeout(250);
  } finally {
    page.off('dialog', handler);
  }
}

async function clickPageLocatorWithOptionalDialog(page: Page, locator: ReturnType<Page['locator']>): Promise<void> {
  const handler = (dialog: Dialog) => {
    void dialog.accept().catch(() => {});
  };
  page.on('dialog', handler);
  try {
    await locator.waitFor({ state: 'visible' });
    await locator.evaluate((element) => {
      (element as HTMLElement).click();
    });
    await page.waitForTimeout(250);
  } finally {
    page.off('dialog', handler);
  }
}

async function sendUntilGone(page: Page, button: ReturnType<typeof katalonLocator>): Promise<void> {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const visible = await button.isVisible().catch(() => false);
    if (!visible) {
      return;
    }

    const enabled = await button.isEnabled().catch(() => false);
    if (!enabled) {
      return;
    }

    await clickWithOptionalDialog(page, button);
    await page.waitForTimeout(1000);
  }
}

export async function openBackendDealCreatePage(page: Page): Promise<void> {
  await page.goto(resolveBackendRoute(page, '/dpm/deals/create'), { waitUntil: 'domcontentloaded' });
  await expect(katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Save Deal Button')).toBeVisible();
}

export async function createBackendDeal(page: Page, values: DealsCreationFlowValues): Promise<void> {
  await openBackendDealCreatePage(page);

  if (values.useExistingClient) {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Agency Dropdown').selectOption({
      label: values.clientName
    });
  } else {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Create New Client Button'
    ).click();

    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Name Input').fill(
      values.clientName
    );

    if (values.clientSalesforceAccountId) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Salesforce Account ID Input'
      ).fill(values.clientSalesforceAccountId);
    }

    if (values.clientPermissionGroup) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Permission Group Dropdown'
      ).selectOption({ label: values.clientPermissionGroup });
    }

    if (values.clientType) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Type Dropdown'
      ).selectOption({ label: values.clientType });
    }

    if (values.clientTarget) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Target Dropdown'
      ).selectOption({ label: values.clientTarget });
    }

    if (values.clientShowDunsNumberOrAnalyticsReport) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Show Duns Number On Analytics Report Dropdown'
      ).selectOption({ label: values.clientShowDunsNumberOrAnalyticsReport });
    }

    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Create Client Modal Button'
    ).click();

    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Form/Create Client Modal Button'
    ).waitFor({ state: 'hidden' });
  }

  if (values.clientRelationship) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Client Relationship Dropdown'
    ).selectOption({ label: values.clientRelationship });
  }

  if (values.retentionStatus) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Client Information/Retention Status Dropdown'
    ).selectOption({ label: values.retentionStatus });
  }

  await typeIntoLegacyInput(
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Advertiser Name Input'),
    values.advertiserName
  );
  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Campaign Name Input').fill(
    values.campaignName
  );

  for (let index = 0; index < values.contacts.length; index += 1) {
    const contact = values.contacts[index];
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Add Contact Button').click();
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Contact Name Input',
      { contactNo: String(index) }
    ).fill(contact.name);
    await katalonLocator(
      page,
      'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Contacts/Contact Email Input',
      { contactNo: String(index) }
    ).fill(contact.email);
  }

  if (values.salesPerson) {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Sales Person Dropdown').selectOption({
      label: values.salesPerson
    });
  }

  if (values.revOpsPerson) {
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Rev Ops Person Dropdown').selectOption({
      label: values.revOpsPerson
    });
  }

  await selectMultiple(
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/KPI Objectives Multiselect'),
    values.kpiObjectives
  );
  await selectMultiple(
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Deal Information/Products Of Interest Multiselect'),
    values.productsOfInterest
  );

  await fillRichTextFrame(page, '#dpmaudience_deal_targetAudience_ifr', values.targetAudience);
  await fillRichTextFrame(page, '#dpmaudience_deal_geoTarget_ifr', values.geoTargeting);
  await fillRichTextFrame(page, '#dpmaudience_deal_kpiNotes_ifr', values.kpiNotes);

  if ((values.dealType || '').toLowerCase() === 'pmp') {
    const pmpCheckbox = katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/PMP Information/PMP Checkbox');
    await pmpCheckbox.check();

    if (values.priceModel) {
      await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/PMP Information/Price Model Dropdown').selectOption({
        label: values.priceModel
      });
    }
  }

  for (let index = 0; index < values.subdeals.length; index += 1) {
    const subdeal = values.subdeals[index];
    const subDealIndex = String(index);

    if (index > 0) {
      await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Create Subdeal Button').click();
    }

    await setDateInput(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Start Date Input', { subDealIndex }),
      subdeal.subDealStartDate || undefined
    );
    await setDateInput(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/End Date Input', { subDealIndex }),
      subdeal.subDealEndDate || undefined
    );

    if (subdeal.subDealDescription) {
      await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/textarea_SubDeals_Description', {
        subDealIndex
      }).fill(subdeal.subDealDescription);
    }
    if (subdeal.subDealCategory) {
      await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Category Dropdown', {
        subDealIndex
      }).selectOption({ label: subdeal.subDealCategory });
    }
    if (subdeal.subDealMediaType) {
      await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Media Type Dropdown', {
        subDealIndex
      }).selectOption({ label: subdeal.subDealMediaType });
    }
    await fillIfVisible(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Impression Goal Input', {
        subDealIndex
      }),
      subdeal.subDealImpressionGoal ||
        deriveImpressionGoal(subdeal.subDealCPM || subdeal.quotedCPM, subdeal.pmpExpectedBudget) ||
        undefined
    );
    await fillIfVisible(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/CPM Input', {
        subDealIndex
      }),
      subdeal.subDealCPM || subdeal.quotedCPM || undefined
    );
    await fillIfVisible(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Budget Input', {
        subDealIndex
      }),
      subdeal.pmpExpectedBudget || undefined
    );
    await fillIfVisible(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/Quoted CPM', {
        subDealIndex
      }),
      subdeal.quotedCPM || undefined
    );
    await fillIfVisible(
      katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Sub Deals/PMP Expected Budget', {
        subDealIndex
      }),
      subdeal.pmpExpectedBudget || undefined
    );
  }

  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Modify Deal/Save Deal Button').click();
  await expect(katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Deal ID TD')).toBeVisible();
}

export async function uploadDealAttachments(page: Page, values: DealsCreationFlowValues): Promise<void> {
  const attachmentModal = page.locator('#uploadNewAttachmentModal');
  const uploadErrorMessage = /Was unable to upload files/i;

  for (const attachment of values.attachments) {
    const modalVisible = await attachmentModal.isVisible().catch(() => false);
    if (!modalVisible) {
      await katalonLocator(
        page,
        'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/button_FileAttachments_AddNewAttachment'
      ).click();
      await attachmentModal.waitFor({ state: 'visible' });
    }

    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/select_FileAttachments_Category').selectOption({
      label: attachment.category
    });
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/input_FileAttachments_NameDescription').fill(
      attachment.nameDescription
    );

    const uploadPath = path.resolve(
      process.cwd(),
      '..',
      'katalon-test-cases',
      'Data Files',
      'Backend',
      'SpotlightPageAttachments',
      attachment.fileName
    );
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/input_FileAttachments_SelectFile').setInputFiles(
      uploadPath
    );
    await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/File-Attachments/button_FileAttachments_Upload').click();

    const uploadError = attachmentModal.getByText(uploadErrorMessage).first();
    const uploadOutcome = await Promise.race([
      attachmentModal.waitFor({ state: 'hidden', timeout: 10000 }).then(() => 'hidden' as const),
      uploadError.waitFor({ state: 'visible', timeout: 10000 }).then(() => 'error' as const)
    ]).catch(() => 'timeout' as const);

    if (uploadOutcome === 'error') {
      throw new Error(`Attachment upload failed for "${attachment.fileName}" with a backend validation error.`);
    }

    if (uploadOutcome !== 'hidden') {
      throw new Error(`Attachment upload did not complete for "${attachment.fileName}" before the modal timed out.`);
    }
  }
}

export async function updateInFlightSubdealDescription(page: Page, values: DealsCreationFlowValues): Promise<void> {
  if (!values.inflightSubDealDescription) {
    return;
  }

  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/textarea_InFlight_SubDeal_Description').fill(
    values.inflightSubDealDescription
  );
  await clickWithOptionalDialog(
    page,
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/a_InFlight_SubDeal_DescriptionRevertCell')
  );

  const subdealCheckbox = katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/input_InFlight_Subdeal_Checkbox');
  if (await subdealCheckbox.isVisible().catch(() => false)) {
    const checked = await subdealCheckbox.isChecked().catch(() => false);
    if (!checked) {
      await clickPageLocatorWithOptionalDialog(page, subdealCheckbox);
    }
  }

  const updateStatusButton = katalonLocator(
    page,
    'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_UpdateSubdealsStatus'
  );
  if (await updateStatusButton.isVisible().catch(() => false)) {
    await clickWithOptionalDialog(page, updateStatusButton);
  }

  await page.evaluate(() => window.scrollTo(0, 0));

  await sendUntilGone(
    page,
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_SendToInflight')
  );
  await sendUntilGone(
    page,
    katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/button_InFlight_SendToDone')
  );

  const createOrderLink = katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/In-Flight/a_InFlight_SubDeal_CreateOrder', {
    ALIlinkRow: '1'
  });
  const curateLineItemInput = katalonLocator(
    page,
    'Object Repository/Backend/Sales Dashboard/Spotlight Page/Complete-Deal/input_CompleteDeal_CurateLineItemId',
    { lineNumber: '1' }
  );
  const hasCurateLineItem = await curateLineItemInput.isVisible().catch(() => false);
  if (!hasCurateLineItem && (await createOrderLink.isVisible().catch(() => false))) {
    await createOrderLink.click();
  }
}
