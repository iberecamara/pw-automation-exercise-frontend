import { Environment } from '@configs/environment.config';
import { Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { HomeComponents } from '@components/home.components';

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

}