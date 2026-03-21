import { test, expect } from '../../fixtures/session';

test('frontend: login and impersonate configured user', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();
  await expect(page).toHaveURL(/addaptive/i);

  await impersonateConfiguredUser();
  await expect(page).toHaveURL(/addaptive/i);
});
