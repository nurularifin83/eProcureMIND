import { test } from '@playwright/test';
import { VMSLegalDocumentsPage } from '../../../pages/vms/VMSLegalDocumentsPage';
import { generateCompanyProfileData } from '../../../fixtures/vendorData';

test('Fill Company Deed panel - mandatory fields', async ({ page }) => {
  const data = generateCompanyProfileData();
  const legalDocsPage = new VMSLegalDocumentsPage(page);

  await legalDocsPage.goto();
  await legalDocsPage.fillCompanyDeed(data.companyDeed);
  await legalDocsPage.saveCompanyDeed();
  await legalDocsPage.verifyCompanyDeedSaved();
});
