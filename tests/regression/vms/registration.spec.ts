import { test } from '@playwright/test';
import { VMSRegistrationPage } from '../../../pages/vms/VMSRegistrationPage';
import { generateVendorData } from '../../../fixtures/vendorData';

test.describe('VMS Registration Regression', () => {

  // ════════════════════════════════════════════
  // PAGE LOAD
  // ════════════════════════════════════════════

  test('Registration page displays all required elements', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.verifyText('Choose Type Vendor');
    await registrationPage.verifyText('Vendor Category');
    await registrationPage.verifyText('Vendor Entity');
    await registrationPage.verifyText('Vendor Name');
    await registrationPage.verifyText('PIC Name');
    await registrationPage.verifyText('PIC Email');
    await registrationPage.verifyText('List of Owner');
    await registrationPage.verifyText('List of Administrator');
  });

  test('Domestic is selected by default', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.verifyDomesticFieldsVisible();
  });

  // ════════════════════════════════════════════
  // VENDOR TYPE TOGGLE
  // ════════════════════════════════════════════

  test('Selecting Domestic shows NPWP and NIK fields', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.selectDomestic();
    await registrationPage.verifyDomesticFieldsVisible();
  });

  test('Selecting International shows Tax and ID fields', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.selectInternational();
    await registrationPage.verifyInternationalFieldsVisible();
  });

  test('Toggling between Domestic and International updates fields', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();

    await registrationPage.selectDomestic();
    await registrationPage.verifyDomesticFieldsVisible();

    await registrationPage.selectInternational();
    await registrationPage.verifyInternationalFieldsVisible();

    await registrationPage.selectDomestic();
    await registrationPage.verifyDomesticFieldsVisible();
  });

  // ════════════════════════════════════════════
  // DOMESTIC REGISTRATION
  // ════════════════════════════════════════════

  // Call data
  const data = generateVendorData();

  test('Fill domestic form with valid data', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);
    await registrationPage.verifyFormFieldValues(data.domestic);
  });

  test('Add owner to domestic vendor', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);

    await registrationPage.openOwnerModal();
    const owner = data.domestic.owners[0];
    await registrationPage.addOwnerRow(0, owner.name, owner.identityType, owner.identityNo);
    await registrationPage.saveOwnerModal();
  });

  test('Add administrator to domestic vendor', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);

    await registrationPage.openAdminModal();
    const admin = data.domestic.administrators[0];
    await registrationPage.addAdminRow(0, admin.name, admin.identityType, admin.identityNo);
    await registrationPage.saveAdminModal();
  });

  test('Submit domestic registration with all data', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);

    await registrationPage.openOwnerModal();
    for (let i = 0; i < data.domestic.owners.length; i++) {
      const owner = data.domestic.owners[i];
      await registrationPage.addOwnerRow(i, owner.name, owner.identityType, owner.identityNo);
    }
    await registrationPage.saveOwnerModal();

    await registrationPage.openAdminModal();
    for (let i = 0; i < data.domestic.administrators.length; i++) {
      const admin = data.domestic.administrators[i];
      await registrationPage.addAdminRow(i, admin.name, admin.identityType, admin.identityNo);
    }
    await registrationPage.saveAdminModal();

    await registrationPage.submitForm();
    await registrationPage.verifySubmitSuccess();
  });

  // ════════════════════════════════════════════
  // INTERNATIONAL REGISTRATION
  // ════════════════════════════════════════════

  test('Fill international form with valid data', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillInternationalForm(data.international);
    await registrationPage.verifyFormFieldValues(data.international);
  });

  test('Submit international registration with all data', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillInternationalForm(data.international);

    await registrationPage.submitForm();
    await registrationPage.verifySubmitSuccess();
  });

  // ════════════════════════════════════════════
  // OWNER MODAL
  // ════════════════════════════════════════════

  test('Owner modal opens correctly', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openOwnerModal();
    await registrationPage.verifyOwnerModalEmpty();
  });

  test('Owner modal closes with Back button', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openOwnerModal();
    await registrationPage.closeOwnerModalWithBack();
  });

  test('Owner modal closes with X button', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openOwnerModal();
    await registrationPage.closeOwnerModalWithX();
  });

  test('Delete owner row from modal', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openOwnerModal();
    const owner = data.domestic.owners[0];
    await registrationPage.addOwnerRow(0, owner.name, owner.identityType, owner.identityNo);
    await registrationPage.deleteOwnerRow(0);
    await registrationPage.verifyOwnerModalEmpty();
  });

  // ════════════════════════════════════════════
  // ADMIN MODAL
  // ════════════════════════════════════════════

  test('Admin modal opens correctly', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openAdminModal();
    await registrationPage.verifyAdminModalEmpty();
  });

  test('Admin modal closes with Back button', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openAdminModal();
    await registrationPage.closeAdminModalWithBack();
  });

  test('Admin modal closes with X button', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openAdminModal();
    await registrationPage.closeAdminModalWithX();
  });

  // ════════════════════════════════════════════
  // VALIDATION
  // ════════════════════════════════════════════

  test('Submit empty form shows required errors', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.submitForm();
    await registrationPage.verifyRequiredFieldError();
  });

  test('Submit with invalid NPWP shows error', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm({
      ...data.domestic,
      npwpNo: '123'
    });
    await registrationPage.submitForm();
    // adjust to your actual error message
    await registrationPage.verifyText('16');
  });

  test('Submit with invalid email shows error', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm({
      ...data.domestic,
      picEmail: 'invalid-email'
    });
    await registrationPage.submitForm();
    await registrationPage.verifyText('email');
  });

  test('Cancel navigates away from registration', async ({ page }) => {
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);
    await registrationPage.cancelForm();
    await registrationPage.verifyCancelNavigation();
  });

});