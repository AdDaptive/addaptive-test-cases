import { test, expect } from '@playwright/test';
import {
  appendValidationQueueEntry,
  clearValidationQueueFile,
  evaluateValidationRule,
  readValidationQueueEntries,
  resolveValidationQueueFilePath,
  type ValidationQueueEntry
} from '../../utils/order-entry-validation';

test.describe('order-entry validation helpers', () => {
  test.beforeEach(async ({}, testInfo) => {
    process.env.ADDAPTIVE_ORDER_ENTRY_VALIDATION_QUEUE_FILE = `/tmp/${testInfo.testId.replace(/[^a-z0-9_-]+/gi, '_')}.jsonl`;
    await clearValidationQueueFile();
  });

  test.afterEach(async () => {
    await clearValidationQueueFile();
    delete process.env.ADDAPTIVE_ORDER_ENTRY_VALIDATION_QUEUE_FILE;
  });

  test('queues and reads validation entries as jsonl', async () => {
    const entry: ValidationQueueEntry = {
      version: 1,
      testCaseName: 'MediaMath Validation',
      provider: 'MEDIAMATH',
      orderId: '1234',
      objectType: 'orderId',
      loginUser: 'user@example.com',
      loginPassword: 'password',
      impersonateUserProfile: 'client@example.com',
      validations: [
        {
          field: 'unitsValue',
          operator: '=',
          path: "$['Campaign'].goals.goal_value",
          value: 22
        }
      ]
    };

    await appendValidationQueueEntry(entry);

    const entries = await readValidationQueueEntries();
    expect(entries).toEqual([entry]);
    expect(resolveValidationQueueFilePath()).toContain('/tmp/');
  });

  test('evaluates equality with date normalization', async () => {
    const payload = {
      Campaign: {
        duration: {
          start_date: '2026-02-05T05:00:00Z'
        }
      }
    };

    expect(
      evaluateValidationRule(payload, {
        field: 'startDate',
        operator: '=',
        path: "$['Campaign'].duration.start_date",
        value: '02/05/2026'
      })
    ).toBe(true);
  });

  test('evaluates IN over wildcard arrays', async () => {
    const payload = {
      Campaign: {
        creatives: {
          nodes: [
            { adFormat: { displayName: '300x250' } },
            { adFormat: { displayName: '728x90' } }
          ]
        }
      }
    };

    expect(
      evaluateValidationRule(payload, {
        field: 'creativeSize',
        operator: 'IN',
        path: "$['Campaign'].creatives.nodes[*].adFormat.displayName",
        value: '728x90'
      })
    ).toBe(true);
  });
});
