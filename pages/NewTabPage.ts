import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class NewTabPage {
    private page: Page;
    private sampleHeading;

    constructor(page: Page) {
        this.page = page;
        this.sampleHeading = page.locator('h1:has-text("This is a sample page")');
    }

    assertNewTab = async () => {
        await this.sampleHeading.waitFor();
        await expect(this.sampleHeading).toBeVisible(); 
    }
}