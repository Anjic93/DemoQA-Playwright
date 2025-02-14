import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class SliderPage {
    private page: Page;
    private sliderTitle;
    private slider;
    private sliderValueInput;

    constructor(page: Page) {
        this.page = page;
        this.sliderTitle = page.locator('h1.text-center');
        this.slider = page.locator('input[type="range"]');
        this.sliderValueInput = page.locator('#sliderValue');
    }

    assertSliderPage = async () => {
        await this.sliderTitle.waitFor();
        await expect(this.sliderTitle).toBeVisible();
        await expect(this.sliderTitle).toHaveText('Slider');
    }

    interactWithSlider = async (value: any) => {
        const boundingBox = await this.slider.boundingBox();
        if (boundingBox) {
            await this.page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(boundingBox.x + boundingBox.width * 0.8, boundingBox.y + boundingBox.height / 2); 
            await this.page.mouse.up();
        }
    }
}