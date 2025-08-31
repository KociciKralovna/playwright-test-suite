import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchResultsPage } from '../pages/searchResultPage';
import { authors } from '../data/authors';

test('Vyhledani knih dle autora - vysledky maji titul i autora', async ({ page }) => {
    const homePage = new HomePage(page);
    const results = new SearchResultsPage(page);
    
    await homePage.goto();
    await homePage.searchAuthorQuery(authors.burroughs.fullName);

    let totalValidated = 0;
    let pageGuard = 0;
    const MAX_PAGES = 10; // pojistka proti nekonečnému stránkování

    do {
    await results.validateCardsOnPage();
    totalValidated += await results.getResultsCount();
    pageGuard++;
    } while (pageGuard < MAX_PAGES && (await results.goNextIfPossible()));

});
