const fs = require('fs');
const path = require('path');
const { readText, slugify, writeText } = require('./shared');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'migration-output', 'test-case-manifest.json');
const targetRoot = path.join(repoRoot, 'playwright', 'tests', 'generated');

function parseLimit(argv) {
  const limitArg = argv.find((value) => value.startsWith('--limit='));
  return limitArg ? Number(limitArg.split('=')[1]) : 10;
}

function toTargetPath(testCaseId) {
  const withoutPrefix = testCaseId.replace(/^Test Cases\//, '');
  const parts = withoutPrefix.split('/');
  const fileName = `${slugify(parts.pop())}.spec.ts`;
  return path.join(targetRoot, ...parts.map(slugify), fileName);
}

function ensureObjectPath(name) {
  return name.startsWith('Object Repository/') ? name : `Object Repository/${name}`;
}

function resolveExpression(expression) {
  const value = expression.trim();

  if (value === 'username') {
    return "process.env.ADDAPTIVE_FRONTEND_USERNAME || ''";
  }
  if (value === 'password') {
    return "process.env.ADDAPTIVE_FRONTEND_PASSWORD || ''";
  }
  if (value === 'impersonateUserProfile') {
    return "process.env.ADDAPTIVE_IMPERSONATE_USER || ''";
  }

  const globalMatch = value.match(/^GlobalVariable\.([A-Za-z0-9_]+)$/);
  if (globalMatch) {
    const variableName = globalMatch[1];
    if (variableName === 'urlAdDaptiveFrontend') {
      return "process.env.ADDAPTIVE_FRONTEND_URL || ''";
    }
    if (variableName === 'urlAdDaptiveBackend') {
      return "process.env.ADDAPTIVE_BACKEND_URL || ''";
    }
    return `process.env.KATALON_${variableName.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase()} || ''`;
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return JSON.stringify(value.slice(1, -1));
  }

  return "''";
}

function translateScript(item) {
  if (!item.scriptPath) {
    return { lines: [], needsLocatorHelper: false };
  }

  const scriptPath = path.join(repoRoot, item.scriptPath);
  const script = readText(scriptPath);
  const lines = [];
  let needsLocatorHelper = false;
  let needsExpect = false;
  let insideSwitch = false;
  let notedUnsupportedSwitch = false;

  for (const rawLine of script.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('import ')) {
      continue;
    }

    if (line.startsWith('switch ')) {
      insideSwitch = true;
      if (!notedUnsupportedSwitch) {
        lines.push('  // TODO: manual conversion required for Katalon switch/case logic.');
        notedUnsupportedSwitch = true;
      }
      continue;
    }

    if (insideSwitch) {
      if (line === '}') {
        insideSwitch = false;
      }
      continue;
    }

    if (line === '}' || line === 'break') {
      continue;
    }

    let match = line.match(/^WebUI\.callTestCase\(findTestCase\('([^']+)'.*$/);
    if (match) {
      if (match[1] === 'Frontend/General Modules/Open Application and Login') {
        lines.push('  await loginAsDefaultUser();');
      } else if (match[1] === 'Frontend/General Modules/Impersonate User') {
        lines.push('  await impersonateConfiguredUser();');
      } else {
        lines.push(`  // TODO: convert nested Katalon test case call: ${match[1]}`);
      }
      continue;
    }

    match = line.match(/^WebUI\.navigateToUrl\((.+)\)$/);
    if (match) {
      lines.push(`  await page.goto(${resolveExpression(match[1])});`);
      continue;
    }

    match = line.match(/^WebUI\.waitForElement(?:Visible|Present)\(findTestObject\('([^']+)'\),\s*\d+\)$/);
    if (match) {
      needsLocatorHelper = true;
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').waitFor({ state: 'visible' });`);
      continue;
    }

    match = line.match(/^WebUI\.waitForElementNotPresent\(findTestObject\('([^']+)'\),\s*\d+\)$/);
    if (match) {
      needsLocatorHelper = true;
      needsExpect = true;
      lines.push(`  await expect(katalonLocator(page, '${ensureObjectPath(match[1])}')).toHaveCount(0);`);
      continue;
    }

    match = line.match(/^WebUI\.set(?:Encrypted)?Text\(findTestObject\('([^']+)'\),\s*(.+)\)$/);
    if (match) {
      needsLocatorHelper = true;
      const expression = resolveExpression(match[2]);
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').fill(String(${expression}));`);
      if (line.includes('setEncryptedText')) {
        lines.push('  // TODO: verify encrypted Katalon secrets are replaced with plaintext env vars.');
      }
      continue;
    }

    match = line.match(/^WebUI\.clearText\(findTestObject\('([^']+)'\)\)$/);
    if (match) {
      needsLocatorHelper = true;
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').fill('');`);
      continue;
    }

    match = line.match(/^WebUI\.sendKeys\(findTestObject\('([^']+)'\),\s*(.+)\)$/);
    if (match) {
      needsLocatorHelper = true;
      if (match[2].includes('Keys.chord(Keys.ENTER)')) {
        lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').press('Enter');`);
      } else {
        lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').pressSequentially(String(${resolveExpression(match[2])}));`);
      }
      continue;
    }

    match = line.match(/^WebUI\.click\(findTestObject\('([^']+)'\)\)$/);
    if (match) {
      needsLocatorHelper = true;
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').click();`);
      continue;
    }

    match = line.match(/^WebUI\.selectOptionByLabel\(findTestObject\('([^']+)'\),\s*(.+),\s*false\)$/);
    if (match) {
      needsLocatorHelper = true;
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').selectOption({ label: String(${resolveExpression(match[2])}) });`);
      continue;
    }

    match = line.match(/^WebUI\.uploadFile\(findTestObject\('([^']+)'\),\s*(.+)\)$/);
    if (match) {
      needsLocatorHelper = true;
      lines.push(`  await katalonLocator(page, '${ensureObjectPath(match[1])}').setInputFiles(String(${resolveExpression(match[2])}));`);
      continue;
    }

    match = line.match(/^WebUI\.verifyElement(?:Present|Visible)\(findTestObject\('([^']+)'\),\s*\d+\)$/);
    if (match) {
      needsLocatorHelper = true;
      needsExpect = true;
      lines.push(`  await expect(katalonLocator(page, '${ensureObjectPath(match[1])}')).toBeVisible();`);
      continue;
    }

    match = line.match(/^WebUI\.verifyElementNot(?:Present|Visible)\(findTestObject\('([^']+)'\),\s*\d+\)$/);
    if (match) {
      needsLocatorHelper = true;
      needsExpect = true;
      lines.push(`  await expect(katalonLocator(page, '${ensureObjectPath(match[1])}')).toHaveCount(0);`);
      continue;
    }

    match = line.match(/^WebUI\.verifyElementText\(findTestObject\('([^']+)'\),\s*(.+)\)$/);
    if (match) {
      needsLocatorHelper = true;
      needsExpect = true;
      lines.push(`  await expect(katalonLocator(page, '${ensureObjectPath(match[1])}')).toHaveText(String(${resolveExpression(match[2])}));`);
      continue;
    }

    if (line.startsWith('WebUI.openBrowser(')) {
      lines.push('  // TODO: Katalon opened a fresh browser instance here.');
      continue;
    }
  }

  return { lines, needsLocatorHelper, needsExpect };
}

function buildSpec(item) {
  const targetPath = toTargetPath(item.testCaseId);
  const fixtureImport = path
    .relative(path.dirname(targetPath), path.join(repoRoot, 'playwright', 'fixtures', 'session'))
    .split(path.sep)
    .join('/');
  const locatorImport = path
    .relative(path.dirname(targetPath), path.join(repoRoot, 'playwright', 'locators', 'resolve'))
    .split(path.sep)
    .join('/');
  const translation = translateScript(item);
  const steps = [...translation.lines];

  if (steps.length === 0) {
    if (item.callTestCases.includes('Frontend/General Modules/Open Application and Login')) {
      steps.push('  await loginAsDefaultUser();');
    }
    if (item.callTestCases.includes('Frontend/General Modules/Impersonate User')) {
      steps.push('  await impersonateConfiguredUser();');
    }
  }

  if (steps.length === 0) {
    steps.push('  test.fixme(true, \'Generated stub needs flow-specific implementation.\');');
  }

  steps.push('  // TODO: replace generated steps with feature-specific Playwright interactions.');
  steps.push(`  // Original Katalon test case: ${item.testCaseId}`);

  const fixtureImports = translation.needsExpect ? '{ test, expect }' : '{ test }';
  const specLines = [`import ${fixtureImports} from '${fixtureImport.startsWith('.') ? fixtureImport : `./${fixtureImport}`}';`];

  if (translation.needsLocatorHelper) {
    specLines.push(`import { katalonLocator } from '${locatorImport.startsWith('.') ? locatorImport : `./${locatorImport}`}';`);
  }

  specLines.push(
    '',
    `test('${item.name}', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {`,
    ...steps,
    '});',
    ''
  );

  return specLines.join('\n');
}

function main() {
  if (!fs.existsSync(manifestPath)) {
    process.stderr.write('Missing migration-output/test-case-manifest.json. Run npm run audit:katalon first.\n');
    process.exit(1);
  }

  const manifest = JSON.parse(readText(manifestPath));
  const limit = parseLimit(process.argv.slice(2));
  const prioritized = manifest.filter((item) => item.testCaseId === 'Test Cases/Frontend/T0 - Login and Impersonate');
  const simpleCases = manifest.filter(
    (item) => item.complexity === 'simple' && item.testCaseId !== 'Test Cases/Frontend/T0 - Login and Impersonate'
  );
  const candidates = prioritized.concat(simpleCases).slice(0, limit);
  const generated = [];

  for (const item of candidates) {
    const targetPath = toTargetPath(item.testCaseId);
    writeText(targetPath, buildSpec(item));
    generated.push({
      testCaseId: item.testCaseId,
      name: item.name,
      complexity: item.complexity,
      targetPath: path.relative(repoRoot, targetPath).split(path.sep).join('/')
    });
  }

  writeText(
    path.join(repoRoot, 'migration-output', 'generated', 'generated-stubs.json'),
    `${JSON.stringify(generated, null, 2)}\n`
  );

  process.stdout.write(`Generated ${candidates.length} stub specs\n`);
}

main();
