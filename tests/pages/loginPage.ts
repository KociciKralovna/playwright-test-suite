import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly loginLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginSubmitButton: Locator;
  private readonly myAccountMenu: Locator;
  private readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginSubmitButton = page.locator('form[name="login"] button[type="submit"]');
    this.myAccountMenu = page.getByAltText('My account');
    this.logoutButton = page.getByRole('button', { name: /Odhlásit|Log out/i });
  }

  async gotoLogin() {
    await this.loginLink.click();
  }

  async login(email: string, password: string) {
    await this.loginSubmitButton.waitFor();
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async logout() {
    await this.myAccountMenu.click();
    await this.logoutButton.click();
  }

  getLoginLinkLocator(): Locator {
    return this.loginLink;
  }
}
