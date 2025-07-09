import { test, expect } from '@playwright/test';
import { categories } from '../data/categories';

test.use({ viewport: { width: 699, height: 900 } }); // pod 700px

test('Mobilní zobrazení - Cyklistika v hamburger menu', async ({ page }) => {
  const { name, headingSelector } = categories.CYKLISTIKA;

  await page.goto('https://sport.ceskatelevize.cz/');

  const hamburgerMenu = page.locator('[data-ctcomp-part="sections-toggle-button"]');
  await expect(hamburgerMenu).toBeVisible();
  await hamburgerMenu.click();

  const vsechnySporty = page.locator('#togglebtn2');
  await expect(vsechnySporty).toBeVisible();
  await vsechnySporty.click();

  const cyklistikaLink = page.locator('a[href="/rubrika/cyklistika"]');
  await expect(cyklistikaLink).toBeVisible();
  await cyklistikaLink.click();

  const heading = page.locator(headingSelector);
  await expect(heading).toHaveText(name);
});
