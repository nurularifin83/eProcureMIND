import { test } from '@playwright/test';
import { VMSProfilePage } from '../../../pages/vms/VMSProfilePage';
import { generateCompanyProfileData } from '../../../fixtures/vendorData';

test('Fill PIC panel - mandatory fields', async ({ page }) => {
    const data = generateCompanyProfileData();
    const profilePage = new VMSProfilePage(page);

    await profilePage.goto();
    // Edit both board members
    for (let i = 0; i < data.pic.length; i++) {
        await profilePage.editPIC(i, data.pic[i]);
        await profilePage.savePanel6();
    }
    await profilePage.verifyPanel5Saved();
});