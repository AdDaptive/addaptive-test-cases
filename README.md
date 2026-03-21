# Addaptive Test Cases

Standalone Playwright repository for Addaptive test automation.

## Structure

- `.env`: tracked shared environment defaults for the suite
- `tests/`: Playwright specs
- `fixtures/`: shared fixtures for auth, impersonation, and bootstrap
- `utils/`: environment and helper utilities
- `locators/`: generated locator catalogs from the Katalon object repository
- `migration-tools/`: scripts used during the Katalon-to-Playwright migration

## Initial workflow

1. Run `npm run audit:katalon` to produce the Katalon inventory and migration manifest.
2. Run `npm run generate:profiles` to generate `.env` templates from Katalon profiles.
3. Run `npm run generate:locators` to generate the locator bridge.
4. Run `npm run generate:stubs` to create draft spec files for the highest-priority simple cases.
5. Replace generated selectors with semantic Playwright locators as each feature is hardened.

## Migration rule

Generated output is scaffolding only. Shared flows, waits, and assertions should be moved into fixtures and helper modules before expanding coverage.

## Order Entry End-to-End

Use the single spec when you want to run one Order Entry row. Use the batch spec when you want to generate many tests from DB-selected rows.

Single end-to-end (one row):

```bash
ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID=1 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --reporter=line
```

Single end-to-end with browser visible:

```bash
ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID=1 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --headed --reporter=line
```

Batch end-to-end using a positional range within the filtered result set:

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=create ADDAPTIVE_ORDER_ENTRY_DB_RANGE=1-20 npx playwright test tests/frontend/order-entry-end-to-end-batch.spec.ts --project=chromium --reporter=line
```

Batch end-to-end using explicit IDs:

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=edit ADDAPTIVE_ORDER_ENTRY_DB_IDS=1,4,15,20 npx playwright test tests/frontend/order-entry-end-to-end-batch.spec.ts --project=chromium --reporter=line
```

Batch filtered by ad server and action without DB selectors (runs all matching rows):

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=create npx playwright test tests/frontend/order-entry-end-to-end-batch.spec.ts --project=brave-ubuntu --reporter=line
```

Required batch filters:

1. `ADDAPTIVE_ORDER_ENTRY_AD_SERVER`
Allowed values: `MEDIAMATH`, `DFP`, `PMP`, `DPM`, `MEDIAMATH_GAM`, `TRADEDESK`
2. `ADDAPTIVE_ORDER_ENTRY_ACTION`
Allowed values: `create`, `edit`

Optional DB selectors (used by batch selection):

1. `ADDAPTIVE_ORDER_ENTRY_DB_IDS`
2. `ADDAPTIVE_ORDER_ENTRY_DB_RANGE` (1-based positional range after applying `ADDAPTIVE_ORDER_ENTRY_AD_SERVER` and `ADDAPTIVE_ORDER_ENTRY_ACTION`)
3. `ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID`

If no DB selector is provided, batch runs all rows that match the required ad server + action filters.

Note: Order Entry tab selection is now driven by a fixed per-ad-server tab map in code, not by the `display_tabs` DB field. That field is deprecated and can be removed from the DB/test data when convenient.

Convenience npm scripts:

```bash
npm run test:oe:dpm:create
npm run test:oe:dpm:edit
npm run test:oe:mm:create
npm run test:oe:mm:edit
```

## Audiences 1st-Party End-to-End

Use the single spec when you want to run one audiences row. Use the batch spec when you want to generate many tests from DB-selected rows in `audiences_suite`.

Single end-to-end by ID:

```bash
ADDAPTIVE_AUDIENCE_DB_ID=1 npx playwright test tests/frontend/audience-end-to-end.spec.ts --project=chromium --reporter=line
```

Single end-to-end by test case name:

```bash
ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME="Add Advertiser Value" npx playwright test tests/frontend/audience-end-to-end.spec.ts --project=chromium --reporter=line
```

Batch end-to-end using explicit IDs:

```bash
ADDAPTIVE_AUDIENCE_DB_IDS=1,4,15 npx playwright test tests/frontend/audience-end-to-end-batch.spec.ts --project=chromium --reporter=line
```

Batch end-to-end using a positional range:

```bash
ADDAPTIVE_AUDIENCE_DB_RANGE=1-20 npx playwright test tests/frontend/audience-end-to-end-batch.spec.ts --project=chromium --reporter=line
```

Batch end-to-end across all rows:

```bash
npx playwright test tests/frontend/audience-end-to-end-batch.spec.ts --project=chromium --reporter=line
```

Supported selectors:

1. `ADDAPTIVE_AUDIENCE_DB_ID`
2. `ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME`
3. `ADDAPTIVE_AUDIENCE_DB_IDS`
4. `ADDAPTIVE_AUDIENCE_DB_RANGE`

Note: The current audience flow implementation is still 1st-party-specific, so pass IDs for rows that should execute against the 1st-party path.
