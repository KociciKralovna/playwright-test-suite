import { expect, Page, Locator } from '@playwright/test';
import { SELECTORS } from '../locators/selectors';

export class RubrikaPage {
    constructor(private page: Page) {}

    private getAllArticles(): Locator {
        return this.page.locator(SELECTORS.ARTICLE);
    }

    async expectRubrikaHeading(category: { headingSelector: string; name: string }) {
        const heading = this.page.locator(category.headingSelector);
        await expect(heading).toHaveText(category.name);
    }

    async expectArticleCountMatchesLimit() {
        const wrapper = this.page.locator('[data-load-more-wrapper="articles"]');
        const limit = parseInt(await wrapper.getAttribute('data-limit') || '0', 10);

        const articles = this.getAllArticles();
        const count = await articles.count();
        expect(count).toBe(limit);
    }

    async expectArticlesHaveDate() {
        const articles = this.getAllArticles();
        const count = await articles.count();
    
        let chyby: string[] = [];
    
        for (let i = 0; i < count; i++) {
            const article = articles.nth(i);
            const date = article.locator(SELECTORS.ARTICLE_DATE);
            const href = await article.getAttribute('href') || 'href neznámý';
            const title = (await article.locator(SELECTORS.ARTICLE_TITLE).textContent())?.trim() || 'bez názvu';
    
            if (!(await date.isVisible())) {
                chyby.push(`Chybí datum u článku: "${title}" (${href})`);
            }
        }
    
        if (chyby.length > 0) {
            throw new Error(chyby.join('\n'));
        }
    }    

    async findFirstNonVideoArticle(): Promise<Locator> {
        const articles = this.getAllArticles();
        const count = await articles.count();
      
        for (let i = 0; i < count; i++) {
          const article = articles.nth(i);
          const videoFlag = article.locator(SELECTORS.ARTICLE_VIDEO_FLAG);
          const hasVideoFlag = (await videoFlag.count()) > 0;
      
          if (!hasVideoFlag) {
            return article;
          }
        }
      
        throw new Error('Nenašel se žádný článek bez VIDEO flagu.');
    }
}
