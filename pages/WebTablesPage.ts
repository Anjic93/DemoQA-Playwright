import { expect } from "playwright/test";
import { Page } from "playwright/test";
import { faker } from '@faker-js/faker';

export class WebTablesPage {
    private page: Page;
    private webTablesTitle;
    private addButton;
    private firstName;
    private lastName;
    private email;
    private age;
    private salary;
    private department;
    private submitButton;
    private table;

    constructor(page: Page) {
        this.page = page;
        this.webTablesTitle = page.locator('h1.text-center');
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.locator('input[id="userEmail"]');
        this.age = page.getByPlaceholder('Age');
        this.salary = page.getByPlaceholder('Salary');
        this.department = page.getByPlaceholder('Department');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.table = page.locator('.rt-table');
    }


    assertWebTablesPage = async () => {
        await this.webTablesTitle.waitFor();
        await expect(this.webTablesTitle).toBeVisible();
        await expect(this.webTablesTitle).toHaveText('Web Tables');
    }

    clickOnAddButton = async () => {
        await this.addButton.waitFor();
        await this.addButton.click();
    }

    fillRegistrationForm = async () => {
        const firstNameGenerated = faker.person.firstName();
        const lastNameGenerated = faker.person.lastName();
        const emailGenerated = faker.internet.email();
        const ageGenerated = (Math.floor(Math.random() * (99 - 18 + 1)) + 18).toString();
        const salaryGenerated = (Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000).toString();
        const departmentGenerated = faker.commerce.department();
        await this.firstName.clear();
        await this.firstName.fill(firstNameGenerated);
        await this.lastName.clear();
        await this.lastName.fill(lastNameGenerated);
        await this.email.clear();
        await this.email.fill(emailGenerated);
        await this.age.clear();
        await this.age.fill(ageGenerated);
        await this.salary.clear();
        await this.salary.fill(salaryGenerated);
        await this.department.clear();
        await this.department.fill(departmentGenerated);
        await this.submitButton.click();

        await expect(this.table).toContainText(firstNameGenerated);
        await expect(this.table).toContainText(lastNameGenerated);
        await expect(this.table).toContainText(emailGenerated);
        await expect(this.table).toContainText(ageGenerated.toString());
        await expect(this.table).toContainText(salaryGenerated.toString());
        await expect(this.table).toContainText(departmentGenerated);
    }
}