import { Page } from 'playwright';

export class MainPage {
    private page: Page;
    private cards;

    constructor(page: Page) {
        this.page = page;
        this.cards = page.locator('.card.mt-4.top-card');
    }

    async clickOnCard(cardName: string, cardNumber: number): Promise<void> {
        const textContent = await this.cards.nth(cardNumber).textContent();
        if(textContent && textContent.includes(cardName)) {
            await this.cards.nth(cardNumber).click();
        }
    }

    clickOnElementsCard = async () => {
        this.clickOnCard('Elements', 0);
    }

    clickOnAlertsFrameAndWindowsCard = async () => {
        this.clickOnCard('Alerts, Frame & Windows', 2);
    }

    clickOnWidgetsCard = async () => {
        this.clickOnCard('Widgets', 3);
    }

    clickOnInteractionsCard = async () => {
        this.clickOnCard('Interactions', 4);
    }
}