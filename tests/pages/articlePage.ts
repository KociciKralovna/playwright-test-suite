import { Locator, Page, expect } from '@playwright/test';
import { SELECTORS } from '../locators/selectors';

export class ArticlePage {
    readonly page: Page;
    readonly author: Locator;
    readonly source: Locator;
    readonly articleCategoryBreadcrumb: Locator;
    readonly relatedFirstLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.author = page.locator(SELECTORS.ARTICLE_AUTHOR);
        this.source = page.locator(SELECTORS.ARTICLE_SOURCE);
        this.articleCategoryBreadcrumb = page.locator(SELECTORS.ARTICLE_CATEGORY_BREADCRUMB);
        this.relatedFirstLink = page.locator(SELECTORS.RELATED_ARTICLE).first();
    }
    async expectAuthorAndSource() {
        const authorText = (await this.author.textContent())?.trim() || '';
        const sourceText = (await this.source.textContent())?.trim() || '';

        if (!authorText || !sourceText) {
            throw new Error('Autor nebo zdroj článku je prázdný.');
        }
    }
    async expectRelatedArticleHasSameRubrika(expectedSlug: string) {
        const relatedHref = await this.relatedFirstLink.getAttribute('href') ?? '';
        expect(relatedHref).toContain(`/clanek/${expectedSlug}`);
    }
}
