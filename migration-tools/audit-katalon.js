const path = require('path');
const {
  collectMatches,
  countBy,
  ensureDir,
  readText,
  relativeFromRoot,
  topEntries,
  walkFiles,
  writeText,
  xmlValue
} = require('./shared');

const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'migration-output');

function classifyComplexity(item) {
  const score =
    item.callTestCases.length * 2 +
    item.wsMethods.length * 2 +
    (item.findTestObjects.length > 20 ? 2 : 0) +
    (item.webUiMethods.length > 10 ? 1 : 0);

  if (score >= 6) {
    return 'complex';
  }
  if (score >= 3) {
    return 'moderate';
  }
  return 'simple';
}

function parseGlobalVariables(profileFiles) {
  const profiles = [];

  for (const file of profileFiles) {
    const xml = readText(file);
    const variables = [];
    for (const block of xml.matchAll(/<GlobalVariableEntity>([\s\S]*?)<\/GlobalVariableEntity>/g)) {
      variables.push({
        name: xmlValue(block[1], 'name'),
        initValue: xmlValue(block[1], 'initValue'),
        valueType: xmlValue(block[1], 'valueType') || 'DYNAMIC'
      });
    }
    profiles.push({
      path: relativeFromRoot(repoRoot, file),
      name: xmlValue(xml, 'name'),
      variables
    });
  }

  return profiles;
}

function buildTestCaseManifest() {
  const testCaseFiles = walkFiles(path.join(repoRoot, 'Test Cases'), (file) => file.endsWith('.tc'));
  const manifest = [];

  for (const tcFile of testCaseFiles) {
    const relativeTcPath = relativeFromRoot(repoRoot, tcFile);
    const testCaseId = relativeTcPath.replace(/\.tc$/, '');
    const tcXml = readText(tcFile);
    const testName = xmlValue(tcXml, 'name') || path.basename(tcFile, '.tc');

    const relativeScriptDir = relativeTcPath.replace(/^Test Cases\//, 'Scripts/').replace(/\.tc$/, '');
    const scriptDir = path.join(repoRoot, relativeScriptDir);
    const scriptFiles = walkFiles(scriptDir, (file) => file.endsWith('.groovy'));
    const scriptPath = scriptFiles[0] || null;
    const script = scriptPath ? readText(scriptPath) : '';

    const webUiMethods = collectMatches(script, /WebUI\.([A-Za-z0-9_]+)/g);
    const wsMethods = collectMatches(script, /WS\.([A-Za-z0-9_]+)/g);
    const callTestCases = collectMatches(script, /findTestCase\('([^']+)'/g);
    const findTestObjects = collectMatches(script, /findTestObject\('([^']+)'/g);
    const globalVariables = collectMatches(script, /GlobalVariable\.([A-Za-z0-9_]+)/g);

    const item = {
      name: testName,
      testCaseId,
      path: relativeTcPath,
      scriptPath: scriptPath ? relativeFromRoot(repoRoot, scriptPath) : null,
      webUiMethods: Array.from(new Set(webUiMethods)).sort(),
      wsMethods: Array.from(new Set(wsMethods)).sort(),
      callTestCases: Array.from(new Set(callTestCases)).sort(),
      findTestObjects: Array.from(new Set(findTestObjects)).sort(),
      globalVariables: Array.from(new Set(globalVariables)).sort()
    };

    item.complexity = classifyComplexity(item);
    manifest.push(item);
  }

  manifest.sort((left, right) => left.testCaseId.localeCompare(right.testCaseId));
  return manifest;
}

function parseSuites(suiteFiles) {
  return suiteFiles.map((file) => {
    const xml = readText(file);
    return {
      path: relativeFromRoot(repoRoot, file),
      name: xmlValue(xml, 'name') || path.basename(file),
      kind: xml.includes('<TestSuiteCollectionEntity>') ? 'collection' : 'suite',
      testCases: collectMatches(xml, /<testCaseId>([^<]+)<\/testCaseId>/g),
      suiteRefs: collectMatches(xml, /<testSuiteEntity>([^<]+)<\/testSuiteEntity>/g),
      dataFiles: collectMatches(xml, /<testDataId>([^<]+)<\/testDataId>/g)
    };
  });
}

function parseDataFiles(files) {
  return files.map((file) => {
    const xml = readText(file);
    return {
      path: relativeFromRoot(repoRoot, file),
      name: xmlValue(xml, 'name') || path.basename(file),
      driver: xmlValue(xml, 'driver'),
      query: xmlValue(xml, 'query'),
      dataSourceUrl: xmlValue(xml, 'dataSourceUrl')
    };
  });
}

function parseObjectRepository(files) {
  let webElements = 0;
  let webServices = 0;
  for (const file of files) {
    const xml = readText(file);
    if (xml.includes('<WebElementEntity>')) {
      webElements += 1;
    } else if (xml.includes('<WebServiceRequestEntity>')) {
      webServices += 1;
    }
  }

  return { webElements, webServices, total: files.length };
}

function main() {
  ensureDir(outputDir);

  const scriptFiles = walkFiles(path.join(repoRoot, 'Scripts'), (file) => file.endsWith('.groovy'));
  const keywordFiles = walkFiles(path.join(repoRoot, 'Keywords'), (file) => file.endsWith('.groovy'));
  const testCaseManifest = buildTestCaseManifest();
  const suiteFiles = walkFiles(path.join(repoRoot, 'Test Suites'), (file) => file.endsWith('.ts'));
  const profileFiles = walkFiles(path.join(repoRoot, 'Profiles'), (file) => file.endsWith('.glbl'));
  const dataFiles = walkFiles(path.join(repoRoot, 'Data Files'), (file) => file.endsWith('.dat'));
  const objectFiles = walkFiles(path.join(repoRoot, 'Object Repository'), (file) => file.endsWith('.rs'));

  const allGroovy = scriptFiles.concat(keywordFiles).map((file) => readText(file)).join('\n');
  const webUiCounts = countBy(collectMatches(allGroovy, /WebUI\.([A-Za-z0-9_]+)/g));
  const wsCounts = countBy(collectMatches(allGroovy, /WS\.([A-Za-z0-9_]+)/g));

  const byComplexity = countBy(testCaseManifest.map((item) => item.complexity));
  const audit = {
    generatedAt: new Date().toISOString(),
    summary: {
      testCases: testCaseManifest.length,
      scripts: scriptFiles.length,
      keywords: keywordFiles.length,
      suites: suiteFiles.length,
      profiles: profileFiles.length,
      dataFiles: dataFiles.length,
      objectRepository: parseObjectRepository(objectFiles)
    },
    complexity: byComplexity,
    topWebUiMethods: topEntries(webUiCounts, 25),
    topWsMethods: topEntries(wsCounts, 10),
    profiles: parseGlobalVariables(profileFiles),
    suites: parseSuites(suiteFiles),
    dataFiles: parseDataFiles(dataFiles).slice(0, 50),
    testCases: testCaseManifest
  };

  const jsonPath = path.join(outputDir, 'katalon-audit.json');
  const manifestPath = path.join(outputDir, 'test-case-manifest.json');

  writeText(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
  writeText(manifestPath, `${JSON.stringify(testCaseManifest, null, 2)}\n`);

  const markdown = [
    '# Katalon Audit',
    '',
    `Generated: ${audit.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Test cases: ${audit.summary.testCases}`,
    `- Scripts: ${audit.summary.scripts}`,
    `- Keywords: ${audit.summary.keywords}`,
    `- Suites: ${audit.summary.suites}`,
    `- Profiles: ${audit.summary.profiles}`,
    `- Data files: ${audit.summary.dataFiles}`,
    `- Repository objects: ${audit.summary.objectRepository.total}`,
    `- Web element objects: ${audit.summary.objectRepository.webElements}`,
    `- Web service objects: ${audit.summary.objectRepository.webServices}`,
    '',
    '## Complexity',
    '',
    `- Simple: ${audit.complexity.simple || 0}`,
    `- Moderate: ${audit.complexity.moderate || 0}`,
    `- Complex: ${audit.complexity.complex || 0}`,
    '',
    '## Top WebUI Methods',
    ''
  ];

  for (const entry of audit.topWebUiMethods) {
    markdown.push(`- ${entry.name}: ${entry.count}`);
  }

  markdown.push('', '## High-Complexity Test Cases', '');
  for (const item of testCaseManifest.filter((testCase) => testCase.complexity === 'complex').slice(0, 20)) {
    markdown.push(`- ${item.testCaseId}`);
  }

  writeText(path.join(outputDir, 'katalon-audit.md'), `${markdown.join('\n')}\n`);
  process.stdout.write(`Wrote ${relativeFromRoot(repoRoot, jsonPath)} and ${relativeFromRoot(repoRoot, manifestPath)}\n`);
}

main();
