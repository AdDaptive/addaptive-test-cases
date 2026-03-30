import type { ConsoleMessage, Page, Request, Response } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export async function loginToFrontend(page: Page, username: string, password: string, baseUrl: string): Promise<void> {
  const usernameInput = katalonLocator(page, 'Object Repository/Frontend/Login-Page/inputUserName');
  const passwordInput = katalonLocator(page, 'Object Repository/Frontend/Login-Page/inputPassword');
  const loginButton = katalonLocator(page, 'Object Repository/Frontend/Login-Page/buttonLogin');
  const loginDiagnostics = createFrontendLoginDiagnostics(page);

  await page.goto(baseUrl);
  const loginFormVisible = await usernameInput.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);

  if (loginFormVisible) {
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  }

  await waitForFrontendSessionReady(page, loginDiagnostics).finally(() => {
    loginDiagnostics.dispose();
  });
}

export async function waitForFrontendSessionReady(page: Page, diagnostics?: FrontendLoginDiagnostics): Promise<void> {
  const usernameInput = katalonLocator(page, 'Object Repository/Frontend/Login-Page/inputUserName');
  const createOrderLink = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Create-Order/a_Create Order');
  const audiencesTab = katalonLocator(page, 'Object Repository/Frontend/Audiences/a_AudiencesTab');
  const impersonateIcon = katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon');

  await page.waitForLoadState('domcontentloaded').catch(() => undefined);

  await Promise.any([
    createOrderLink.waitFor({ state: 'visible', timeout: 15000 }),
    audiencesTab.waitFor({ state: 'visible', timeout: 15000 }),
    impersonateIcon.waitFor({ state: 'visible', timeout: 15000 }),
    usernameInput.waitFor({ state: 'hidden', timeout: 15000 })
  ]).catch(() => {
    const details = diagnostics?.summarize();
    throw new Error(
      details
        ? `Frontend login did not complete. ${details}`
        : 'Frontend login did not complete. The app shell never became visible after submitting credentials.'
    );
  });
}

type FrontendLoginDiagnostics = {
  dispose: () => void;
  summarize: () => string | undefined;
};

function createFrontendLoginDiagnostics(page: Page): FrontendLoginDiagnostics {
  const requestFailures: string[] = [];
  const responseFailures: string[] = [];
  const consoleErrors: string[] = [];
  const relevantUrlPattern = /\/ng-api\/v2\/account\/(?:login|current-user)\b/i;

  const onRequestFailed = (request: Request): void => {
    if (!relevantUrlPattern.test(request.url())) {
      return;
    }

    const failureText = request.failure()?.errorText || 'unknown failure';
    requestFailures.push(`${request.method()} ${request.url()} failed: ${failureText}`);
  };

  const onResponse = (response: Response): void => {
    if (!relevantUrlPattern.test(response.url()) || response.status() < 400) {
      return;
    }

    responseFailures.push(`${response.request().method()} ${response.url()} returned ${response.status()}`);
  };

  const onConsole = (message: ConsoleMessage): void => {
    if (message.type() !== 'error') {
      return;
    }

    const text = message.text();
    if (!relevantUrlPattern.test(text) && !/cors|failed to load resource|net::/i.test(text)) {
      return;
    }

    consoleErrors.push(text);
  };

  page.on('requestfailed', onRequestFailed);
  page.on('response', onResponse);
  page.on('console', onConsole);

  return {
    dispose: () => {
      page.off('requestfailed', onRequestFailed);
      page.off('response', onResponse);
      page.off('console', onConsole);
    },
    summarize: () => {
      const details = [...requestFailures, ...responseFailures, ...consoleErrors];
      if (details.length === 0) {
        return undefined;
      }

      return details.slice(0, 3).join(' | ');
    }
  };
}

export async function impersonateFrontendUser(page: Page, email: string): Promise<void> {
  if (!email) {
    return;
  }

  const impersonateModal = katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/Impersonate User Modal');
  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon').waitFor({
    state: 'visible'
  });
  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon').click();
  await impersonateModal.waitFor({ state: 'visible' });

  const impersonateInput = katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/input_ImpersonateUserEmail');
  await impersonateInput.fill('');
  await impersonateInput.pressSequentially(email, { delay: 50 });

  const exactOption = page
    .locator('ngb-typeahead-window button')
    .filter({ hasText: new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') })
    .first();
  const firstOption = page.locator('ngb-typeahead-window button').first();
  const recentUserExactOption = page
    .locator('table td')
    .filter({ hasText: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') })
    .first();

  const typeaheadVisible = await Promise.race([
    exactOption.waitFor({ state: 'visible', timeout: 5000 }),
    firstOption.waitFor({ state: 'visible', timeout: 5000 })
  ])
    .then(() => true)
    .catch(() => false);

  if (typeaheadVisible && (await exactOption.isVisible().catch(() => false))) {
    await exactOption.click();
  } else if (typeaheadVisible) {
    await firstOption.click();
  } else if (await recentUserExactOption.isVisible().catch(() => false)) {
    await recentUserExactOption.click();
  } else {
    throw new Error(`Impersonation suggestions did not appear for "${email}", and no matching recent user was available.`);
  }

  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/button_Switch to User').click();
  await impersonateModal.waitFor({ state: 'hidden' });
}
