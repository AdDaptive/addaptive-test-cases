#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { config: loadDotEnvFile } = require('dotenv');

loadEnvFiles();

const repoRoot = process.cwd();
const defaultConfigPath = path.resolve(repoRoot, 'scripts/db-sync.config.json');

function loadEnvFiles() {
  const baseEnvFile = path.resolve(process.cwd(), '.env');
  const localEnvFile = path.resolve(process.cwd(), '.env.local');

  if (fs.existsSync(baseEnvFile)) {
    loadDotEnvFile({ path: baseEnvFile, override: false });
  }

  if (fs.existsSync(localEnvFile)) {
    loadDotEnvFile({ path: localEnvFile, override: true });
  }
}

function optionalEnv(name) {
  const value = process.env[name];
  return value && String(value).trim() ? String(value).trim() : undefined;
}

function requiredEnv(name) {
  const value = optionalEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    command: !args[0] || args[0] === '--help' || args[0] === '-h' ? 'help' : args[0],
    configPath: defaultConfigPath,
    outputDir: optionalEnv('ADDAPTIVE_DB_SYNC_OUTPUT_DIR'),
    allPublicTables: false,
    confirmProd: false,
    force: false,
    skipSchema: false,
    skipData: false,
    verbose: false
  };

  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--all-public-tables') {
      options.allPublicTables = true;
    } else if (arg === '--confirm-prod') {
      options.confirmProd = true;
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--skip-schema') {
      options.skipSchema = true;
    } else if (arg === '--skip-data') {
      options.skipData = true;
    } else if (arg === '--verbose') {
      options.verbose = true;
    } else if (arg.startsWith('--config=')) {
      options.configPath = path.resolve(repoRoot, arg.slice('--config='.length));
    } else if (arg === '--config') {
      index += 1;
      options.configPath = path.resolve(repoRoot, args[index] || '');
    } else if (arg.startsWith('--output-dir=')) {
      options.outputDir = path.resolve(repoRoot, arg.slice('--output-dir='.length));
    } else if (arg === '--output-dir') {
      index += 1;
      options.outputDir = path.resolve(repoRoot, args[index] || '');
    } else if (arg === '--help' || arg === '-h') {
      options.command = 'help';
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function readConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`DB sync config not found: ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  const parsed = JSON.parse(raw);
  return {
    schemaTables: Array.isArray(parsed.schemaTables) ? parsed.schemaTables.map(String).map((item) => item.trim()).filter(Boolean) : [],
    dataTables: Array.isArray(parsed.dataTables) ? parsed.dataTables.map(String).map((item) => item.trim()).filter(Boolean) : [],
    postRestoreSql: Array.isArray(parsed.postRestoreSql)
      ? parsed.postRestoreSql.map(String).map((item) => item.trim()).filter(Boolean)
      : []
  };
}

function getSourceConfig() {
  return {
    host: requiredEnv('ADDAPTIVE_SYNC_SOURCE_DB_HOST'),
    port: optionalEnv('ADDAPTIVE_SYNC_SOURCE_DB_PORT') || '5432',
    database: requiredEnv('ADDAPTIVE_SYNC_SOURCE_DB_NAME'),
    user: requiredEnv('ADDAPTIVE_SYNC_SOURCE_DB_USER'),
    password: requiredEnv('ADDAPTIVE_SYNC_SOURCE_DB_PASSWORD')
  };
}

function getTargetConfig() {
  return {
    host: optionalEnv('ADDAPTIVE_SYNC_TARGET_DB_HOST') || optionalEnv('ADDAPTIVE_DB_HOST') || '127.0.0.1',
    port: optionalEnv('ADDAPTIVE_SYNC_TARGET_DB_PORT') || optionalEnv('ADDAPTIVE_DB_PORT') || '5432',
    database: optionalEnv('ADDAPTIVE_SYNC_TARGET_DB_NAME') || optionalEnv('ADDAPTIVE_DB_NAME') || 'postgres',
    user: optionalEnv('ADDAPTIVE_SYNC_TARGET_DB_USER') || optionalEnv('ADDAPTIVE_DB_USER') || 'postgres',
    password: optionalEnv('ADDAPTIVE_SYNC_TARGET_DB_PASSWORD') || optionalEnv('ADDAPTIVE_DB_PASSWORD') || ''
  };
}

function ensureTargetLooksLocal(target) {
  const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
  if (!localHosts.has(String(target.host).trim().toLowerCase())) {
    throw new Error(
      `Refusing to restore into non-local target host "${target.host}". Set ADDAPTIVE_SYNC_TARGET_DB_HOST to localhost or 127.0.0.1.`
    );
  }
}

function ensureProdConfirmed(options, source, target) {
  if (options.confirmProd) {
    return;
  }

  throw new Error(
    `Refusing to read from source ${source.host}/${source.database} and restore into ${target.host}/${target.database} without --confirm-prod.`
  );
}

function ensureTablesConfigured(config, options) {
  if (options.skipSchema && options.skipData) {
    throw new Error('Nothing to do: both --skip-schema and --skip-data were set.');
  }
  if (options.allPublicTables) {
    return;
  }
  if (!options.skipSchema && config.schemaTables.length === 0) {
    throw new Error('No schemaTables configured in scripts/db-sync.config.json.');
  }
  if (!options.skipData && config.dataTables.length === 0) {
    throw new Error('No dataTables configured in scripts/db-sync.config.json.');
  }
}

function timestampKey() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
}

function ensureOutputDir(outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function quotedTableArgs(tables) {
  return tables.flatMap((table) => ['--table', table]);
}

function querySourceRows(source, sql, verbose) {
  const result = runCommand(
    'psql',
    [
      '--host',
      source.host,
      '--port',
      source.port,
      '--username',
      source.user,
      '--dbname',
      source.database,
      '--tuples-only',
      '--no-align',
      '--command',
      sql
    ],
    { env: pgEnv(source), verbose }
  );

  return (result.stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function discoverPublicTables(source, verbose) {
  return querySourceRows(
    source,
    `
      select format('%I.%I', schemaname, tablename)
      from pg_tables
      where schemaname = 'public'
      order by tablename asc;
    `,
    verbose
  );
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf8',
    env: options.env || process.env,
    cwd: options.cwd || process.cwd()
  });

  if (options.verbose) {
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
  }

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(' ')} failed with exit code ${result.status}.\n${result.stderr || result.stdout || ''}`.trim()
    );
  }

  return result;
}

function pgEnv(connection) {
  return {
    ...process.env,
    PGPASSWORD: connection.password || ''
  };
}

function dumpSchema(source, tables, outputPath, verbose) {
  runCommand(
    'pg_dump',
    [
      '--host',
      source.host,
      '--port',
      source.port,
      '--username',
      source.user,
      '--dbname',
      source.database,
      '--schema-only',
      '--no-owner',
      '--no-privileges',
      ...quotedTableArgs(tables),
      '--file',
      outputPath
    ],
    { env: pgEnv(source), verbose }
  );
}

function dumpData(source, tables, outputPath, verbose) {
  runCommand(
    'pg_dump',
    [
      '--host',
      source.host,
      '--port',
      source.port,
      '--username',
      source.user,
      '--dbname',
      source.database,
      '--data-only',
      '--inserts',
      '--column-inserts',
      '--disable-triggers',
      '--no-owner',
      '--no-privileges',
      ...quotedTableArgs(tables),
      '--file',
      outputPath
    ],
    { env: pgEnv(source), verbose }
  );
}

function restoreSql(target, sqlPath, verbose) {
  runCommand(
    'psql',
    [
      '--host',
      target.host,
      '--port',
      target.port,
      '--username',
      target.user,
      '--dbname',
      target.database,
      '--file',
      sqlPath
    ],
    { env: pgEnv(target), verbose }
  );
}

function runPostRestoreSql(target, statements, verbose) {
  if (statements.length === 0) {
    return;
  }

  const sql = `${statements.join(';\n')};\n`;
  const sqlPath = path.resolve(repoRoot, 'tmp', 'db-sync', `post-restore-${timestampKey()}.sql`);
  ensureOutputDir(path.dirname(sqlPath));
  fs.writeFileSync(sqlPath, sql, 'utf8');
  restoreSql(target, sqlPath, verbose);
}

function printPlan(source, target, config, outputDir, options, effectiveSchemaTables, effectiveDataTables) {
  console.log('DB sync plan');
  console.log(`  source: ${source.host}:${source.port}/${source.database} as ${source.user}`);
  console.log(`  target: ${target.host}:${target.port}/${target.database} as ${target.user}`);
  console.log(`  config: ${options.configPath}`);
  console.log(`  output: ${outputDir}`);
  console.log(`  mode: ${options.allPublicTables ? 'all public tables' : 'allowlist config'}`);
  console.log(`  schema tables: ${effectiveSchemaTables.length}`);
  console.log(`  data tables: ${effectiveDataTables.length}`);
}

function usage() {
  console.log(`Usage:
  node scripts/db-sync.cjs schema --confirm-prod
  node scripts/db-sync.cjs data --confirm-prod
  node scripts/db-sync.cjs restore --confirm-prod --output-dir tmp/db-sync/20260403-120000
  node scripts/db-sync.cjs sync --confirm-prod
  node scripts/db-sync.cjs plan
  node scripts/db-sync.cjs sync --all-public-tables --confirm-prod

Options:
  --config <path>        Override config file path
  --output-dir <path>    Override dump artifact directory
  --all-public-tables    Ignore the allowlist config and sync every table in schema public
  --confirm-prod         Required for commands that read from source and restore into local
  --skip-schema          Skip schema dump/restore in sync mode
  --skip-data            Skip data dump/restore in sync mode
  --verbose              Print pg_dump/psql output

Environment:
  Source DB:
    ADDAPTIVE_SYNC_SOURCE_DB_HOST
    ADDAPTIVE_SYNC_SOURCE_DB_PORT
    ADDAPTIVE_SYNC_SOURCE_DB_NAME
    ADDAPTIVE_SYNC_SOURCE_DB_USER
    ADDAPTIVE_SYNC_SOURCE_DB_PASSWORD

  Target DB:
    ADDAPTIVE_SYNC_TARGET_DB_HOST
    ADDAPTIVE_SYNC_TARGET_DB_PORT
    ADDAPTIVE_SYNC_TARGET_DB_NAME
    ADDAPTIVE_SYNC_TARGET_DB_USER
    ADDAPTIVE_SYNC_TARGET_DB_PASSWORD

  Defaults:
    Target values fall back to ADDAPTIVE_DB_* when present.
`);
}

function main() {
  const options = parseArgs(process.argv);
  if (options.command === 'help') {
    usage();
    return;
  }

  const config = readConfig(options.configPath);
  const source = getSourceConfig();
  const target = getTargetConfig();
  const outputDir = path.resolve(repoRoot, options.outputDir || path.join('tmp', 'db-sync', timestampKey()));
  const effectiveSchemaTables = options.allPublicTables ? discoverPublicTables(source, options.verbose) : config.schemaTables;
  const effectiveDataTables = options.allPublicTables ? discoverPublicTables(source, options.verbose) : config.dataTables;

  ensureTargetLooksLocal(target);

  if (options.command === 'plan') {
    printPlan(source, target, config, outputDir, options, effectiveSchemaTables, effectiveDataTables);
    return;
  }

  ensureProdConfirmed(options, source, target);
  ensureTablesConfigured(config, options);
  if (!options.skipSchema && effectiveSchemaTables.length === 0) {
    throw new Error('No schema tables resolved for sync.');
  }
  if (!options.skipData && effectiveDataTables.length === 0) {
    throw new Error('No data tables resolved for sync.');
  }
  ensureOutputDir(outputDir);
  printPlan(source, target, config, outputDir, options, effectiveSchemaTables, effectiveDataTables);

  const schemaPath = path.join(outputDir, 'schema.sql');
  const dataPath = path.join(outputDir, 'data.sql');

  if (options.command === 'schema') {
    dumpSchema(source, effectiveSchemaTables, schemaPath, options.verbose);
    console.log(`Schema dump written to ${schemaPath}`);
    return;
  }

  if (options.command === 'data') {
    dumpData(source, effectiveDataTables, dataPath, options.verbose);
    console.log(`Data dump written to ${dataPath}`);
    return;
  }

  if (options.command === 'restore') {
    const resolvedSchemaPath = path.join(outputDir, 'schema.sql');
    const resolvedDataPath = path.join(outputDir, 'data.sql');
    if (!options.skipSchema) {
      if (!fs.existsSync(resolvedSchemaPath)) {
        throw new Error(`Schema file not found: ${resolvedSchemaPath}`);
      }
      restoreSql(target, resolvedSchemaPath, options.verbose);
    }
    if (!options.skipData) {
      if (!fs.existsSync(resolvedDataPath)) {
        throw new Error(`Data file not found: ${resolvedDataPath}`);
      }
      restoreSql(target, resolvedDataPath, options.verbose);
    }
    runPostRestoreSql(target, config.postRestoreSql, options.verbose);
    console.log(`Restore complete from ${outputDir}`);
    return;
  }

  if (options.command === 'sync') {
    if (!options.skipSchema) {
      dumpSchema(source, effectiveSchemaTables, schemaPath, options.verbose);
      restoreSql(target, schemaPath, options.verbose);
    }
    if (!options.skipData) {
      dumpData(source, effectiveDataTables, dataPath, options.verbose);
      restoreSql(target, dataPath, options.verbose);
    }
    runPostRestoreSql(target, config.postRestoreSql, options.verbose);
    console.log(`Sync complete. Artifacts written to ${outputDir}`);
    return;
  }

  throw new Error(`Unknown command: ${options.command}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
