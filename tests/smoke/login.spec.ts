import { test } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { users } from '../../fixtures/users';

test('Login as Admin', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.admin.username,
    users.admin.password
  );

   await dashboardPage.verifyLoaded();

});

// Just for testing
test('Open Task Page without Login', async ({ page }) => {

  await page.goto('/task');

});