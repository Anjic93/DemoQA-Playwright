import path from "path";
import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class UploadAndDownloadPage {
    private page: Page;
    private uploadAndDownloadTitle;
    private downloadButton;
    private chooseFile;

    constructor(page: Page) {
        this.page = page;
        this.uploadAndDownloadTitle = page.locator('h1.text-center');
        this.downloadButton = page.locator('id=downloadButton');
        this.chooseFile = page.locator('input[type="file"]');
    }

    assertUploadAndDownloadPage = async () => {
        await this.uploadAndDownloadTitle.waitFor();
        await expect(this.uploadAndDownloadTitle).toBeVisible();
        await expect(this.uploadAndDownloadTitle).toHaveText('Upload and Download');
    }

    clickOnDownloadButton = async () => {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadButton.click()
        ]);
        const downloadPath = await download.path();
        console.log('File downloaded to:', downloadPath);

        const fs = require('fs');
        expect(fs.existsSync(downloadPath)).toBeTruthy();

        return downloadPath;
    }

    clickOnChooseFileButton = async (filePath: any) => {
        await this.chooseFile.setInputFiles(filePath);
        const uploadedFile= await this.chooseFile.inputValue();
        console.log('File uploaded:', uploadedFile);
        expect(uploadedFile).toContain(path.basename(filePath));
    }
}
