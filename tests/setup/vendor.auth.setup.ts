import { test } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { users } from '../../fixtures/users';

test('Authenticate Vendor', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.vendor.username,
    users.vendor.password
  );

  await page.waitForURL('**/beranda**');
  await page.waitForTimeout(1000);

  await page.context().storageState({
    path: 'auth/vendor.json'
  });

});