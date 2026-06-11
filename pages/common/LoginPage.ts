import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly captchaCheckbox: Locator;
  readonly loginButton: Locator;
  readonly loginFailedMessage: Locator;
  readonly emptyUsernameMessage: Locator;
  readonly emptyPasswordMessage: Locator;
  readonly captchaRequiredMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput =
      page.locator('[name="username"]');

    this.passwordInput =
      page.locator('[name="password"]');

    this.captchaCheckbox =
      page.locator('#captcha');

    this.loginButton =
      page.getByRole('button', { name: 'Login' });
      
    this.loginFailedMessage =
      page.getByText('Username or Password is wrong.');

    this.emptyUsernameMessage = 
      page.getByText('* The username field is required.');

    this.emptyPasswordMessage = 
      page.getByText('* The password field is required.');

    this.captchaRequiredMessage = 
      page.getByText('Please verify that you are not a robot.');
  }

  async goto() {
    await this.page.goto('/beranda', {
      waitUntil: 'domcontentloaded'
    });
  }

  // Login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.captchaCheckbox.check();
    await this.loginButton.click();
  }

  // Verify wanted responses
  async verifyLoginFailed() {
    await expect(this.loginFailedMessage).toBeVisible();
  }

  async verifyEmptyUsername() {
    await expect(this.emptyUsernameMessage).toBeVisible();
  }

  async verifyEmptyPassword() {
    await expect(this.emptyPasswordMessage).toBeVisible();
  }

  async verifyCaptchaRequired(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.captchaRequiredMessage).toBeVisible();
  }
}