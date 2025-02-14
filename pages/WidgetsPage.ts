import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class WidgetsPage {
    private page: Page;
    private widgetsAssert;
    private datePicker;
    private slider;

    constructor(page: Page) {
        this.page = page;
        this.widgetsAssert = page.locator('.element-group');
        this.datePicker = page.locator("li:has-text('Date Picker')");
        this.slider = page.locator("li:has-text('Slider')");
    }

    assertWidgetsPage = async () => {
        const count1 = await this.widgetsAssert.count();
        await Promise.all(
            Array.from({ length: count1 }, (_, i) =>
                expect(this.widgetsAssert.nth(i)).toBeVisible()
            )
        );
    }

    clickOnDatePicker = async () => {
        await this.datePicker.waitFor();
        await this.datePicker.click();
    }

    clickOnSlider = async () => {
        await this.slider.waitFor();
        await this.slider.click();
    }
}