import { test } from '@playwright/test';
import { VMSRegistrationPage } from '../../../pages/vms/VMSRegistrationPage';
import { label, epic, feature, story, severity } from 'allure-js-commons';
import { generateVendorData } from '../../../fixtures/vendorData';

test.describe('VMS Registration Smoke', () => {

  test('Registration page loads correctly', async ({ page }) => {
    await epic('VMS');
    await feature('Registration');
    await story('Page Load');
    await severity('critical');

    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.verifyText('Choose Type Vendor');
    await registrationPage.verifyText('Vendor Category');
    await registrationPage.verifyText('PIC Name');
  });

  test('Domestic registration form loads correct fields', async ({ page }) => {
    await epic('VMS');
    await feature('Registration');
    await story('Domestic Form');
    await severity('critical');

    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.selectDomestic();
    await registrationPage.verifyDomesticFieldsVisible();
  });

  test('International registration form loads correct fields', async ({ page }) => {
    await epic('VMS');
    await feature('Registration');
    await story('International Form');
    await severity('critical');

    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.selectInternational();
    await registrationPage.verifyInternationalFieldsVisible();
  });

  test('Submit domestic registration successfully', async ({ page }) => {
    await epic('VMS');
    await feature('Registration');
    await story('Domestic Submit');
    await severity('critical');

    const data = generateVendorData();
    const registrationPage = new VMSRegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.fillDomesticForm(data.domestic);

    // Add Owner members
    await registrationPage.openOwnerModal();
    for (let i = 0; i < data.domestic.owners.length; i++) {
      const owner = data.domestic.owners[i];
      await registrationPage.addOwnerRow(i, owner.name, owner.identityType, owner.identityNo);
    }
    await registrationPage.saveOwnerModal();

    // Add Admin members
    await registrationPage.openAdminModal();
    for (let i = 0; i < data.domestic.administrators.length; i++) {
      const administrators = data.domestic.administrators[i];
      await registrationPage.addAdminRow(i, administrators.name, administrators.identityType, administrators.identityNo);
    }
    await registrationPage.saveAdminModal();

    // See owner members
    await registrationPage.openOwnerSeeMember();
    for (let i = 0; i < data.domestic.owners.length; i++) {
      const owner = data.domestic.owners[i];
      await registrationPage.verifyOwnerMemberRow(i, owner.name, owner.identityType, owner.identityNo);
    }
    await registrationPage.closeOwnerSeeMember();

    // See admin members
    await registrationPage.openAdminSeeMember();
    for (let i = 0; i < data.domestic.administrators.length; i++) {
      const administrators = data.domestic.administrators[i];
      await registrationPage.verifyAdminMemberRow(i, administrators.name, administrators.identityType, administrators.identityNo);
    }
    await registrationPage.closeAdminSeeMember();

    await registrationPage.submitForm();
    await registrationPage.confirmPdpStatement();
    await registrationPage.verifySubmitSuccess();
  });

});