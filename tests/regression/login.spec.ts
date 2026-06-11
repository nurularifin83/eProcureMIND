import { test } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { users } from '../../fixtures/users';

test('Login with invalid password', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.admin.username,
    'WrongPassword123'
  );

  await loginPage.verifyLoginFailed();

});

test('Login with empty username', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    '',
    users.admin.password,
  );

  await loginPage.verifyEmptyUsername();

});

test('Login with empty password', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    users.admin.username,
    '',
  );

  await loginPage.verifyEmptyPassword();

});

test('Login with captcha required', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.verifyCaptchaRequired(
    users.admin.username,
    users.admin.password,
  );

});