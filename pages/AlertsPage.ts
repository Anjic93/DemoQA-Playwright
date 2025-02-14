import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class AlertsPage {
    private page: Page;
    private alertsTitle;
    private clickMeButton;

    constructor(page: Page) {
        this.page = page;
        this.alertsTitle = page.locator('h1.text-center');
        this.clickMeButton = page.locator('#alertButton');
    }

    assertAlertsPage = async () => {
        await this.alertsTitle.waitFor();
        await expect(this.alertsTitle).toBeVisible();
        await expect(this.alertsTitle).toHaveText('Alerts');
    }

    clickOnClickMeAlertButton = async () => {
        await this.clickMeButton.click();
    }
}