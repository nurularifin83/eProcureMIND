import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async fill(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async verifyText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}