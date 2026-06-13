import { test } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { users } from '../../fixtures/users';
import { label, epic, feature, story, severity } from 'allure-js-commons';

test('Login as Admin', async ({ page }) => {
  await epic('Authentication');
  await feature('Login');
  await story('Admin Login');
  await severity('critical');

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