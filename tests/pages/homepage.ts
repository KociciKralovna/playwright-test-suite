import { Page } from '@playwright/test';
import { SELECTORS } from '../locators/selectors';

export class Homepage {
    constructor(private page: Page) {}
  
    async goto() {
      await this.page.goto('https://sport.ceskatelevize.cz/');
    }
  
    async clickCategoryFromFullMenu(name: string) {
        await this.page.locator(SELECTORS.MENU_TOGGLE_BUTTON).click();
        await this.page.locator(`${SELECTORS.FULL_MENU_LINK}:has-text("${name}")`).click();
    }
  }
  
