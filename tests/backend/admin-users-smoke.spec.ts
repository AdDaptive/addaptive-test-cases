import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { createOrUpdateBackendUser } from '../../pages/backend-admin-users';
import { config } from '../../utils/config';

test('backend: admin users create/update flow is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const username = config.loginUser;
  const password = config.loginPassword;
  const testEmail = config.testUserEmail;

  test.skip(!baseUrl || !username || !password || !testEmail, 'Backend URL, admin credentials, and ADDAPTIVE_TEST_USER_EMAIL are required.');

  await loginToBackend(page, username, password, baseUrl);

  await createOrUpdateBackendUser(page, {
    action: 'update',
    existingEmail: testEmail
  });
});

test('backend: admin users create flow is scriptable', async ({ page }) => {
  const baseUrl = config.backendUrl;
  const username = config.loginUser;
  const password = config.loginPassword;
  const createEmail = config.testCreateUserEmail;

  test.skip(
    !baseUrl || !username || !password || !createEmail,
    'Backend URL, admin credentials, and ADDAPTIVE_TEST_CREATE_USER_EMAIL are required.'
  );

  await loginToBackend(page, username, password, baseUrl);

  await createOrUpdateBackendUser(page, {
    action: 'create',
    email: createEmail,
    password: config.testCreateUserPassword,
    status: config.testCreateUserStatus,
    client: config.testCreateUserClient,
    groups: config.testCreateUserGroup ? [config.testCreateUserGroup] : undefined,
    firstName: config.testCreateUserFirstName,
    lastName: config.testCreateUserLastName
  });
});
