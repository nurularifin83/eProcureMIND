import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class VMSProfilePage extends BasePage {

  // ── Tab Navigation ──────────────────────────
  readonly companyProfileTab: Locator;

  // ── Panel Containers ─────────────────────────
  readonly panel1: Locator;
  readonly panel2: Locator;
  readonly panel5: Locator;

  // ── Panel 5: Board of Directors ──────────────
  readonly panel5Header: Locator;
  readonly panel5EditButtons: Locator;

  // ── Panel 1: Company Identity ────────────────
  readonly typeofCapitalDropdown: Locator;
  readonly institutionTypeDropdown: Locator;
  readonly qualificationDropdown: Locator;
  readonly directorNameInput: Locator;
  readonly companyEmailInput: Locator;
  readonly panel1SaveButton: Locator;  
  readonly panel1Status: Locator;

  // ── Panel 2: Company Address ─────────────────\
  readonly panel2Header: Locator;
  readonly addressInput: Locator;
  readonly postalCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly handphoneNumberInput: Locator;
  readonly provinceDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly panel2SaveButton: Locator;
  readonly panel2Status: Locator;

  // Panel 5 Form Fields
  readonly p5NameInput: Locator;
  readonly p5IdentityTypeDropdown: Locator;
  readonly p5IdentityNumberInput: Locator;
  readonly p5HandphoneInput: Locator;
  readonly p5NpwpInput: Locator;
  readonly p5PositionInput: Locator;
  readonly p5EmailInput: Locator;
  readonly p5IdentityFileInput: Locator;
  readonly p5NpwpFileInput: Locator;
  readonly panel5SaveButton: Locator;
  readonly panel5Status: Locator;

  // ── SweetAlert2 Confirmation ──────────────────
  readonly confirmationSaveButton: Locator;
  readonly confirmationBackButton: Locator;

  constructor(page: Page) {
    super(page);

    this.companyProfileTab =
        page.getByRole('tab', { name: 'Company Profile' });

    // ── Panel Containers ───────────────────────
    this.panel1 =
        page.locator('.card').filter({ hasText: '1. Company Identity' });

    this.panel2 =
        page.locator('.card').filter({ hasText: '2. Company Address' });

    // ── Panel 1 Fields ─────────────────────────
    this.typeofCapitalDropdown =
        this.panel1.locator('.form-group').filter({ hasText: 'Type of Capital' }).locator('.basic-multi-select');
        
    this.institutionTypeDropdown =
        this.panel1.locator('.form-group').filter({ hasText: 'Institution Type' }).locator('.basic-multi-select');
    
    this.directorNameInput =
        this.panel1.getByPlaceholder('Enter Director Name');
    
    this.companyEmailInput =
        this.panel1.getByPlaceholder('Enter Company Email');

    this.qualificationDropdown =
        this.panel1.locator('.form-group').filter({ hasText: 'Qualification' }).locator('.basic-multi-select');

    this.panel1SaveButton =
        this.panel1.getByRole('button', { name: 'Save' });   

    this.panel1Status =
      this.panel1.locator('[data-status-label]');

    // ── Panel 2 Fields ─────────────────────────
    this.panel2Header =
      this.panel2.locator('.card-header');

    this.addressInput =
      this.panel2.locator('input[name="address_address"]');

    this.postalCodeInput =
      this.panel2.locator('input[name="address_postal_code"]');

    this.phoneNumberInput =
      this.panel2.locator('input[name="address_nomor_telepon"]');

    this.handphoneNumberInput =
      this.panel2.locator('input[name="address_nomor_hp"]');

    this.provinceDropdown =
      this.panel2.locator('.form-group').filter({ hasText: 'Province' }).locator('.basic-multi-select');

    this.cityDropdown =
      this.panel2.locator('.form-group').filter({ hasText: 'City' }).locator('.basic-multi-select');

    this.panel2SaveButton =
      this.panel2.getByRole('button', { name: 'Save' });

    this.panel2Status =
      this.panel2.locator('[data-status-label]');

    // ── Panel 5 ────────────────────────────────
    this.panel5 =
      page.locator('.card').filter({ hasText: '5. Board of Directors' });

    this.panel5Header =
      this.panel5.locator('.card-header');

    this.panel5EditButtons =
      this.panel5.locator('.btn-warning');

    this.p5NameInput =
      this.panel5.locator('input[name="name"]');

    this.p5IdentityTypeDropdown =
      this.panel5.locator('.form-group').filter({ hasText: 'Identity Type' }).locator('.basic-multi-select');

    this.p5IdentityNumberInput =
      this.panel5.locator('input[name="ktp_no"]');

    this.p5HandphoneInput =
      this.panel5.locator('input[name="nomor_hp"]');

    this.p5NpwpInput =
      this.panel5.locator('input[name="npwp_no"]');

    this.p5PositionInput =
      this.panel5.locator('input[name="jabatan"]');

    this.p5EmailInput =
      this.panel5.locator('input[name="email"]');

    this.p5IdentityFileInput =
      this.panel5.locator('input.filepond--browser[name="ktp_file"]');

    this.p5NpwpFileInput =
      this.panel5.locator('input.filepond--browser[name="npwp_file"]');

    this.panel5SaveButton =
      this.panel5.locator('.procsi-new-actions .btn-danger');

    this.panel5Status =
      this.panel5.locator('[data-status-label]');

    // ── SweetAlert2 Confirmation ───────────────
    this.confirmationSaveButton = 
      page.locator('.swal2-confirm').filter({ hasText: 'Save' });

    this.confirmationBackButton =
      page.locator('.swal2-confirm').filter({ hasText: 'Back' });
  }

  // ════════════════════════════════════════════
  // NAVIGATION
  // ════════════════════════════════════════════
  async goto() {
    await this.page.goto('/task-vendor', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('link', { name: 'HERE' }).click();
  }

  // ════════════════════════════════════════════
  // SHARED
  // ════════════════════════════════════════════
  async confirmSaveDialog() {
    await this.confirmationSaveButton.click();
    await this.confirmationBackButton.click();
  }


  // ════════════════════════════════════════════
  // PANEL 1: COMPANY IDENTITY (Mandatory only)
  // ════════════════════════════════════════════
  async fillCompanyIdentityMandatory(data: {
    typeofCapital: string,
    institutionType: string;
    directorName: string;
    companyEmail: string;
    qualification: string;
  }) {
    await this.typeofCapitalDropdown.click();
    await this.page.locator('.select__menu').getByText(data.typeofCapital, { exact: true }).click();

    await this.institutionTypeDropdown.click();
    await this.page.locator('.select__menu').getByText(data.institutionType, { exact: true }).click();

    await this.directorNameInput.fill(data.directorName);

    await this.companyEmailInput.fill(data.companyEmail);

    await this.qualificationDropdown.click();
    await this.page.locator('.select__menu').getByText(data.qualification, { exact: true }).click();
  }

  async savePanel1() {
    await this.panel1SaveButton.click();
    await this.confirmSaveDialog();
  }

  async verifyPanel1Saved() {
    await expect(this.panel1Status).toHaveAttribute('data-status-label', 'Submit Registration');
  }

  // ════════════════════════════════════════════
  // PANEL 2: COMPANY ADDRESS (Mandatory only)
  // ════════════════════════════════════════════
  async expandPanel2() {
    const isCollapsed = await this.panel2.locator('.collapse.show').count() === 0;
    if (isCollapsed) {
      await this.panel2Header.click();
    }
    await this.addressInput.waitFor({ state: 'visible' });
  }

  async fillCompanyAddressMandatory(data: {
    address: string;
    province: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    handphoneNumber: string;
  }) {
    await this.expandPanel2();
    await this.addressInput.fill(data.address);
    await this.provinceDropdown.click();
    await this.page.locator('.select__menu').getByText(data.province, { exact: true }).click();
    await this.cityDropdown.click();
    await this.page.locator('.select__menu').getByText(data.city, { exact: true }).click();
    await this.postalCodeInput.fill(data.postalCode);
    await this.phoneNumberInput.fill(data.phoneNumber);
    await this.handphoneNumberInput.fill(data.handphoneNumber);    
  }

  async savePanel2() {
    await this.panel2SaveButton.click();
    await this.confirmSaveDialog();
  }

  async verifyPanel2Saved() {
    await expect(this.panel2Status).toHaveAttribute('data-status-label', 'Submit Registration');
  }

  // ════════════════════════════════════════════
  // PANEL 5: BOARD OF DIRECTORS
  // ════════════════════════════════════════════
  async expandPanel5() {
    const isCollapsed = await this.panel5.locator('.collapse.show').count() === 0;
    if (isCollapsed) {
      await this.panel5Header.click();
    }
    await this.p5NameInput.waitFor({ state: 'visible' });
  }

  async uploadFileIfEmpty(fileInput: Locator, filePath: string, panelLocator: Locator) {
    const alreadyUploaded = await panelLocator
      .getByText('Download current file')
      .count() > 0;

    if (!alreadyUploaded) {
      await fileInput.setInputFiles(filePath);
      await panelLocator
        .getByText('Download current file')
        .waitFor({ state: 'visible', timeout: 15000 });
    }
  }

  async editBoardMember(rowIndex: number, data: {
    handphoneNumber: string;
    npwp: string;
    position: string;
    email: string;
    identityFilePath: string;
    npwpFilePath: string;
  }) {

    await this.expandPanel5();
    // Click edit button for this row
    await this.panel5EditButtons.nth(rowIndex).click();

    // Wait for form to populate with row data
    await this.p5NameInput.waitFor({ state: 'visible' });

    // Fill only missing mandatory fields
    await this.p5HandphoneInput.fill(data.handphoneNumber);
    await this.p5NpwpInput.fill(data.npwp);
    await this.p5PositionInput.fill(data.position);
    await this.p5EmailInput.fill(data.email);

    // Only upload if not already uploaded
    await this.uploadFileIfEmpty(
      this.p5IdentityFileInput,
      data.identityFilePath,
      this.panel5.locator('.form-group').filter({ hasText: 'Identity File' })
    );

    await this.uploadFileIfEmpty(
      this.p5NpwpFileInput,
      data.npwpFilePath,
      this.panel5.locator('.form-group').filter({ hasText: 'NPWP File' })
    )
  }

  async savePanel5() {
    await this.panel5SaveButton.click();
    await this.confirmSaveDialog();
  }

  async verifyPanel5Saved() {
    await expect(this.panel5Status).toHaveAttribute('data-status-label', 'Submit Registration');
  }
}