# Addaptive Test Cases

Standalone Playwright repository for Addaptive test automation.

Playwright worker defaults:

- default worker count is `2`
- `ADDAPTIVE_PLAYWRIGHT_WORKERS` can override it
- worker count is capped at `4` unless you intentionally change the repo rule

## Structure

- `.env`: tracked shared environment defaults for the suite
- `.env.local`: ignored local overrides layered on top of `.env`
- `.env.<name>`: optional named environment file such as `.env.ali`
- `.env.<name>.local`: ignored named local override such as `.env.ali.local`
- `tests/`: Playwright specs
- `fixtures/`: shared fixtures for auth, impersonation, and bootstrap
- `utils/`: environment and helper utilities
- `locators/`: generated locator catalogs from the Katalon object repository
- `migration-tools/`: scripts used during the Katalon-to-Playwright migration
- `scripts/`: local utility scripts such as DB sync

## Environment Selection

The suite supports named env files and suite-based defaults.

Named dev server files:

```text
.env.dev
.env.dev2
.env.dev3
.env.dev4
.env.ali
.env.design
```

Load order:

1. `.env`
2. `.env.<name>` when `ADDAPTIVE_ENV=<name>` is set or inferred
3. `.env.local`
4. `.env.<name>.local` when `ADDAPTIVE_ENV=<name>` is set or inferred
5. a specific file from `ADDAPTIVE_ENV_FILE=<path>` if provided

Explicit selection always wins:

```bash
ADDAPTIVE_ENV=dev npx playwright test tests/frontend/insight-studio-end-to-end.spec.ts --project=chromium
ADDAPTIVE_ENV=ali npm run test:oe:mm:create
ADDAPTIVE_ENV_FILE=.env.design npx playwright test tests/frontend/client-settings-mediamath-defaults.spec.ts --project=chromium
```

Default suite mapping when you do not set an environment:

- Order Entry suites default to `ali`
- Audience suites default to `ali`
- Backend and API suites default to `ali`
- Insight Studio suites default to `dev`

Typical URLs in those files:

```env
ADDAPTIVE_FRONTEND_URL=https://<server>.dev-frontend-upgrade.addaptive.com/orders
ADDAPTIVE_BACKEND_URL=https://<server>.addaptive.com
```

Examples:

```env
ADDAPTIVE_FRONTEND_URL=https://ali.dev-frontend-upgrade.addaptive.com/
ADDAPTIVE_BACKEND_URL=https://ali.addaptive.com
```

## Auth Precedence

Frontend login and impersonation resolve in this order:

1. `ADDAPTIVE_LOGIN_USER_OVERRIDE`, `ADDAPTIVE_LOGIN_PASSWORD_OVERRIDE`, and `ADDAPTIVE_IMPERSONATE_USER_OVERRIDE`
2. suite-table row values such as `username`, `password`, and `impersonate_user_profile` when present
3. shared defaults from `.env` or the selected named env files

Order Entry impersonation behavior:

1. if `ADDAPTIVE_ORDER_ENTRY_USE_IMPERSONATION` is explicitly set, that value wins
2. otherwise Order Entry impersonates automatically when the suite row or override env supplies an impersonation target

Current suite-table support:

- `order_entry_suite`: `username`, `password`, `impersonate_user_profile`
- `audiences_suite`: `impersonate_user_profile`, plus `username` and `password` if those columns exist
- `insight_studio_suite`: `impersonate_use_profile`, plus `username` and `password` if those columns exist
- `client_settings_preflight_suite`: `username`, `password`, and `impersonate_user_profile` when present

## Quick Rules

- Keep shared DB credentials and shared login defaults in `.env`
- Keep environment-specific frontend and backend URLs in `.env.<name>`
- Use `.env.local` or `.env.<name>.local` for personal overrides
- Use the `*_OVERRIDE` env vars only when you need to force credentials instead of using the suite row

Common examples:

```bash
npm run test:oe:mm:create
```

Uses the default Order Entry environment, which is `ali`.

```bash
npx playwright test tests/frontend/insight-studio-end-to-end.spec.ts --project=chromium
```

Uses the default Insight Studio environment, which is `dev`.

```bash
ADDAPTIVE_ENV=dev2 npm run test:oe:mm:create
```

Forces Order Entry to run against `dev2` instead of the default `ali`.

```bash
ADDAPTIVE_LOGIN_USER_OVERRIDE=user@example.com ADDAPTIVE_LOGIN_PASSWORD_OVERRIDE=secret npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium
```

Forces frontend login credentials even if the suite row has `username` and `password`.

For VS Code Playwright runs, use [.env.local.example](/srv/apps/work/addaptive-test-cases/.env.local.example) as the starting point for your local `.env.local`. Set `ADDAPTIVE_ENV` to choose the dev server and set the suite row selector variables there so the Playwright extension can run the correct row without shell prefixes.

Order Entry selection notes:

- `ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID`, `ADDAPTIVE_ORDER_ENTRY_DB_IDS`, and `ADDAPTIVE_ORDER_ENTRY_DB_RANGE` can run rows directly
- `ADDAPTIVE_ORDER_ENTRY_AD_SERVER` and `ADDAPTIVE_ORDER_ENTRY_ACTION` are optional narrowing filters
- `ADDAPTIVE_ORDER_ENTRY_DB_RANGE` accepts either `1-3` or a single value like `1`
- `ADDAPTIVE_ORDER_ENTRY_DB_RANGE` is positional inside the filtered result set when filters are provided, or across the full `order_entry_suite` ordering when they are not

## Local DB Sync

Use the repo’s Postgres dump/restore wrapper when you want to pull an allowlisted subset of production tables into a local database.

Config file:

```text
scripts/db-sync.config.json
```

Fields:

- `schemaTables`: tables to dump with `--schema-only`
- `dataTables`: tables to dump with `--data-only`
- `postRestoreSql`: optional SQL statements to run after restore

Example:

```json
{
  "schemaTables": [
    "public.order_entry_suite",
    "public.order_entry_creatives"
  ],
  "dataTables": [
    "public.order_entry_suite",
    "public.order_entry_creatives"
  ],
  "postRestoreSql": []
}
```

Source DB env vars:

```env
ADDAPTIVE_SYNC_SOURCE_DB_HOST=prod-host
ADDAPTIVE_SYNC_SOURCE_DB_PORT=5432
ADDAPTIVE_SYNC_SOURCE_DB_NAME=prod-db
ADDAPTIVE_SYNC_SOURCE_DB_USER=readonly-user
ADDAPTIVE_SYNC_SOURCE_DB_PASSWORD=readonly-password
```

Target DB env vars:

```env
ADDAPTIVE_SYNC_TARGET_DB_HOST=127.0.0.1
ADDAPTIVE_SYNC_TARGET_DB_PORT=5432
ADDAPTIVE_SYNC_TARGET_DB_NAME=addaptive_test_cases
ADDAPTIVE_SYNC_TARGET_DB_USER=addaptive_local
ADDAPTIVE_SYNC_TARGET_DB_PASSWORD=addaptive_local
```

Target values fall back to `ADDAPTIVE_DB_*` if the `ADDAPTIVE_SYNC_TARGET_DB_*` variables are unset.

Safety rules:

1. The tool refuses to restore into a non-local target host.
2. The tool requires `--confirm-prod` for schema/data/sync/restore commands.
3. The tool only syncs tables explicitly listed in `scripts/db-sync.config.json`.

Commands:

```bash
npm run db:sync:plan
npm run db:sync:plan:all
npm run db:sync:schema
npm run db:sync:schema:all
npm run db:sync:data
npm run db:sync:data:all
npm run db:sync
npm run db:sync:all
```

Artifacts are written to:

```text
tmp/db-sync/<timestamp>/
```

If you want to pull every table in schema `public` instead of using the allowlist config, use the `:all` variants. They discover tables from the source DB at runtime and still require `--confirm-prod` under the hood.

## Initial workflow

1. Run `npm run audit:katalon` to produce the Katalon inventory and migration manifest.
2. Run `npm run generate:profiles` to generate `.env` templates from Katalon profiles.
3. Run `npm run generate:locators` to generate the locator bridge.
4. Run `npm run generate:stubs` to create draft spec files for the highest-priority simple cases.
5. Replace generated selectors with semantic Playwright locators as each feature is hardened.

## Migration rule

Generated output is scaffolding only. Shared flows, waits, and assertions should be moved into fixtures and helper modules before expanding coverage.

## Order Entry End-to-End

Use the Order Entry end-to-end spec for both single-row and multi-row DB-driven runs.

Single end-to-end (one row):

```bash
ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID=1 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --reporter=line
```

Single end-to-end with browser visible:

```bash
ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID=1 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --headed --reporter=line
```

Multi-row end-to-end using a positional range within the filtered result set:

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=create ADDAPTIVE_ORDER_ENTRY_DB_RANGE=1-20 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --reporter=line
```

Multi-row end-to-end using explicit IDs:

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=edit ADDAPTIVE_ORDER_ENTRY_DB_IDS=1,4,15,20 npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=chromium --reporter=line
```

Filtered multi-row run by ad server and action without DB selectors:

```bash
ADDAPTIVE_ORDER_ENTRY_AD_SERVER=MEDIAMATH ADDAPTIVE_ORDER_ENTRY_ACTION=create npx playwright test tests/frontend/order-entry-end-to-end.spec.ts --project=brave-ubuntu --reporter=line
```

Optional filtering fields:

1. `ADDAPTIVE_ORDER_ENTRY_AD_SERVER`
Allowed values: `MEDIAMATH`, `DFP`, `PMP`, `DPM`, `MEDIAMATH_GAM`, `TRADEDESK`
2. `ADDAPTIVE_ORDER_ENTRY_ACTION`
Allowed values: `create`, `edit`

DB selectors:

1. `ADDAPTIVE_ORDER_ENTRY_DB_IDS`
2. `ADDAPTIVE_ORDER_ENTRY_DB_RANGE` (1-based positional range after applying `ADDAPTIVE_ORDER_ENTRY_AD_SERVER` and `ADDAPTIVE_ORDER_ENTRY_ACTION`)
3. `ADDAPTIVE_ORDER_ENTRY_DB_OBJECT_ID`

If no DB selector is provided, the suite runs all rows that match the active ad server + action filters.

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

The suite is separate from the normal Order Entry end-to-end spec. It does not use `order-entry-end-to-end.spec.ts`.

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
