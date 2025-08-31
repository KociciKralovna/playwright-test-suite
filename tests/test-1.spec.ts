import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://openlibrary.org/');
  await page.getByLabel('Search by', { exact: true }).selectOption('author');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('William S. Burroughs');
  await page.getByRole('link', { name: 'William S. Burroughs', exact: true }).first().click();
});