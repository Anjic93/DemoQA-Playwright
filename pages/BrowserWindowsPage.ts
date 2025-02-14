import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class BrowserWindowsPage { 
    private page: Page;
    private browserWindowsTitle;
    private newTabButton;
    private newWindowButton;

    constructor(page: Page) {
        this.page = page;
        this.browserWindowsTitle = page.locator('h1.text-center');
        this.newTabButton = page.getByRole('button', { name: 'New Tab' });
        this.newWindowButton = page.locator('id=windowButton');
    }

    assertbrowserWindowsPage = async () => {
        await this.browserWindowsTitle.waitFor();
        await expect(this.browserWindowsTitle).toBeVisible();
        await expect(this.browserWindowsTitle).toHaveText('Browser Windows');
    }

    clickOnNewTabButton = async () => {
        await this.newTabButton.waitFor();
        await this.newTabButton.click();
    }

    clickOnNewWindowButton = async () => {
        await this.newWindowButton.waitFor();
        await this.newWindowButton.click();
    }
}