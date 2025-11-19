import { Locator, Page, expect } from '@playwright/test';

export class SearchResultsPage {
  private readonly resultCards: Locator;
  private readonly nextButton: Locator;
  private readonly noResults: Locator;

  constructor(private readonly page: Page) {
    this.resultCards = page.locator('.search-results .details');
    this.nextButton = page.locator('a.Next');
    this.noResults = page.locator('div.red');
  }

  async validateCardsOnPage(authorKey: string) {
    await expect(async () => {
      const cards = await this.resultCards.all();
      expect(cards.length).toBeGreaterThan(0); 
      for (const card of cards) {
        await expect(card.locator('.book-title-link')).toBeVisible();
        await expect(card.locator(`a[href*="${authorKey}"]`)).toBeVisible();
      }
    }).toPass();
  }

  async getResultsCount(): Promise<number> {
    return this.resultCards.count();
  }

  async goNextIfPossible(): Promise<boolean> {
    if (await this.nextButton.isVisible()) {
      await this.nextButton.click();
      return true;
    }
    return false;
  }

  getNoResultsLocator(): Locator {
    return this.noResults;
  }
}