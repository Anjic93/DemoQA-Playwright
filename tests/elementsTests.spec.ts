import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { ElementsPage } from '../pages/ElementsPage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { UploadAndDownloadPage } from '../pages/UploadAndDownloadPage';


test.use({
    ignoreHTTPSErrors: true,
})

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const mainPage = new MainPage(page);
    const elementsPage = new ElementsPage(page);
    await mainPage.clickOnElementsCard();
    await elementsPage.assertElementsPage();
})

test.describe('Elements Section', () => {
    test('Text Box testing', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        const textBoxPage = new TextBoxPage(page);

        await elementsPage.clickOnTextBox();
        await textBoxPage.assertTextBoxPage();
        await textBoxPage.fillTextBoxForm();
    })

    test('Check Box testing', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        const checkBoxPage = new CheckBoxPage(page);

        await elementsPage.clickOnCheckBox();
        await checkBoxPage.assertCheckBoxPage();
        await checkBoxPage.clickOnArrowButton();
        await checkBoxPage.checkOnDesktopCheckBox();
    })

    test('Radio Button testing', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        const radioButtonPage = new RadioButtonPage(page);
        
        await elementsPage.clickOnRadioButton();
        await radioButtonPage.assertRadioButtonPage();
        await radioButtonPage.clickOnYesButton();
        
        await radioButtonPage.verifyDisabledNoButton();
    })

    test('Web Tables testing', async({ page }) => {
        const elementsPage = new ElementsPage(page);
        const webTablesPage = new WebTablesPage(page);

        await elementsPage.clickOnWebTables();
        await webTablesPage.assertWebTablesPage();
        await webTablesPage.clickOnAddButton();
        await webTablesPage.fillRegistrationForm();
    })

    test('Upload And Download testing', async({ page }) => {
        const elementsPage = new ElementsPage(page);
        const uploadAndDownloadPage = new UploadAndDownloadPage(page);

        await elementsPage.clickOnUploadAndDownload();
        await uploadAndDownloadPage.assertUploadAndDownloadPage();
        const downloadedFile = await uploadAndDownloadPage.clickOnDownloadButton();
        await uploadAndDownloadPage.clickOnChooseFileButton(downloadedFile);
    })
})