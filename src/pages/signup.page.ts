import { Locator, Page } from '@playwright/test';
import { TestAutomationException } from '../exceptions/test-automation.exception';
import { BasePage } from '@pages/base.page';
import { SignupComponents } from '@components/signup.components';
import { VALID_TITLES } from '@data/constants/constants';

export class SignupPage extends BasePage {

    readonly components: SignupComponents;

    constructor(page: Page) {
        super(page);
        this.components = new SignupComponents(page);
    }

    async enterLogin(login: string): Promise<void> {
        await this.fill(this.components.loginInput, login);
    }

    async enterEmail(email: string): Promise<void> {
        await this.fill(this.components.emailInput, email);
    }

    async clickSignup(): Promise<void> {
        await this.click(this.components.signupButton);
    }

    async chooseTitle(title: string): Promise<void> {
        if (!VALID_TITLES.includes(title)) {
            throw new TestAutomationException(`Invalid title: ${title}, must be one of ${VALID_TITLES}`);
        }
        const locator: Locator = title === 'Mr.' ? this.components.titleMrRadio : this.components.titleMsRadio;
        await this.checkbox(locator, true);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.components.passwordInput, password);
    }

    async selectDobDay(day: string): Promise<void> {
        await this.selectOption(this.components.dobDaysSelector, day);
    }

    async selectDobMonth(month: string): Promise<void> {
        await this.selectOption(this.components.dobMonthsSelector, month);
    }

    async selectDobYear(year: string): Promise<void> {
        await this.selectOption(this.components.dobYearsSelector, year);
    }

    async checkNewsletter(checked: boolean): Promise<void> {
        await this.checkbox(this.components.newsletterCheckbox, checked);
    }

    async checkOptIn(checked: boolean): Promise<void> {
        await this.checkbox(this.components.optInCheckbox, checked);
    }

    async enterAddressFirstName(name: string): Promise<void> {
        await this.fill(this.components.addressFirstNameInput, name);
    }

    async enterAddressLastName(name: string): Promise<void> {
        await this.fill(this.components.addressLastNameInput, name);
    }

    async enterCompany(company: string): Promise<void> {
        await this.fill(this.components.addressCompanyInput, company);
    }

    async enterAddress(address: string): Promise<void> {
        await this.fill(this.components.addressAddressInput, address);
    }

    async enterAddressTwo(address: string): Promise<void> {
        await this.fill(this.components.addressAddressTwoInput, address);
    }

    async selectAddressCountry(country: string): Promise<void> {
        await this.selectOption(this.components.addressCountryInput, country);
    }

    async enterAddressState(state: string): Promise<void> {
        await this.fill(this.components.addressStateInput, state);
    }

    async enterAddressCity(city: string): Promise<void> {
        await this.fill(this.components.addressCityInput, city);
    }

    async enterAddressZipCode(zipcode: string): Promise<void> {
        await this.fill(this.components.addressZipCodeInput, zipcode);
    }

    async enterAddressMobilePhone(phone: string): Promise<void> {
        await this.fill(this.components.addressMobileNumberInput, phone);
    }

    async clickCreateAccount(): Promise<void> {
        await this.click(this.components.createAccountButton);
    }

}