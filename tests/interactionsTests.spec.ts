import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { InteractionsPage } from '../pages/InteractionsPage';
import { DroppablePage } from '../pages/DroppablePage';

test.use({
    ignoreHTTPSErrors: true,
})
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const mainPage = new MainPage(page);
    const interactionsPage = new InteractionsPage(page);
    await mainPage.clickOnInteractionsCard();
    await interactionsPage.assertInteractionsPage();
})

test.describe('Interactions Section', () => {

    test('Droppable Testing', async ({ page }) => {
        const interactionsPage = new InteractionsPage(page);
        const droppablePage = new DroppablePage(page);

        await interactionsPage.clickOnDroppable();
        await droppablePage.assertDroppablePage();
        await droppablePage.dragAndDrop();
    })
})