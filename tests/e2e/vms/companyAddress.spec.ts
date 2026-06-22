import { test } from '@playwright/test';
import { VMSProfilePage } from '../../../pages/vms/VMSProfilePage';
import { generateCompanyProfileData } from '../../../fixtures/vendorData';

test('Fill Company Address panel - mandatory fields', async ({ page }) => {
    const data = generateCompanyProfileData();
    const profilePage = new VMSProfilePage(page);

    await profilePage.goto();
    await profilePage.fillCompanyAddressMandatory(data.companyAddress);
    await profilePage.savePanel2();
    await profilePage.verifyPanel2Saved();
});