import type { Locator, Page } from '@playwright/test';
import { locatorCatalog } from './generated';

type SelectorVariables = Record<string, string | number>;

function toPlaywrightSelector(rawSelector: string, selectorType: string): string {
  if (selectorType === 'XPATH') {
    return `xpath=${rawSelector}`;
  }

  if (selectorType === 'BASIC' && rawSelector.trim().startsWith('//')) {
    return `xpath=${rawSelector}`;
  }

  return rawSelector;
}

function applySelectorVariables(selector: string, variables: SelectorVariables = {}): string {
  return selector.replace(/\$\{([^}]+)\}/g, (_full, variableName) => {
    if (variableName in variables) {
      return String(variables[variableName]);
    }
    return `\${${variableName}}`;
  });
}

export function getKatalonSelector(
  objectPath: keyof typeof locatorCatalog,
  variables: SelectorVariables = {}
): string {
  const entry = locatorCatalog[objectPath] as
    | { kind: 'web'; preferred?: { type: string; value: string } }
    | { kind: 'api' }
    | undefined;

  if (!entry || entry.kind !== 'web' || !entry.preferred || !entry.preferred.value) {
    throw new Error(`Katalon object is not a resolvable web locator: ${objectPath}`);
  }

  return toPlaywrightSelector(applySelectorVariables(entry.preferred.value, variables), entry.preferred.type);
}

export function katalonLocator(
  page: Page,
  objectPath: keyof typeof locatorCatalog,
  variables: SelectorVariables = {}
): Locator {
  return page.locator(getKatalonSelector(objectPath, variables));
}
