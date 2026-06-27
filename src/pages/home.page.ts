import { HomeComponents } from '@components/home.components';
import { Environment } from '@configs/environment.config';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {

    readonly components: HomeComponents;

    constructor(page: Page) {
        super(page);
        this.components = new HomeComponents(page);
    }

    async home(): Promise<void> {
        await this.page.goto(Environment.BASE_URL);
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

}