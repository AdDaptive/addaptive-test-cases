import { test, expect } from '../../fixtures/session';

test('frontend smoke: login with configured user', async ({ page, loginAsDefaultUser }) => {
  await loginAsDefaultUser();
  await expect(page).toHaveURL(/addaptive/i);
});
