import {test, expect, Page} from '@playwright/test';
import {Homepage} from '../pages/homepage';
import {RubrikaPage} from '../pages/rubrikaPage';
import {ArticlePage} from '../pages/articlePage';
import {categories} from '../data/categories';


test('Cyklistika - kontrola clanku v rubrice, detailu clanku a souvisejicich', async ({ page }) => {
    const homepage = new Homepage(page);
    const rubrika = new RubrikaPage(page);
    const article = new ArticlePage(page);
    const category = categories.CYKLISTIKA;

    await homepage.goto();
    await homepage.clickCategoryFromFullMenu(category.name);
    await rubrika.expectRubrikaHeading(category);
    await rubrika.expectArticleCountMatchesLimit();
    await rubrika.expectArticlesHaveDate();

    const clanek = await rubrika.findFirstNonVideoArticle();
    await clanek.click();

    await article.expectAuthorAndSource();
    await article.expectRelatedArticleHasSameRubrika(category.slug);
})