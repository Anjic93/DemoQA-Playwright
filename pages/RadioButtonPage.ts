import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class RadioButtonPage {
    private page: Page;
    private radioButtonTitle;
    private yesButton;
    private yesResult;
    private disabledNoButton;

    constructor(page: Page) {
        this.page = page;
        this.radioButtonTitle = page.locator('h1.text-center');
        this.yesButton = page.locator('input[id="yesRadio"]');
        this.yesResult = page.locator('.text-success');
        this.disabledNoButton = page.locator('input[id="noRadio"]');
    }

    assertRadioButtonPage = async () => {
        await this.radioButtonTitle.waitFor();
        await expect(this.radioButtonTitle).toBeVisible();
        await expect(this.radioButtonTitle).toHaveText('Radio Button');
    }

    clickOnYesButton = async () => {
        await this.yesButton.waitFor();
        await this.yesButton.click({ force: true });
        await expect(this.yesResult).toBeVisible();
        await expect(this.yesResult).toHaveText('Yes');
    }

    verifyDisabledNoButton = async () => {
        await this.disabledNoButton.waitFor();
        await expect(this.disabledNoButton).toBeDisabled();
        if(await this.disabledNoButton.isDisabled()) {
            console.log('No button is not clickable!');
        };
    }
}