import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export type BackendClientUpsertOptions = {
  action: 'create' | 'update';
  existingClientName?: string;
  clientName?: string;
  isActive?: string;
  tier?: string;
  salesforceAccountId?: string;
  type?: string;
  target?: string;
  sso?: string;
  dpmCpm?: string;
  adServers?: string[];
  isDelinquent?: boolean;
};

async function openClientsPage(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Sidebar Anchor', { sidebarItem: 'Clients' }).click();
}

async function openClientA360Settings(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Client Settings Headers', {
    clientHeader: 'A360 Settings'
  }).click();
}

export async function createOrUpdateBackendClient(page: Page, options: BackendClientUpsertOptions): Promise<void> {
  await openClientsPage(page);

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Actions Menu').click();
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').waitFor({ state: 'visible' });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').click();
  } else {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Client Name Filter Dropdown'
    ).selectOption({
      label: options.existingClientName || ''
    });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Edit Client Button', {
      clientName: options.clientName || options.existingClientName || ''
    }).click();
  }

  await openClientA360Settings(page);

  if (options.isActive) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Is Active Dropdown'
    ).selectOption({ label: options.isActive });
  }
  if (options.clientName) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Name Input'
    ).fill(options.clientName);
  }
  if (options.tier) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Tier Dropdown'
    ).selectOption({ label: options.tier });
  }
  if (options.salesforceAccountId) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Salesforce Account ID Input'
    ).fill(options.salesforceAccountId);
  }
  if (options.type) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Type Dropdown').selectOption({
      label: options.type
    });
  }
  if (options.target) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Target Dropdown').selectOption({
      label: options.target
    });
  }
  if (options.sso) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/SSO Dropdown').selectOption({
      label: options.sso
    });
  }
  if (options.dpmCpm) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/DPM CPM Input').fill(
      options.dpmCpm
    );
  }
  for (const adServer of options.adServers || []) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Ad Server Multiselect'
    ).selectOption({ label: adServer });
  }

  await openClientA360Settings(page);

  if (options.action === 'update' && typeof options.isDelinquent === 'boolean') {
    const checkbox = katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Billing Tab/Delinquent Flag Checkbox'
    );
    const checked = await checkbox.isChecked().catch(() => false);
    if (checked !== options.isDelinquent) {
      if (options.isDelinquent) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }
  }

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Create and Return to List Button').click();
  } else {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Update and Close Button').click();
  }
}
