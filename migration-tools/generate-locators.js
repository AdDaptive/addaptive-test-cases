const path = require('path');
const {
  decodeXml,
  ensureDir,
  readText,
  relativeFromRoot,
  walkFiles,
  writeText,
  xmlValue
} = require('./shared');

const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'migration-output', 'generated');

function parseSelectors(xml) {
  const selectors = [];
  for (const match of xml.matchAll(/<entry>\s*<key>([^<]+)<\/key>\s*<value>([\s\S]*?)<\/value>\s*<\/entry>/g)) {
    selectors.push({
      type: decodeXml(match[1].trim()),
      value: decodeXml(match[2].trim())
    });
  }
  return selectors;
}

function parseFile(file) {
  const xml = readText(file);
  const relativePath = relativeFromRoot(repoRoot, file).replace(/\.rs$/, '');

  if (xml.includes('<WebElementEntity>')) {
    const selectorMethod = xmlValue(xml, 'selectorMethod') || 'BASIC';
    const selectors = parseSelectors(xml);
    const preferred = selectors.find((selector) => selector.type === selectorMethod) || selectors[0] || null;

    return {
      path: relativePath,
      kind: 'web',
      selectorMethod,
      preferred,
      selectors
    };
  }

  if (xml.includes('<WebServiceRequestEntity>')) {
    return {
      path: relativePath,
      kind: 'api',
      method: xmlValue(xml, 'restRequestMethod'),
      url: xmlValue(xml, 'restUrl')
    };
  }

  return null;
}

function toTsObject(catalog) {
  const lines = ['export const locatorCatalog = {'];

  for (const entry of catalog) {
    if (entry.kind === 'web') {
      lines.push(`  '${entry.path}': {`);
      lines.push(`    kind: 'web',`);
      lines.push(`    selectorMethod: '${entry.selectorMethod}',`);
      if (entry.preferred) {
        lines.push('    preferred: {');
        lines.push(`      type: '${entry.preferred.type}',`);
        lines.push(`      value: ${JSON.stringify(entry.preferred.value)}`);
        lines.push('    },');
      } else {
        lines.push('    preferred: null,');
      }
      lines.push('    selectors: [');
      for (const selector of entry.selectors) {
        lines.push(`      { type: '${selector.type}', value: ${JSON.stringify(selector.value)} },`);
      }
      lines.push('    ]');
      lines.push('  },');
      continue;
    }

    lines.push(`  '${entry.path}': {`);
    lines.push(`    kind: 'api',`);
    lines.push(`    method: '${entry.method}',`);
    lines.push(`    url: ${JSON.stringify(entry.url)}`);
    lines.push('  },');
  }

  lines.push("} as const;");
  lines.push('');
  return lines.join('\n');
}

function main() {
  ensureDir(outputDir);
  const files = walkFiles(path.join(repoRoot, 'Object Repository'), (file) => file.endsWith('.rs'));
  const catalog = files.map(parseFile).filter(Boolean);

  writeText(path.join(outputDir, 'locator-catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
  writeText(path.join(outputDir, 'locator-catalog.ts'), `${toTsObject(catalog)}\n`);
  writeText(path.join(repoRoot, 'playwright', 'locators', 'generated.ts'), `${toTsObject(catalog)}\n`);

  process.stdout.write(`Wrote ${catalog.length} locator entries\n`);
}

main();
