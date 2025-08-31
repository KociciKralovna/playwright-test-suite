import { Page, Locator, expect } from '@playwright/test';

export class SearchBar {
  private page: Page;
  private searchInput!: Locator;
  private filterDropdown!: Locator;
  private dropdown!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.getByRole('textbox', { name: 'Search' });
    this.filterDropdown = this.page.getByRole('combobox', { name: 'Search by' });
    this.dropdown = this.page.locator('.search-dropdown .search-results');
  }

  async searchAuthorByOLID(olidKey: string, name: string) {
    await this.filterDropdown.selectOption('author');
    await this.searchInput.fill(name);
    await expect(this.dropdown).toBeVisible();
    
    const suggestion = this.page.locator(`.search-results a[href="${olidKey}"]`);
    await suggestion.first().waitFor({ state: 'visible' });
    await suggestion.first().click();
    await this.page.waitForURL(olidKey);
  }
}

