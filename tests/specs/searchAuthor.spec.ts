import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchBar } from '../pages/searchBar';
import { SearchResultsPage } from '../pages/searchResultPage';
import { authors } from '../data/authors';

test('Vyhledani knih dle autora - vysledky maji titul i autora', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchBar = new SearchBar(page);
  const results = new SearchResultsPage(page);

  await homePage.goto();
  await searchBar.searchAuthorByOLID(authors.burroughs.olidKey, authors.burroughs.fullName);
  await page.waitForURL(/\/search\?/);
  await results.waitReady();

  let totalValidated = 0;
  let pageGuard = 0;
  const MAX_PAGES = 10;

  do {
    await results.validateCardsOnPage();
    totalValidated += await results.getResultsCount();
    pageGuard++;
  } while (pageGuard < MAX_PAGES && (await results.goNextIfPossible()));

  expect(totalValidated).toBeGreaterThan(0);
});
