import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class VMSRegistrationPage extends BasePage {

  // ── Vendor Type ──────────────────────────────
  readonly domesticRadio: Locator;
  readonly internationalRadio: Locator;

  // ── Dropdowns ────────────────────────────────
  readonly vendorCategoryDropdown: Locator;
  readonly vendorEntityDropdown: Locator;

  // ── Common Fields ────────────────────────────
  readonly vendorNameInput: Locator;
  readonly picNameInput: Locator;
  readonly picEmailInput: Locator;
  readonly picPhoneInput: Locator;

  // ── Domestic Only ────────────────────────────
  readonly npwpInput: Locator;
  readonly picNikInput: Locator;

  // ── International Only ───────────────────────
  readonly taxRegistrationInput: Locator;
  readonly picIdNumberInput: Locator;

  // ── Add Member Buttons (main form) ───────────
  readonly addOwnerButton: Locator;
  readonly addAdminButton: Locator;

  // ── Form Actions ─────────────────────────────
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  // ── Validation Messages ──────────────────────
  readonly vendorCategoryError: Locator;
  readonly vendorEntityError: Locator;
  readonly vendorNameError: Locator;
  readonly npwpError: Locator;
  readonly picNameError: Locator;
  readonly picEmailError: Locator;
  readonly picPhoneError: Locator;
  readonly picNikError: Locator;

  // ── Shared Modal Locators ────────────────────
  readonly ownerModal: Locator;
  readonly adminModal: Locator;
  readonly ownerModalTitle: Locator;
  readonly adminModalTitle: Locator;
  readonly ownerModalSaveButton: Locator;
  readonly ownerModalBackButton: Locator;
  readonly ownerModalCloseButton: Locator;
  readonly adminModalSaveButton: Locator;
  readonly adminModalBackButton: Locator;
  readonly adminModalCloseButton: Locator;
  readonly ownerModalAddMemberButton: Locator;
  readonly adminModalAddMemberButton: Locator;
  readonly ownerModalNameRequiredError: Locator;
  readonly ownerModalIdentityNoRequiredError: Locator;

  readonly ownerSeeMemberButton: Locator;
  readonly adminSeeMemberButton: Locator;

  readonly pdpCheckbox: Locator;
  readonly pdpSubmitButton: Locator;
  readonly pdpReviewAgainButton: Locator;

  constructor(page: Page) {
    super(page);

    // Vendor Type
    this.domesticRadio =
      page.getByLabel('Domestic');

    this.internationalRadio =
      page.getByLabel('International');

    // Dropdowns
    this.vendorCategoryDropdown =
      page.locator('.basic-multi-select').first();

    this.vendorEntityDropdown =
      page.locator('.basic-multi-select').nth(1);

    // Common Fields
    this.vendorNameInput =
      page.getByPlaceholder('Enter Vendor Name');

    this.picNameInput =
      page.getByPlaceholder('Enter PIC Name');

    this.picEmailInput =
      page.getByPlaceholder('Enter PIC Email');

    this.picPhoneInput =
      page.getByPlaceholder('Enter PIC Phone Number (62xxxxxxxxx)');

    // Domestic Only
    this.npwpInput =
      page.locator('div').filter({ hasText: 'NPWP No' }).locator('input[name="npwp_number"]');

    this.picNikInput =
      page.getByPlaceholder('Enter PIC NIK');

    // International Only
    this.taxRegistrationInput =
      page.locator('div').filter({ hasText: 'Tax Registration Number' }).locator('input[name="npwp_number"]');

    this.picIdNumberInput =
      page.getByPlaceholder('Enter PIC ID Number');

    // Add Member Buttons
    this.addOwnerButton =
      page.getByText('List of Owner')
        .locator('..').getByRole('button', { name: '+ Add Member' });

    this.addAdminButton =
      page.getByText('List of Administrator')
        .locator('..').getByRole('button', { name: '+ Add Member' });

    // Form Actions
    this.submitButton =
      page.getByRole('button', { name: 'Submit' });

    this.cancelButton =
      page.getByRole('button', { name: 'Cancel' });

    // Validation Messages
    this.vendorCategoryError =
      page.getByText(/vendor category.*required/i);

    this.vendorEntityError =
      page.getByText(/vendor entity.*required/i);

    this.vendorNameError =
      page.getByText(/vendor name.*required/i);

    this.npwpError =
      page.getByText(/npwp|16 digit/i);

    this.picNameError =
      page.getByText(/pic name.*required/i);

    this.picEmailError =
      page.getByText(/pic email.*valid|email.*required/i);

    this.picPhoneError =
      page.getByText(/pic phone number.*required/i);

    this.picNikError =
      page.getByText(/pic nik.*required/i);

      // Owner Modal
    this.ownerModal =
      page.locator('.custom-modal').filter({ hasText: 'List of Owner' });

    this.ownerModalTitle =
      page.getByRole('heading', { name: 'List of Owner' });

    this.ownerModalAddMemberButton =
      this.ownerModal.getByRole('button', { name: '+ Add Member' });

    this.ownerModalSaveButton =
      this.ownerModal.getByRole('button', { name: 'Save' });

    this.ownerModalBackButton =
      this.ownerModal.getByRole('button', { name: 'Back' });

    this.ownerModalCloseButton =
      this.ownerModal.locator('span', { hasText: '✕' });

    this.ownerModalNameRequiredError =
      this.ownerModal.getByText('Name is required');

    this.ownerModalIdentityNoRequiredError =
      this.ownerModal.getByText('Identity No is required');

    // Admin Modal
    this.adminModal =
      page.locator('.custom-modal').filter({ hasText: 'List of Administrator' });

    this.adminModalTitle =
      page.getByRole('heading', { name: 'List of Administrator' });

    this.adminModalAddMemberButton =
      this.adminModal.getByRole('button', { name: '+ Add Member' });

    this.adminModalSaveButton =
      this.adminModal.getByRole('button', { name: 'Save' });

    this.adminModalBackButton =
      this.adminModal.getByRole('button', { name: 'Back' });

    this.adminModalCloseButton =
      this.ownerModal.locator('span', { hasText: '✕' });

    this.ownerModalNameRequiredError =
      this.ownerModal.getByText('Name is required');

    this.ownerModalIdentityNoRequiredError =
      this.ownerModal.getByText('Identity No is required');

    this.ownerSeeMemberButton =
      page.locator('div').filter({ hasText: 'List of Owner' }).getByRole('button', { name: 'See Member' }).first();

    this.adminSeeMemberButton =
      page.locator('div').filter({ hasText: 'List of Administrator' }).getByRole('button', { name: 'See Member' }).last();

    // PDP Statement
    this.pdpCheckbox =
      page.getByRole('dialog').getByRole('checkbox');

    this.pdpSubmitButton =
      page.getByRole('button', { name: 'Submit Profile' });

    this.pdpReviewAgainButton =
      page.getByRole('button', { name: 'Review Again' });
  }

  // ════════════════════════════════════════════
  // NAVIGATION
  // ════════════════════════════════════════════
  async goto() {
    await this.page.goto('/beranda', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('button', { name: 'Register Here' }).click();
  }

  // ════════════════════════════════════════════
  // VENDOR TYPE
  // ════════════════════════════════════════════
  async selectDomestic() {
    await this.domesticRadio.click();
    await expect(this.domesticRadio).toBeChecked();
  }

  async selectInternational() {
    await this.internationalRadio.click();
    await expect(this.internationalRadio).toBeChecked();
  }

  // ════════════════════════════════════════════
  // DROPDOWNS
  // ════════════════════════════════════════════
  async selectVendorCategory(value: string) {
    await this.vendorCategoryDropdown.click();
    await this.page.locator('.select__option', { hasText: value }).click();
  }

  async selectVendorEntity(value: string) {
    await this.vendorEntityDropdown.click();
    await this.page.locator('.select__menu').getByText(value, { exact: true }).click();
  }

  // ════════════════════════════════════════════
  // FILL FORMS
  // ════════════════════════════════════════════
  async fillDomesticForm(data: {
    category: string;
    entity: string;
    vendorName: string;
    npwpNo: string;
    picName: string;
    picEmail: string;
    picPhone: string;
    picNik: string;
  }) {
    await this.selectDomestic();
    await this.selectVendorCategory(data.category);
    await this.selectVendorEntity(data.entity);
    await this.vendorNameInput.fill(data.vendorName);
    await this.npwpInput.fill(data.npwpNo);
    await this.picNameInput.fill(data.picName);
    await this.picEmailInput.fill(data.picEmail);
    await this.picPhoneInput.fill(data.picPhone);
    await this.picNikInput.fill(data.picNik);
  }

  async fillInternationalForm(data: {
    category: string;
    entity: string;
    vendorName: string;
    taxRegistrationNumber: string;
    picName: string;
    picEmail: string;
    picPhone: string;
    picIdNumber: string;
  }) {
    await this.selectInternational();
    await this.selectVendorCategory(data.category);
    await this.selectVendorEntity(data.entity);
    await this.vendorNameInput.fill(data.vendorName);
    await this.taxRegistrationInput.fill(data.taxRegistrationNumber);
    await this.picNameInput.fill(data.picName);
    await this.picEmailInput.fill(data.picEmail);
    await this.picPhoneInput.fill(data.picPhone);
    await this.picIdNumberInput.fill(data.picIdNumber);
  }

  // ── Shared Modal Actions ─────────────────────
  async verifyOwnerModalVisible() {
    await expect(this.ownerModal).toBeVisible();
    await expect(this.ownerModalTitle).toBeVisible();
  }

  async verifyOwnerModalHidden() {
    await expect(this.ownerModal).not.toBeVisible();
  }

  async verifyAdminModalVisible() {
    await expect(this.adminModal).toBeVisible();
    await expect(this.adminModalTitle).toBeVisible();
  }

  async verifyAdminModalHidden() {
    await expect(this.adminModal).not.toBeVisible();
  }

  async verifyOwnerModalEmpty() {
    await expect(this.ownerModalNameRequiredError).toBeVisible();
    await expect(this.ownerModalIdentityNoRequiredError).toBeVisible();
  }

  async verifyAdminModalEmpty() {
    await expect(this.ownerModalNameRequiredError).toBeVisible();
    await expect(this.ownerModalIdentityNoRequiredError).toBeVisible();
  }

  async closeOwnerSeeMember() {
    await this.ownerModalBackButton.click();
  }

  async closeAdminSeeMember() {
    await this.adminModalBackButton.click();
  }

  // ════════════════════════════════════════════
  // OWNER MODAL
  // ════════════════════════════════════════════
  async fillOwnerRow(index: number, name: string, identityType: string, identityNo: string) {
    const nameInput =
      this.ownerModal.locator('input.form-control').nth(index * 2);

    const identityNoInput =
      this.ownerModal.locator('input.form-control').nth(index * 2 + 1);

    const identityTypeSelect =
      this.ownerModal.locator('select.form-control').nth(index);

    await nameInput.fill(name);
    await identityTypeSelect.waitFor({ state: 'visible' });
    await identityTypeSelect.selectOption({ value: identityType });
    await identityNoInput.fill(identityNo);
  }

  async openOwnerModal() {
    await this.addOwnerButton.click();
    await this.verifyOwnerModalVisible();
  }

  async addOwnerRow(index: number, name: string, identityType: string, identityNo: string) {
    await this.ownerModalAddMemberButton.click();
    await this.fillOwnerRow(index, name, identityType, identityNo);
  }

  async deleteOwnerRow(index: number) {
    await this.ownerModal
    .locator('.fa-trash')
    .nth(index)
    .click();
  }

  async saveOwnerModal() {
    await this.ownerModalSaveButton.click();
    await this.verifyOwnerModalHidden();
  }

  async closeOwnerModalWithBack() {
    await this.ownerModalBackButton.click();
    await this.verifyOwnerModalHidden();
  }

  async closeOwnerModalWithX() {
    await this.ownerModalCloseButton.click();
    await this.verifyOwnerModalHidden();
  }

  // ════════════════════════════════════════════
  // ADMIN MODAL
  // ════════════════════════════════════════════
    async fillAdminRow(index: number, name: string, identityType: string, identityNo: string) {
    const nameInput =
      this.adminModal.locator('input.form-control').nth(index * 2);

    const identityNoInput =
      this.adminModal.locator('input.form-control').nth(index * 2 + 1);

    const identityTypeSelect =
      this.adminModal.locator('select.form-control').nth(index);

    await nameInput.fill(name);
    await identityTypeSelect.waitFor({ state: 'visible' });
    await identityTypeSelect.selectOption({ value: identityType });
    await identityNoInput.fill(identityNo);
  }


  async openAdminModal() {
    await this.addAdminButton.click();
    await this.verifyAdminModalVisible();
  }

  async addAdminRow(index: number, name: string, identityType: string, identityNo: string) {
    await this.adminModalAddMemberButton.click();
    await this.fillAdminRow(index, name, identityType, identityNo);
  }

  async saveAdminModal() {
    await this.adminModalSaveButton.click();
    await this.verifyAdminModalHidden();
  }

  async closeAdminModalWithBack() {
    await this.adminModalBackButton.click();
    await this.verifyAdminModalHidden();
  }

  async closeAdminModalWithX() {
    await this.adminModalCloseButton.click();
    await this.verifyAdminModalHidden();
  }

  // ════════════════════════════════════════════
  // FORM ACTIONS
  // ════════════════════════════════════════════
  async submitForm() {
    await this.submitButton.click();
  }

  async cancelForm() {
    await this.cancelButton.click();
  }

  // ════════════════════════════════════════════
  // VERIFY
  // ════════════════════════════════════════════
  async verifyDomesticFieldsVisible() {
    await expect(this.npwpInput).toBeVisible();
    await expect(this.picNikInput).toBeVisible();
    await expect(this.taxRegistrationInput).not.toBeVisible();
    await expect(this.picIdNumberInput).not.toBeVisible();
  }

  async verifyInternationalFieldsVisible() {
    await expect(this.taxRegistrationInput).toBeVisible();
    await expect(this.picIdNumberInput).toBeVisible();
    await expect(this.npwpInput).not.toBeVisible();
    await expect(this.picNikInput).not.toBeVisible();
  }

  async verifyFormFieldValues(data: {
    vendorName: string;
    picName: string;
    picEmail: string;
    picPhone: string;
  }) {
    await expect(this.vendorNameInput).toHaveValue(data.vendorName);
    await expect(this.picNameInput).toHaveValue(data.picName);
    await expect(this.picEmailInput).toHaveValue(data.picEmail);
    await expect(this.picPhoneInput).toHaveValue(data.picPhone);
  }

  async verifySubmitSuccess() {
    await expect(this.page).toHaveURL('/beranda');
  }

  async verifyCancelNavigation() {
    await expect(this.page).not.toHaveURL('/beranda');
  }

  async verifyRequiredFieldError() {
    await expect(this.vendorCategoryError).toBeVisible();
    await expect(this.vendorEntityError).toBeVisible();
    await expect(this.vendorNameError).toBeVisible();
    await expect(this.picNameError).toBeVisible();
    await expect(this.picEmailError).toBeVisible();
    await expect(this.picPhoneError).toBeVisible();
  }

  // See members
  async openOwnerSeeMember() {
    await this.ownerSeeMemberButton.click();
    await expect(this.ownerModalTitle).toBeVisible();
  }

  async openAdminSeeMember() {
    await this.adminSeeMemberButton.click();
    await expect(this.adminModalTitle).toBeVisible();
  }

  async verifyOwnerMemberRow(index: number, name: string, identityType: string, identityNo: string) {
    const row = this.ownerModal.locator('tbody tr').nth(index);
    await expect(row).toContainText(name);
    await expect(row).toContainText(new RegExp(identityType, 'i'));
    await expect(row).toContainText(identityNo);
  }

  async verifyAdminMemberRow(index: number, name: string, identityType: string, identityNo: string) {
    const row = this.adminModal.locator('tbody tr').nth(index);
    await expect(row).toContainText(name);
    await expect(row).toContainText(new RegExp(identityType, 'i'));
    await expect(row).toContainText(identityNo);
  }

  async closeSeeMemberModal() {
    await this.ownerModalBackButton.click();
  }

  // Verify PDP Statement
  async confirmPdpStatement() {
    await this.pdpCheckbox.check();
    await this.pdpSubmitButton.click();
  }
}