import { test } from '@playwright/test';
import { VMSProfilePage } from '../../../pages/vms/VMSProfilePage';
import { generateCompanyProfileData } from '../../../fixtures/vendorData';

test('Fill Company Identity panel - mandatory fields', async ({ page }) => {
    const data = generateCompanyProfileData();
    const profilePage = new VMSProfilePage(page);

    await profilePage.goto();
    await profilePage.fillCompanyIdentityMandatory(data.companyIdentity);
    await profilePage.savePanel1();
    await profilePage.verifyPanel1Saved();
});