import { test, expect } from '@playwright/test';
import { VMSRegistrationPage } from '../../pages/vms/VMSRegistrationPage';
import { generateVendorData } from '../../fixtures/vendorData';

const data = generateVendorData();
const domestic = data.domestic;
const international = data.international;

test.describe('VMS Registration', () => {

  let registrationPage: VMSRegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
  });

  // ════════════════════════════════════════════
  // PAGE LOAD
  // ════════════════════════════════════════════
  test.describe('Page Load', () => {

    test('should display registration form correctly', async ({ page }) => {
      await registrationPage.verifyText('Choose Type Vendor');
      await registrationPage.verifyText('Vendor Category');
      await registrationPage.verifyText('Vendor Name');
      await registrationPage.verifyText('PIC Name');
      await registrationPage.verifyText('PIC Email');
      await registrationPage.verifyText('PIC Phone Number');
      await registrationPage.verifyText('List of Owner');
      await registrationPage.verifyText('List of Administrator');
    });

    test('should default to Domestic type', async () => {
      await registrationPage.verifyDomesticFieldsVisible();
    });

  });

  // ════════════════════════════════════════════
  // VENDOR TYPE TOGGLE
  // ════════════════════════════════════════════
  test.describe('Vendor Type Toggle', () => {

    test('should show domestic fields when Domestic selected', async () => {
      await registrationPage.selectDomestic();
      await registrationPage.verifyDomesticFieldsVisible();
    });

    test('should show international fields when International selected', async () => {
      await registrationPage.selectInternational();
      await registrationPage.verifyInternationalFieldsVisible();
    });

    test('should switch fields correctly when toggling', async () => {
      await registrationPage.selectDomestic();
      await registrationPage.verifyDomesticFieldsVisible();

      await registrationPage.selectInternational();
      await registrationPage.verifyInternationalFieldsVisible();

      await registrationPage.selectDomestic();
      await registrationPage.verifyDomesticFieldsVisible();
    });

  });

  // ════════════════════════════════════════════
  // DOMESTIC REGISTRATION
  // ════════════════════════════════════════════
  test.describe('Domestic Vendor', () => {

    test('should fill domestic form successfully', async () => {
      await registrationPage.fillDomesticForm(domestic);
      await registrationPage.verifyFormFieldValues(domestic);
    });

    test('should add owners to domestic vendor', async () => {
      await registrationPage.fillDomesticForm(domestic);
      await registrationPage.openOwnerModal();

      for (let i = 0; i < domestic.owners.length; i++) {
        const owner = domestic.owners[i];
        await registrationPage.addOwnerRow(i, owner.name, owner.identityType, owner.identityNo);
      }

      await registrationPage.saveOwnerModal();
    });

    test('should add administrators to domestic vendor', async () => {
      await registrationPage.fillDomesticForm(domestic);
      await registrationPage.openAdminModal();

      for (let i = 0; i < domestic.administrators.length; i++) {
        const admin = domestic.administrators[i];
        await registrationPage.addAdminRow(i, admin.name, admin.identityType, admin.identityNo);
      }

      await registrationPage.saveAdminModal();
    });

    test('should submit domestic registration successfully', async () => {
      await registrationPage.fillDomesticForm(domestic);

      await registrationPage.openOwnerModal();
      for (let i = 0; i < domestic.owners.length; i++) {
        await registrationPage.addOwnerRow(i, domestic.owners[i].name, domestic.owners[i].identityType, domestic.owners[i].identityNo);
      }
      await registrationPage.saveOwnerModal();

      await registrationPage.openAdminModal();
      for (let i = 0; i < domestic.administrators.length; i++) {
        await registrationPage.addAdminRow(i, domestic.administrators[i].name, domestic.administrators[i].identityType, domestic.administrators[i].identityNo);
      }
      await registrationPage.saveAdminModal();

      await registrationPage.submitForm();
      await expect(registrationPage['page']).toHaveURL(/success|dashboard|vendor/);
    });

  });

  // ════════════════════════════════════════════
  // INTERNATIONAL REGISTRATION
  // ════════════════════════════════════════════
  test.describe('International Vendor', () => {

    test('should fill international form successfully', async () => {
      await registrationPage.fillInternationalForm(international);
      await registrationPage.verifyFormFieldValues(international);
    });

    test('should submit international registration successfully', async () => {
      await registrationPage.fillInternationalForm(international);
      await registrationPage.submitForm();
      await expect(registrationPage['page']).toHaveURL(/success|dashboard|vendor/);
    });

  });

  // ════════════════════════════════════════════
  // OWNER MODAL
  // ════════════════════════════════════════════
  test.describe('Owner Modal', () => {

    test('should open owner modal', async () => {
      await registrationPage.openOwnerModal();
      await registrationPage.verifyText('List of Owner');
    });

    test('should show empty state in owner modal', async () => {
      await registrationPage.openOwnerModal();
      await registrationPage.verifyOwnerModalEmpty();
    });

    test('should close owner modal with Back button', async () => {
      await registrationPage.openOwnerModal();
      await registrationPage.closeOwnerModalWithBack();
    });

    test('should close owner modal with X button', async () => {
      await registrationPage.openOwnerModal();
      await registrationPage.closeOwnerModalWithX();
    });

    test('should delete owner row', async () => {
      await registrationPage.openOwnerModal();
      await registrationPage.addOwnerRow(0, 'Owner To Delete', 'KTP', '1234567890123456');
      await registrationPage.deleteOwnerRow(0);
      await registrationPage.verifyOwnerModalEmpty();
    });

  });

  // ════════════════════════════════════════════
  // ADMIN MODAL
  // ════════════════════════════════════════════
  test.describe('Admin Modal', () => {

    test('should open admin modal', async () => {
      await registrationPage.openAdminModal();
      await registrationPage.verifyText('List of Administrator');
    });

    test('should show empty state in admin modal', async () => {
      await registrationPage.openAdminModal();
      await registrationPage.verifyAdminModalEmpty();
    });

    test('should close admin modal with Back button', async () => {
      await registrationPage.openAdminModal();
      await registrationPage.closeAdminModalWithBack();
    });

    test('should close admin modal with X button', async () => {
      await registrationPage.openAdminModal();
      await registrationPage.closeAdminModalWithX();
    });

  });

  // ════════════════════════════════════════════
  // VALIDATION
  // ════════════════════════════════════════════
  test.describe('Form Validation', () => {

    test('should show error when submitting empty form', async ({ page }) => {
      await registrationPage.submitForm();
      const errors = page.locator('[class*="error"], [class*="invalid"]');
      await expect(errors.first()).toBeVisible();
    });

    test('should show error for invalid NPWP on domestic', async ({ page }) => {
      await registrationPage.selectDomestic();
      await registrationPage.fillDomesticForm({ ...domestic, npwpNo: '123' });
      await registrationPage.submitForm();
      const error = page.locator('[class*="error"]').filter({ hasText: /npwp|digit/i });
      await expect(error).toBeVisible();
    });

    test('should show error for invalid email', async ({ page }) => {
      await registrationPage.fillDomesticForm({ ...domestic, picEmail: 'invalid-email' });
      await registrationPage.submitForm();
      const error = page.locator('[class*="error"]').filter({ hasText: /email|valid/i });
      await expect(error).toBeVisible();
    });

    test('should cancel and navigate away', async ({ page }) => {
      await registrationPage.fillDomesticForm(domestic);
      await registrationPage.cancelForm();
      await expect(page).not.toHaveURL(/register/);
    });

  });

});