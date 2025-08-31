import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
    constructor(private page: Page) {}

    private results: Locator = this.page.locator(
        '#searchResults li.searchResultItem, #searchResults li.work, #searchResults li.searchResult'
      );
    private nextLink: Locator = this.page.locator('a.ChoosePage[data-ol-link-track*="Next"]');

    async getResultsCount(): Promise<number> {
        return await this.results.count();
    }
    async validateCardsOnPage() {
        const cards = await this.results.all();
        expect(cards.length).toBeGreaterThan(0);   // musí být alespoň jeden výsledek
      
        for (const card of cards) {
          const title = card.locator('.resultTitle a');   // název knihy
          const author = card.locator('.bookauthor');     // autor
      
          await expect(title).toHaveText(/.+/);           // název nesmí být prázdný
          await expect(author).toHaveText(/.+/);          // autor nesmí být prázdný
        
        }
    }
    async goNextIfPossible(): Promise<boolean> {
        if (await this.nextLink.count() === 0) return false;
        await Promise.all([
          this.page.waitForLoadState('domcontentloaded'),
          this.nextLink.first().click(),
        ]);
        return true;

}}
