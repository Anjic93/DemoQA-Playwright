import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { faker } from '@faker-js/faker';



export class TextBoxPage {
    private page: Page;
    private textBoxTitle;
    private fullName;
    private email;
    private currAddress;
    private permAddress;
    private submitButton;
    private formOutput;

    constructor(page: Page) {
        this.page = page;
        this.textBoxTitle = page.locator('h1.text-center');
        this.fullName = page.getByPlaceholder('Full Name');
        this.email = page.getByPlaceholder('name@example.com');
        this.currAddress = page.getByPlaceholder('Current Address');
        this.permAddress = page.locator('id=permanentAddress');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.formOutput = page.locator('id=output');
    }

    assertTextBoxPage = async () => {
        await this.textBoxTitle.waitFor();
        await expect(this.textBoxTitle).toBeVisible();
        await expect(this.textBoxTitle).toHaveText('Text Box');
    }

    fillTextBoxForm = async () => {
        const fullNameGenerated = faker.person.firstName() + '' + faker.person.lastName();
        const emailGenerated = faker.internet.email();
        const currAddress = faker.location.streetAddress();
        const permAddress = faker.location.streetAddress();
        await this.fullName.clear();
        await this.fullName.fill(fullNameGenerated);
        await this.email.clear();
        await this.email.fill(emailGenerated);
        await this.currAddress.clear();
        await this.currAddress.fill(currAddress);
        await this.permAddress.clear();
        await this.permAddress.fill(permAddress);
        await this.submitButton.click();
        await this.formOutput.waitFor();
        await expect(this.formOutput).toBeVisible();

        await expect(this.formOutput).toContainText(fullNameGenerated);
        await expect(this.formOutput).toContainText(emailGenerated);
        await expect(this.formOutput).toContainText(currAddress);
        await expect(this.formOutput).toContainText(permAddress);
    }
}