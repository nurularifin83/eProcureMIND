import { test } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { users } from '../../fixtures/users';

test('Authenticate Admin', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.admin.username,
    users.admin.password
  );

  await page.context().storageState({
    path: 'auth/admin.json'
  });

});