import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { DatePickerPage } from '../pages/DatePickerPage';
import { SliderPage } from '../pages/SliderPage';
test.use({
    ignoreHTTPSErrors: true,
})
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const mainPage = new MainPage(page);
    const widgetsPage = new WidgetsPage(page);
    await mainPage.clickOnWidgetsCard();
    await widgetsPage.assertWidgetsPage();
})

test.describe('Widgets Section', () => {
    test('Date Picker testing', async ({ page }) => {
        const widgetsPage = new WidgetsPage(page);
        const datePickerPage = new DatePickerPage(page);

        await widgetsPage.clickOnDatePicker();
        await datePickerPage.assertDatePickerPage();
        await datePickerPage.clickOnSelectDateAndChooseDate('April', 11);
    })

    test('Slider testing', async ({ page }) => {
        const widgetsPage = new WidgetsPage(page);
        const sliderPage = new SliderPage(page);

        await widgetsPage.clickOnSlider();
        await sliderPage.assertSliderPage();
        await sliderPage.interactWithSlider(50);
    })
})