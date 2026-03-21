const fs = require('fs');
const path = require('path');

function walkFiles(rootDir, predicate = () => true) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  const results = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (predicate(fullPath)) {
        results.push(fullPath);
      }
    }
  }

  results.sort();
  return results;
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function relativeFromRoot(repoRoot, filePath) {
  return toPosixPath(path.relative(repoRoot, filePath));
}

function collectMatches(text, regex) {
  const matches = [];
  for (const match of text.matchAll(regex)) {
    matches.push(match[1]);
  }
  return matches;
}

function countBy(items) {
  const counts = {};
  for (const item of items) {
    counts[item] = (counts[item] || 0) + 1;
  }
  return counts;
}

function topEntries(counts, limit = 20) {
  return Object.entries(counts)
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }
      return left[0].localeCompare(right[0]);
    })
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function xmlValue(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`));
  return match ? decodeXml(match[1].trim()) : '';
}

function decodeXml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = {
  collectMatches,
  countBy,
  decodeXml,
  ensureDir,
  readText,
  relativeFromRoot,
  slugify,
  topEntries,
  walkFiles,
  writeText,
  xmlValue
};
