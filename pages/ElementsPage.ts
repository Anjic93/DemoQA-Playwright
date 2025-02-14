import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class ElementsPage {
    private page: Page;
    private elementsAssert;
    private textBox;
    private checkBox;
    private radioButton;
    private webTables;
    private uploadAndDownload;

    constructor(page: Page) {
        this.page = page;
        this.elementsAssert = page.locator('.element-group');
        this.textBox = page.locator('.btn.btn-light').nth(0);
        this.checkBox = page.locator('.btn.btn-light').nth(1);
        this.radioButton = page.locator('.btn.btn-light').nth(2);
        this.webTables = page.locator('.btn.btn-light').nth(3);
        this.uploadAndDownload = page.locator('.btn.btn-light').nth(7);
    }

    assertElementsPage = async () => {
        const count1 = await this.elementsAssert.count();
        await Promise.all(
            Array.from({ length: count1 }, (_, i) =>
                expect(this.elementsAssert.nth(i)).toBeVisible()
            )
        );
    }

    clickOnTextBox = async () => {
        const textContent1 = await this.textBox.textContent();
        if(textContent1 && textContent1.includes('Text Box')) {
            await this.textBox.click();
        }
    }

    clickOnCheckBox = async () => {
        const textContent2 = await this.checkBox.textContent();
        if(textContent2 && textContent2.includes('Check Box')) {
            await this.checkBox.click();
        }
    }

    clickOnRadioButton = async () => {
        const textContent3 = await this.radioButton.textContent();
        if(textContent3 && textContent3.includes('Radio Button')) {
            await this.radioButton.click();
        }
    }

    clickOnWebTables = async () => {
        const textContent4 = await this.webTables.textContent();
        if(textContent4 && textContent4.includes('Web Tables')) {
            await this.webTables.click();
        } 
    }

    clickOnUploadAndDownload = async () => {
        const textContent5 = await this.uploadAndDownload.textContent();
        if(textContent5 && textContent5.includes('Upload and Download')) {
            await this.uploadAndDownload.click();
        } 
    }
}