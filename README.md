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

## Client Settings MediaMath Defaults

Standalone suite for validating that backend MediaMath client settings default correctly into a new frontend create-order flow.

Spec:

```bash
tests/frontend/client-settings-mediamath-defaults.spec.ts
```

Run one suite row with the browser visible:

```bash
ADDAPTIVE_CLIENT_SETTINGS_DB_ID=1 npx playwright test tests/frontend/client-settings-mediamath-defaults.spec.ts --project=chromium --headed --reporter=line
```

The suite is separate from the normal Order Entry end-to-end specs. It does not use `order-entry-end-to-end.spec.ts` or `order-entry-end-to-end-batch.spec.ts`.

DB model:

1. Parent table: `client_settings_preflight_suite`
2. Child step table: `client_settings_suite_group_steps`
3. Parent and child rows are linked by shared `object_id`

Parent row purpose:

1. One parent row represents one runnable suite scenario
2. `client_name` controls whether the suite uses an existing client or creates a new one
3. Use `!:Client Name` to use an existing client
4. Use `*:Client Name` to create a new backend client and a new backend user for that run

The suite executes child steps in ascending `step_order` and then `id` as a fallback.

Recommended child table columns:

1. `object_id`
2. `step_order`
3. `step_type`
4. `backend_field`
5. `frontend_field`
6. `value`

Supported `step_type` values:

1. `frontend_context`
2. `backend_set`
3. `backend_assert`
4. `frontend_action`
3. `frontend_assert`

`frontend_context` updates in-memory context used by later frontend actions:

1. `creative_type`
2. `ad_server`
3. `objectives_type`
4. `objectives_goal`

`backend_set` updates a backend MediaMath client field and then reads it back.

`backend_assert` reads a backend MediaMath client field without modifying it.

`frontend_action` is now fully step-based. The suite no longer auto-runs Objectives or Basic Setup for you. You must describe the frontend flow explicitly in DB steps.

Supported special `frontend_action` commands:

1. `login_frontend`
2. `impersonate_user`
3. `goto`
4. `wait_url`
5. `wait_ms`
6. `open_order_entry`
7. `configure_objectives`
8. `verify_ad_server`
9. `configure_basic_setup`

Supported `frontend_action` values:

1. `login_frontend = admin`
2. `login_frontend = {{created_user_email}}|{{created_user_password}}`
3. `impersonate_user = {{created_user_email}}`
4. `open_order_entry = create`
5. `configure_objectives = create`
6. `verify_ad_server = MEDIAMATH`
7. `configure_basic_setup = create`

Raw selector support:

1. If `frontend_field` looks like a selector such as `#id`, `.class`, `[attr=value]`, `input...`, `select...`, or `//xpath`, the suite treats it as a raw selector
2. Raw `frontend_action` values currently support:
   `click`, `wait_visible`, `fill:<text>`, `select_label:<label>`, `select_value:<value>`
3. Raw `frontend_assert` values currently support:
   `visible`, `value:<expected>`, `text:<expected>`

Runtime variables:

1. `{{created_client_name}}`
2. `{{created_user_email}}`
3. `{{created_user_password}}`

These are populated when the parent row uses `*:Client Name`.

Typical existing-client step flow:

1. `frontend_context` step sets order context such as `creative_type`, `objectives_type`, or `objectives_goal`
2. `backend_set` or `backend_assert` validates backend state
3. `frontend_action` logs into frontend
4. `frontend_action` opens order entry and configures the page
5. `frontend_assert` verifies the inherited frontend default

Typical new-client network-default step flow:

1. Parent `client_name` uses `*:...`
2. Suite creates a new backend client
3. Suite creates a new backend user
4. `backend_assert` verifies inherited backend defaults
5. `frontend_action` logs in as admin
6. `frontend_action` impersonates `{{created_user_email}}`
7. Remaining frontend actions and assertions validate the frontend defaults

Current supported frontend assertions:

1. `billing_cpm`
2. `bid_cpm`
3. `goal_value`

Current supported backend field coverage includes MediaMath client-level fields such as:

1. `Billing CPM > Banner`
2. `Bid CPM > Banner`
3. objective goal fields such as `awareness_reach_banner_goal_value`

Example parent row:

```text
object_id: 100
test_case_name: MediaMath Network Defaults Banner Inheritance
status: active
client_name: *:MediaMath Network Defaults Banner Inheritance
ad_server: MEDIAMATH
order_action: create
```

Example child rows:

```text
1  backend_assert   Billing CPM > Banner                6
2  backend_assert   Bid CPM > Banner                    0.90
3  frontend_context creative_type                       Banner
4  frontend_context ad_server                           MEDIAMATH
5  frontend_action  login_frontend                      admin
6  frontend_action  impersonate_user                    {{created_user_email}}
7  frontend_action  open_order_entry                    create
8  frontend_action  configure_objectives                create
9  frontend_action  verify_ad_server                    MEDIAMATH
10 frontend_action  configure_basic_setup               create
11 frontend_assert  billing_cpm                         6
12 frontend_action  #order-parent-nav-budget-flight     click
13 frontend_action  #budget-flight-budget-settings-cog  click
14 frontend_assert  bid_cpm                             0.90
```

Guidelines for authoring new tests:

1. Start with one parent row per scenario
2. Keep one assertion goal per child row
3. Prefer explicit `step_order`
4. Prefer semantic frontend fields like `billing_cpm` when they already exist
5. Use raw selectors only when no semantic helper exists yet
6. For new-client inheritance tests, prefer `backend_assert` over `backend_set`
7. For admin-only frontend controls, use `login_frontend = admin` and then `impersonate_user = {{created_user_email}}`

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
