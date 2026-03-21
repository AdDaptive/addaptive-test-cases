const path = require('path');
const { readText, writeText } = require('./shared');

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(repoRoot, 'migration-output', 'test-case-manifest.json');
const generatedStubsPath = path.join(repoRoot, 'migration-output', 'generated', 'generated-stubs.json');
const implementedCoverage = [
  {
    specPath: 'tests/smoke/login.spec.ts',
    covers: []
  },
  {
    specPath: 'tests/frontend/login-and-impersonate.spec.ts',
    covers: ['Test Cases/Frontend/T0 - Login and Impersonate']
  },
  {
    specPath: 'tests/backend/login.spec.ts',
    covers: ['Test Cases/Backend/Authentication/Login']
  },
  {
    specPath: 'tests/api/current-user.spec.ts',
    covers: []
  },
  {
    specPath: 'tests/api/backend-login.spec.ts',
    covers: ['Test Cases/Backend/Authentication/API Login']
  },
  {
    specPath: 'tests/backend/admin-users-smoke.spec.ts',
    covers: [
      'Test Cases/Frontend/General Modules/Backend/Backend Admin/User/Create Update User',
      'Test Cases/Frontend/General Modules/Backend/Backend Admin/User/Creat-User-Admin-page'
    ]
  },
  {
    specPath: 'tests/frontend/order-entry-basic-setup.spec.ts',
    covers: ['Test Cases/Frontend/Orders/Basic Setup Tab/Basic Setup']
  },
  {
    specPath: 'tests/frontend/order-entry-creatives.spec.ts',
    covers: [
      'Test Cases/Frontend/Orders/Creatives Tab/Creatives Tab',
      'Test Cases/Frontend/Orders/Creatives Tab/Add Modify Creatives'
    ]
  },
  {
    specPath: 'tests/frontend/order-entry-budget-flight.spec.ts',
    covers: ['Test Cases/Frontend/Orders/Budget Flight Tab/Budget and Flight Tab']
  },
  {
    specPath: 'tests/frontend/order-entry-inventory.spec.ts',
    covers: [
      'Test Cases/Frontend/Orders/Inventory Tab/Inventory Tab',
      'Test Cases/Frontend/Orders/Inventory Tab/Verify Inventory Tab'
    ]
  },
  {
    specPath: 'tests/frontend/order-entry-splits.spec.ts',
    covers: [
      'Test Cases/Frontend/Orders/Splits Tab/Add Modify Split',
      'Test Cases/Frontend/Orders/Splits Tab/Splits Tab',
      'Test Cases/Frontend/Orders/Splits Tab/Verify Splits Tab'
    ]
  },
  {
    specPath: 'tests/frontend/order-entry-verify-tabs.spec.ts',
    covers: ['Test Cases/Frontend/Orders/Verify Tabs']
  },
  {
    specPath: 'tests/backend/deal-stage-send-to-operations.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/Deal Entry Modules/3_Close_Deal_Send_To_Operations']
  },
  {
    specPath: 'tests/backend/deal-stage-closed-won.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/Deal Entry Modules/9_Close_Deal_Send_To_Closed_Won']
  },
  {
    specPath: 'tests/backend/deal-stage-in-flight.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/Deal Entry Modules/10_Close_Deal_Send_To_In_Flight']
  },
  {
    specPath: 'tests/backend/inflight-pending.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/inflght_pending/Inflight_pending_module']
  },
  {
    specPath: 'tests/frontend/insight-studio-widgets.spec.ts',
    covers: ['Test Cases/Frontend/Insight Studio/Add Modify Widgets']
  },
  {
    specPath: 'tests/frontend/audiences-first-party-filter-toggle.spec.ts',
    covers: ['Test Cases/Frontend/Audiences/1st Party/New Test Case']
  },
  {
    specPath: 'tests/frontend/audiences-first-party-match-criteria.spec.ts',
    covers: ['Test Cases/Frontend/Audiences/1st Party/Add Match Criteria']
  },
  {
    specPath: 'tests/backend/admin-clients-smoke.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/Backend Admin/Client/Create Client']
  },
  {
    specPath: 'tests/frontend/order-entry-end-to-end.spec.ts',
    covers: ['Test Cases/Frontend/T1 - Order Entry - End to End']
  },
  {
    specPath: 'tests/frontend/insight-studio-end-to-end.spec.ts',
    covers: ['Test Cases/Frontend/Insight Studio/Insight Studio End to End']
  },
  {
    specPath: 'tests/backend/deal-lifecycle-smoke.spec.ts',
    covers: [
      'Test Cases/Backend/Deal_Creation_to_Close_Won_All_Modules',
      'Test Cases/Frontend/General Modules/Backend/Curate Workflow/1_Create_and_Curate_a_Deal'
    ]
  },
  {
    specPath: 'tests/backend/create-order-from-subdeal.spec.ts',
    covers: ['Test Cases/Frontend/General Modules/Backend/Deal Entry Modules/11_Close_Deal_Create_Order_From_SubDeal']
  }
];

function main() {
  const manifest = JSON.parse(readText(manifestPath));
  const generated = JSON.parse(readText(generatedStubsPath));

  const implementedIds = new Set(implementedCoverage.flatMap((item) => item.covers));
  const coveredIds = new Set(generated.map((item) => item.testCaseId));

  for (const id of implementedIds) {
    coveredIds.add(id);
  }

  const generatedSimple = manifest.filter((item) => item.complexity === 'simple' && coveredIds.has(item.testCaseId));
  const remainingModerate = manifest.filter((item) => item.complexity === 'moderate' && !coveredIds.has(item.testCaseId));
  const remainingComplex = manifest.filter((item) => item.complexity === 'complex' && !coveredIds.has(item.testCaseId));

  const lines = [
    '# Playwright Migration Status',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Coverage',
    '',
    `- Real Playwright specs implemented: ${implementedCoverage.length}`,
    `- Generated Playwright draft specs: ${generated.length}`,
    `- Katalon cases with implemented equivalents: ${implementedIds.size}`,
    `- Simple Katalon cases covered: ${generatedSimple.length}`,
    `- Moderate cases remaining: ${remainingModerate.length}`,
    `- Complex cases remaining: ${remainingComplex.length}`,
    '',
    '## Next Moderate Cases',
    ''
  ];

  for (const item of remainingModerate.slice(0, 20)) {
    lines.push(`- ${item.testCaseId}`);
  }

  lines.push('', '## Next Complex Cases', '');
  for (const item of remainingComplex.slice(0, 20)) {
    lines.push(`- ${item.testCaseId}`);
  }

  writeText(path.join(repoRoot, 'migration-output', 'playwright-migration-status.md'), `${lines.join('\n')}\n`);
  process.stdout.write('Wrote migration-output/playwright-migration-status.md\n');
}

main();
