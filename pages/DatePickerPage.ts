import { expect } from "playwright/test";
import { Page } from "playwright/test";

export class DatePickerPage {
    private page: Page;
    private datePickerTitle;
    private selectDate;
    private selectDatePicker;


    constructor(page: Page) {
        this.page = page;
        this.datePickerTitle = page.locator('h1.text-center');
        this.selectDate = page.locator('id=datePickerMonthYearInput');
        this.selectDatePicker = page.locator('id=datePickerMonthYearInput');
    }

    assertDatePickerPage = async () => {
        await this.datePickerTitle.waitFor();
        await expect(this.datePickerTitle).toBeVisible();
        await expect(this.datePickerTitle).toHaveText('Date Picker');
    }

    async selectDay(day: number) {
        const dayLocator = this.page.locator(`.react-datepicker__day--${String(day).padStart(3, '0')}`);
        await dayLocator.click();
    }

    async selectMonth(month: string) {
        await this.page.locator('.react-datepicker__month-select').selectOption({ label: month });
    }

    getMonthNumber(month: string): string {
        const months: { [key: string]: string } = {
            January: '01', February: '02', March: '03', April: '04',
            May: '05', June: '06', July: '07', August: '08',
            September: '09', October: '10', November: '11', December: '12'
        };
        return months[month];
    }

    async clickOnSelectDateAndChooseDate(month: string, day: number): Promise<void> {
        await this.selectDate.waitFor();
        await this.selectDate.click();
        await this.selectMonth(month);
        await this.selectDay(day);
        const monthNumber = this.getMonthNumber(month);
        const currentYear = new Date().getFullYear();
        const expectedDate = `${monthNumber}/${String(day).padStart(2, '0')}/${currentYear}`;
        await expect(this.selectDatePicker).toHaveAttribute('value', expectedDate);
    }
}