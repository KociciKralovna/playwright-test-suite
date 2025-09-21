import { test, expect, APIResponse } from '@playwright/test';

// Skipne test, pokud API vrátí 429 (rate limit). Jinak ověří status 200

export async function expectOrSkip(response: APIResponse, expectedStatus = 200) {
  if (response.status() === 429) {
    test.skip(true, 'Skipped due to API rate limit (429 Too Many Requests)');
  }
  expect(response.status()).toBe(expectedStatus);
}