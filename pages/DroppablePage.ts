import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class DroppablePage {
    private page: Page;
    private droppableTitle;
    private dragMe;
    private dropHere;
    private dropped;
    

    constructor(page: Page) {
        this.page = page;
        this.droppableTitle = page.locator('h1.text-center');
        this.dragMe = page.locator('id=draggable').first();
        this.dropHere = page.locator('div.drop-box:has-text("Drop here")').first();
        this.dropped = page.locator('.drop-box.ui-droppable.ui-state-highlight:has-text("Dropped!")');
    }

    assertDroppablePage = async () => {
        await this.droppableTitle.waitFor();
        await expect(this.droppableTitle).toBeVisible();
        await expect(this.droppableTitle).toHaveText('Droppable');
    }

    dragAndDrop = async () => {
        await this.dragMe.waitFor();
        await this.dropHere.waitFor();

        await this.dragMe.dragTo(this.dropHere);
        await expect(this.dropped).toHaveText('Dropped!');
    }
}