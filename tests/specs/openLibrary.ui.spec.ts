import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultsPage } from '../pages/searchResultPage';
import { LoginPage } from '../pages/loginPage';
import { authors } from '../data/authors';


test('@search Search books by author - results have title and author', async ({ page }) => {
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

test('@auth Login and Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.gotoLogin();
  
  if (!process.env.OPENLIB_EMAIL || !process.env.OPENLIB_PASSWORD) {
  throw new Error('Missing OPENLIB_EMAIL or OPENLIB_PASSWORD');
}
  await loginPage.login(
    process.env.OPENLIB_EMAIL,
    process.env.OPENLIB_PASSWORD
  );
  await expect(page.getByRole('heading', { level: 2 })).toContainText['Welcome to Open Library']
  await loginPage.logout();
  await expect(page.getByRole('link', { name: 'Log In' })).toBeVisible();
});
