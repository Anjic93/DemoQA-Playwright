import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { AlertsFrameAndWindowsPage } from '../pages/AlertsFrameAndWindowsPage';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';
import { NewTabPage } from '../pages/NewTabPage';
import { NewWindowPage } from '../pages/NewWindowPage';
import { AlertsPage } from '../pages/AlertsPage';

test.use({
    ignoreHTTPSErrors: true,
})
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const mainPage = new MainPage(page);
    const alertsFrameAndWindowsPage = new AlertsFrameAndWindowsPage(page);
    await mainPage.clickOnAlertsFrameAndWindowsCard();
    await alertsFrameAndWindowsPage.assertAlertsFrameAndWindowsPage();
})

test.describe('Alerts, Frame and Windows Section', () => {
    test('Browser Windows testing', async ({ page }) => {
        const alertsFrameAndWindowsPage = new AlertsFrameAndWindowsPage(page);
        const browserWindowsPage = new BrowserWindowsPage(page);

        await alertsFrameAndWindowsPage.clickOnBrowserWindows();
        await browserWindowsPage.assertbrowserWindowsPage();

        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            browserWindowsPage.clickOnNewTabButton(),
        ])
        await newTab.waitForLoadState('load');
        await newTab.waitForTimeout(2000);
        console.log('NewTab URL: ' + await newTab.url());
        const newTabWindowPage = new NewTabPage(newTab);
        await newTabWindowPage.assertNewTab();

        await page.bringToFront();

        const [newWindow] = await Promise.all([
            page.waitForEvent('popup'),
            browserWindowsPage.clickOnNewWindowButton(),
        ])
        await newWindow.waitForLoadState('load');
        await newWindow.waitForTimeout(2000);
        console.log('NewWindow URL: ' + await newWindow.url());
        const newWindowPage = new NewWindowPage(newWindow);
        await newWindowPage.assertNewWindow();
    })

    test('Alerts testing', async ({ page }) => {
        const alertsFrameAndWindowsPage = new AlertsFrameAndWindowsPage(page);
        const alertsPage = new AlertsPage(page);

        await alertsFrameAndWindowsPage.clickOnAlerts();
        await alertsPage.assertAlertsPage();
        page.on('dialog', async (dialog) => {
            if (dialog.type() === 'alert' || dialog.type() === 'confirm') {
                await dialog.accept();
            }
        });
        await alertsPage.clickOnClickMeAlertButton();
    })
})