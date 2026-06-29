import { HeaderComponents } from '@components/header.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class HeaderActions extends BasePage {

    readonly components: HeaderComponents;

    constructor(page: Page) {
        super(page);
        this.components = new HeaderComponents(page);
    }

    async clickHome(): Promise<void> {
        await this.click(this.components.signupLoginButton);
    }

    async clickSignupLogin(): Promise<void> {
        await this.click(this.components.signupLoginButton);
    }

    async clickDeleteAccount(): Promise<void> {
        await this.click(this.components.deleteAccountLink);
    }

    async clickLogout(): Promise<void> {
        await this.click(this.components.logoutLink);
    }

    async clickContactUs(): Promise<void> {
        await this.click(this.components.contactUsLink);
    }

    async clickTestCases(): Promise<void> {
        await this.click(this.components.testCasesLink);
    }

    async clickProducts(): Promise<void> {
        await this.click(this.components.productsLink);
    }

    async clickCart(): Promise<void> {
        await this.click(this.components.cartLink);
    }

}
