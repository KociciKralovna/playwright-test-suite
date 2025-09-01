import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultsPage } from '../pages/searchResultPage';
import { authors } from '../data/authors';

test('Vyhledání knih dle autora - výsledky mají titul i autora', async ({ page }) => {
  const homePage = new HomePage(page);
  const results = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.search('author', authors.burroughs.fullName);

  const authorLink = page.locator(`.search-results a[href="${authors.burroughs.olidKey}"]`);
  await authorLink.first().click();

  const header = page.locator('h1[itemprop="name"]');
  await expect(header).toHaveText(authors.burroughs.fullName);

  let totalValidated = 0;
  let pageGuard = 0;
  const MAX_PAGES = 3;

  do {
    await results.validateCardsOnPage(authors.burroughs.olidKey);
    totalValidated += await results.getResultsCount();
    pageGuard++;
  } while (pageGuard < MAX_PAGES && (await results.goNextIfPossible()));

  console.log('Celkově validováno:', totalValidated);
  expect(totalValidated).toBeGreaterThan(0);
});
