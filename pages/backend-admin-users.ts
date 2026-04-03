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

function stableUserGroupsSelect(page: Page) {
  return page.locator('select[name$="[groups][]"]').first();
}

function stableUserFirstNameInput(page: Page) {
  return page.locator('input[name$="[firstName]"]').first();
}

function stableUserLastNameInput(page: Page) {
  return page.locator('input[name$="[lastName]"]').first();
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
    const clientDropdown = katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Users/Create Update/Client Dropdown'
    );
    await clientDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await clientDropdown.selectOption({
      label: options.client
    });
  }
  if (options.firstName) {
    const firstNameInput = stableUserFirstNameInput(page);
    await firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await firstNameInput.fill(options.firstName);
  }
  if (options.lastName) {
    const lastNameInput = stableUserLastNameInput(page);
    await lastNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await lastNameInput.fill(options.lastName);
  }

  for (const group of options.groups || []) {
    const groupsDropdown = stableUserGroupsSelect(page);
    await groupsDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await groupsDropdown.selectOption({
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
    if (options.email) {
      await page
        .locator('.alert.alert-success')
        .filter({ hasText: `Item "${options.email}" has been successfully created.` })
        .waitFor({ state: 'visible', timeout: 15000 });
    }
  } else {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Update and Close Button').click();
  }
}

export async function expectBackendUsersPage(page: Page): Promise<void> {
  await expect(page).toHaveURL(/user|users|admin/i);
}
