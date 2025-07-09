export const SELECTORS = {
    MENU_TOGGLE_BUTTON: '[data-ctcomp-part="sections-toggle-button"]',
    FULL_MENU_LINK: '.navbar__link-item',
    ARTICLE: 'a.article-link, a.opener',
    ARTICLE_TITLE: 'h2.article-link__title',
    ARTICLE_DATE: '[data-ctcomp="utils.DateFormatter"]',
    ARTICLE_VIDEO_FLAG: '.article-link__flag',
    RUBRIKA_HEADING: (selector: string) => selector,
    RELATED_ARTICLE: '[data-ctcomp="RelatedArticles"] a',
    ARTICLE_AUTHOR: '.article-author [itemprop="author"]',
    ARTICLE_SOURCE: '//span[contains(@class, "caption__source")][.//span[contains(text(), "zdroj")]]',
    ARTICLE_CATEGORY_BREADCRUMB: '.breadcrumb a[href^="/rubrika/"]',
  };
  