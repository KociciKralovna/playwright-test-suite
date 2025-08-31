import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    private searchBox = this.page.getByRole('searchbox');
    private searchButton = this.page.getByRole('button', { name: /search/i });

    async goto() {
        await this.page.goto('https://openlibrary.org/');
    }

    async searchAuthorQuery(authorFullName: string) {
        await this.searchBox.fill(authorFullName);
        await this.searchButton.click();
    }

};

