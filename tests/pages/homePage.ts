import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private searchBox!: Locator;
  private searchButton!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = this.page.getByRole('searchbox');
    this.searchButton = this.page.getByRole('button', { name: /search/i });
  }

  async goto() {
    await this.page.goto('https://openlibrary.org/');
  }
}
