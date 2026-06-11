import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

 async verifyLoaded() {
  await expect(
    this.page.locator('.procsi-page-breadcrumb__current')
  ).toHaveText('Task');
}
}