import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export type BackendUserUpsertOptions = {
  action: 'create' | 'update';
  existingEmail?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  groups?: string[];
  client?: string;
  password?: string;
  status?: string;
  dpmSalesPerson?: string;
  dpmAccountManager?: string;
  dpmPlanningTeam?: string;
};

export async function openBackendUsersPage(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Sidebar Anchor', { sidebarItem: 'Users' }).click();
}

export async function createOrUpdateBackendUser(page: Page, options: BackendUserUpsertOptions): Promise<void> {
  await openBackendUsersPage(page);

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Actions Menu').click();
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').waitFor({ state: 'visible' });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').click();
  } else {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Listing Page/Email Filter Input').selectOption({
      label: options.existingEmail || ''
    });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Submit Filters Button').click();
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Listing Page/Edit User Button', {
      existingEmail: options.existingEmail || ''
    }).waitFor({ state: 'visible' });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Listing Page/Edit User Button', {
      existingEmail: options.existingEmail || ''
    }).click();
  }

  await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Email Input').waitFor({
    state: 'visible'
  });

  if (options.email) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Email Input').fill(options.email);
  }
  if (options.status) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/User Status Dropdown').selectOption({
      label: options.status
    });
  }
  if (options.password) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Password Input').fill(
      options.password
    );
  }
  if (options.client) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Client Dropdown').selectOption({
      label: options.client
    });
  }
  if (options.firstName) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/First Name Input').fill(
      options.firstName
    );
  }
  if (options.lastName) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Last Name Input').fill(
      options.lastName
    );
  }

  for (const group of options.groups || []) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/Groups Dropdown').selectOption({
      label: group
    });
  }

  if (options.dpmAccountManager) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Account Manager Dropdown'
    ).selectOption({ label: options.dpmAccountManager });
  }
  if (options.dpmPlanningTeam) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Planning Team Dropdown').selectOption({
      label: options.dpmPlanningTeam
    });
  }
  if (options.dpmSalesPerson) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Users/Create Update/DPM Sales Person Dropdown').selectOption({
      label: options.dpmSalesPerson
    });
  }

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Create and Return to List Button').click();
  } else {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Update and Close Button').click();
  }
}

export async function expectBackendUsersPage(page: Page): Promise<void> {
  await expect(page).toHaveURL(/user|users|admin/i);
}
