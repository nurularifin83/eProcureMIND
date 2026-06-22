import { test } from '@playwright/test';
import { VMSProfilePage } from '../../../pages/vms/VMSProfilePage';
import { generateCompanyProfileData } from '../../../fixtures/vendorData';

test('Fill Company Address panel - mandatory fields', async ({ page }) => {
    const data = generateCompanyProfileData();
    const profilePage = new VMSProfilePage(page);

    await profilePage.goto();
    // Edit both board members
    for (let i = 0; i < data.boardMembers.length; i++) {
        await profilePage.editBoardMember(i, data.boardMembers[i]);
        await profilePage.savePanel5();
    }
    await profilePage.verifyPanel5Saved();
});