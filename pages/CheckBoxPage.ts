import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class CheckBoxPage {
    private page: Page;
    private checkBoxTitle;
    private arrowButton;
    private checkBox;
    private result;
    private desktopResultText;

    constructor(page: Page) {
        this.page = page;
        this.checkBoxTitle = page.locator('h1.text-center');
        this.arrowButton = page.getByRole('button', { name: 'Toggle' });
        this.checkBox = page.locator('.rct-checkbox');
        this.result = page.locator('id=result');
        this.desktopResultText = page.locator('.text-success').first();
    }

    assertCheckBoxPage = async () => {
        await this.checkBoxTitle.waitFor();
        await expect(this.checkBoxTitle).toBeVisible();
        await expect(this.checkBoxTitle).toHaveText('Check Box');
    }

    clickOnArrowButton = async () => {
        await this.arrowButton.waitFor();
        await this.arrowButton.click();
    }

    checkOnDesktopCheckBox = async () => {
         await this.checkBox.nth(1).click();
         await expect(this.result).toBeVisible();
         await expect(this.desktopResultText).toHaveText('desktop'); 
    }
}