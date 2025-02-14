import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class AlertsFrameAndWindowsPage {
    private page: Page;
    private elementsAssert;
    private browserWindows;
    private alerts;

    constructor(page: Page) {
        this.page = page;
        this.elementsAssert = page.locator('.element-group');
        this.browserWindows = page.locator("li:has-text('Browser Windows')");
        this.alerts = page.locator("li:has-text('Alerts')");
    }

    assertAlertsFrameAndWindowsPage = async () => {
        const count1 = await this.elementsAssert.count();
        await Promise.all(
            Array.from({ length: count1 }, (_, i) =>
                expect(this.elementsAssert.nth(i)).toBeVisible()
            )
        );
    }

    clickOnBrowserWindows = async () => {
        await this.browserWindows.click();
    }

    clickOnAlerts = async () => {
        await this.alerts.click();
    }
}