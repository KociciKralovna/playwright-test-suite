import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async gotoLogin() {
    await this.page.getByRole('link', { name: 'Log In' }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator('form[name="login"] button[type="submit"]').waitFor();
    await this.page.locator('#username').fill(email);
    await this.page.locator('#password').fill(password);
    await this.page.locator('form[name="login"] button[type="submit"]').click();
  }

  async logout() {
    await this.page.getByAltText('My account').click();
    await this.page.getByRole('button', { name: /Odhlásit|Log out/i }).click();
  }
}
