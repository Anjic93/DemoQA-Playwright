import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class InteractionsPage {
    private page: Page;
    private interactionsAssert;
    private droppable;

    constructor(page: Page) {
        this.page = page;
        this.interactionsAssert = page.locator('.element-group');
        this.droppable = page.locator("li:has-text('Droppable')");
    }

    assertInteractionsPage = async () => {
        const count1 = await this.interactionsAssert.count();
        await Promise.all(
            Array.from({ length: count1 }, (_, i) =>
                expect(this.interactionsAssert.nth(i)).toBeVisible()
            )
        );
    }

    clickOnDroppable = async () => {
        await this.droppable.waitFor();
        await this.droppable.click();
    }
}