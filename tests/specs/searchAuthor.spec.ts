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

  const header = page.locator('h1[itemprop="name"]');
  await expect(header).toHaveText(authors.burroughs.fullName);

  let totalValidated = 0;
  let pageGuard = 0;
  const MAX_PAGES = 2;

  do {
    await results.validateCardsOnPage(authors.burroughs.olidKey); 
    totalValidated += await results.getResultsCount();
    pageGuard++;
}   while (pageGuard < MAX_PAGES && (await results.goNextIfPossible()));

  expect(totalValidated).toBeGreaterThan(0);
});
