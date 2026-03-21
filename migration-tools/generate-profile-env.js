const path = require('path');
const {
  ensureDir,
  readText,
  walkFiles,
  writeText,
  xmlValue
} = require('./shared');

const repoRoot = path.resolve(__dirname, '..');
const profilesDir = path.join(repoRoot, 'Profiles');
const outputDir = path.join(repoRoot, 'migration-output', 'generated');

function parseProfiles() {
  const files = walkFiles(profilesDir, (file) => file.endsWith('.glbl'));
  return files.map((file) => {
    const xml = readText(file);
    const values = [];
    for (const block of xml.matchAll(/<GlobalVariableEntity>([\s\S]*?)<\/GlobalVariableEntity>/g)) {
      values.push({
        name: xmlValue(block[1], 'name'),
        initValue: xmlValue(block[1], 'initValue'),
        valueType: xmlValue(block[1], 'valueType') || 'DYNAMIC'
      });
    }
    return {
      name: xmlValue(xml, 'name'),
      file: path.basename(file),
      values
    };
  });
}

function envKey(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[^A-Za-z0-9]+/g, '_').toUpperCase();
}

function profilePrefix(name) {
  return name.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').toUpperCase() || 'DEFAULT';
}

function scopedEnvKey(profileName, variableName) {
  return `KATALON_${profilePrefix(profileName)}_${envKey(variableName)}`;
}

function quoteEnv(value) {
  return String(value || '').replace(/^'+|'+$/g, '');
}

function buildEnvFile(profile) {
  const seen = new Set();
  const lines = [
    `# Generated from Profiles/${profile.file}`,
    `# Profile: ${profile.name}`,
    ''
  ];

  for (const item of profile.values) {
    if (seen.has(item.name)) {
      continue;
    }
    seen.add(item.name);
    lines.push(`${scopedEnvKey(profile.name, item.name)}=${quoteEnv(item.initValue)}`);
  }

  lines.push('');
  return lines.join('\n');
}

function buildTypeScript(profiles) {
  const lines = [
    'export const katalonProfiles = {'
  ];

  for (const profile of profiles) {
    const seen = new Set();
    lines.push(`  '${profile.name}': {`);
    for (const item of profile.values) {
      if (seen.has(item.name)) {
        continue;
      }
      seen.add(item.name);
      lines.push(
        `    ${item.name}: process.env.${scopedEnvKey(profile.name, item.name)} ?? "",`
      );
    }
    lines.push('  },');
  }

  lines.push('} as const;');
  lines.push('');
  return lines.join('\n');
}

function main() {
  ensureDir(outputDir);
  const profiles = parseProfiles();

  for (const profile of profiles) {
    writeText(path.join(outputDir, `${profile.file}.env`), buildEnvFile(profile));
  }

  writeText(
    path.join(repoRoot, 'playwright', 'utils', 'generated-profiles.ts'),
    `${buildTypeScript(profiles)}`
  );

  process.stdout.write(`Generated ${profiles.length} profile env templates\n`);
}

main();
