import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class VMSLegalDocumentsPage extends BasePage {


  // ── Company Deed Panel ───────────────────────
  readonly companyDeedPanel: Locator;
  readonly companyDeedPanelHeader: Locator;
  readonly companyDeedStatus: Locator;
  readonly companyDeedSaveButton: Locator;

  // ── Company Deed Fields ──────────────────────
  readonly deedNumberInput: Locator;
  readonly deedTypeDropdown: Locator;
  readonly deedDateInput: Locator;
  readonly notarisNameInput: Locator;
  readonly skKemenkumhamNumberInput: Locator;
  readonly skKemenkumhamDateInput: Locator;
  readonly skKemenkumhamFileInput: Locator;
  readonly deedFileInput: Locator;

  // ── Company Deed Table ───────────────────────
  readonly companyDeedDeleteButtons: Locator;

  // ── SweetAlert2 Confirmation ──────────────────
  readonly confirmationSaveButton: Locator;
  readonly confirmationBackButton: Locator;
  readonly deleteConfirmButton: Locator;

  constructor(page: Page) {
    super(page);

    // ── Company Deed ───────────────────────────
    this.companyDeedPanel =
      page.locator('.card').filter({ hasText: '1. Company Deed' });

    this.companyDeedPanelHeader =
      this.companyDeedPanel.locator('.card-header');

    this.companyDeedStatus =
      this.companyDeedPanel.locator('[data-status-label]');

    this.companyDeedSaveButton =
      this.companyDeedPanel.locator('.procsi-new-actions .btn-danger');

    this.deedNumberInput =
      this.companyDeedPanel.locator('input[name="number"]');

    this.deedTypeDropdown =
      this.companyDeedPanel.locator('.form-group')
        .filter({ hasText: 'Deed Type' })
        .locator('.basic-multi-select');

    this.deedDateInput =
      this.companyDeedPanel.locator('input[name="date"]');

    this.notarisNameInput =
      this.companyDeedPanel.locator('input[name="notaris_name"]');

    this.skKemenkumhamNumberInput =
      this.companyDeedPanel.locator('input[name="menkumham_number"]');

    this.skKemenkumhamDateInput =
      this.companyDeedPanel.locator('input[name="menkumham_date"]');

    this.skKemenkumhamFileInput =
      this.companyDeedPanel.locator('input.filepond--browser[name="menkumham_file"]');

    this.deedFileInput =
      this.companyDeedPanel.locator('input.filepond--browser[name="file"]');

    this.companyDeedDeleteButtons =
      this.companyDeedPanel.locator('.rt-tbody .btn.btn-xs.btn-danger');

    // ── SweetAlert2 ────────────────────────────
    this.confirmationSaveButton =
      page.locator('.swal2-confirm').filter({ hasText: 'Save' });

    this.confirmationBackButton =
      page.locator('.swal2-confirm').filter({ hasText: 'Back' });

    this.deleteConfirmButton =
      page.locator('.swal2-confirm').filter({ hasText: 'Yes, delete it!' });
  }

  // ════════════════════════════════════════════
  // NAVIGATION
  // ════════════════════════════════════════════
  async goto() {
    await this.page.goto('/vendor/profile/informasi-legal', { waitUntil: 'domcontentloaded' });
  }

  // ════════════════════════════════════════════
  // SHARED
  // ════════════════════════════════════════════
  async confirmSaveDialog() {
    await this.confirmationSaveButton.click();
    await this.confirmationBackButton.click();
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

  // ════════════════════════════════════════════
  // PANEL 1: COMPANY DEED
  // ════════════════════════════════════════════
  async expandCompanyDeedPanel() {
    await this.deedNumberInput.waitFor({ state: 'visible' });
  }

  async clearExistingDeedsIfAny() {
    try {
      await this.companyDeedDeleteButtons.first().waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      return;
    }
    await this.companyDeedDeleteButtons.first().click();
    await this.deleteConfirmButton.click();
    await this.deleteConfirmButton.waitFor({ state: 'hidden' });
    await this.companyDeedPanel.locator('.procsi-new-table__empty').waitFor({ state: 'visible' });
  }

  async fillCompanyDeed(data: {
    deedNumber: string;
    deedType: string;
    deedDate: string;
    notarisName?: string;
    skKemenkumhamNumber: string;
    skKemenkumhamDate: string;
    skKemenkumhamFilePath: string;
    deedFilePath: string;
  }) {
    await this.expandCompanyDeedPanel();
    await this.clearExistingDeedsIfAny();

    await this.deedNumberInput.fill(data.deedNumber);

    await this.deedTypeDropdown.click();
    await this.page.locator('.procsi-new-select__menu').getByText(data.deedType, { exact: true }).click();

    await this.deedDateInput.fill(data.deedDate);

    if (data.notarisName) {
      await this.notarisNameInput.fill(data.notarisName);
    }

    await this.skKemenkumhamNumberInput.fill(data.skKemenkumhamNumber);
    await this.skKemenkumhamDateInput.fill(data.skKemenkumhamDate);

    await this.uploadFileIfEmpty(
      this.skKemenkumhamFileInput,
      data.skKemenkumhamFilePath,
      this.companyDeedPanel.locator('.form-group').filter({ hasText: 'SK Kemenkumham File' })
    );

    await this.uploadFileIfEmpty(
      this.deedFileInput,
      data.deedFilePath,
      this.companyDeedPanel.locator('.form-group').filter({ hasText: 'Deed File' })
    );
  }

  async saveCompanyDeed() {
    await this.companyDeedSaveButton.click();
    await this.confirmSaveDialog();
  }

  async verifyCompanyDeedSaved() {
    await expect(this.companyDeedStatus).toHaveAttribute('data-status-label', 'Submit Registration');
  }
}
