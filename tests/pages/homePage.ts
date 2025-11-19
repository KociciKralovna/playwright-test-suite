import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private searchBy: Locator;
  private searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBy = page.getByRole('combobox', { name: 'Search by' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('https://openlibrary.org/');
  }

  async search(filter: 'q' | 'author' | 'title' | 'subject', value: string) {
    await this.searchBy.selectOption(filter);
    await this.searchInput.fill(value);
  }
}