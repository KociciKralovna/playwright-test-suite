import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  private results: Locator;
  private nextLink: Locator;

  constructor(private readonly page: Page) {
    this.results = page.locator('#searchResults li.searchResultItem');
    this.nextLink = page.locator('a.ChoosePage[data-ol-link-track*="Next"]');
  }

  async waitReady() {
    await this.results.first().waitFor();
  }

  async getResultsCount(): Promise<number> {
    return await this.results.count();
  }

  async validateCardsOnPage(olidKey: string) {
    await expect(this.results.first()).toBeVisible();
    const cards = await this.results.all();

    for (const card of cards) {
      const title = card.locator('h3.booktitle');
      await expect(title).not.toBeEmpty();

      const authorLink = card.locator(`.bookauthor a[href^="${olidKey}"]`);
      const count = await authorLink.count();
      expect(count).toBeGreaterThan(0);
    }
  }

  async goNextIfPossible(): Promise<boolean> {
    if (await this.nextLink.count() === 0) return false;
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.nextLink.first().click(),
    ]);
    return true;
  }
}
