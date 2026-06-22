import { Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { SignupLoginComponents } from '@components/signup-login.components';

export class SignupLoginPage extends BasePage {

    readonly components: SignupLoginComponents;

    constructor(page: Page) {
        super(page);
        this.components = new SignupLoginComponents(page);
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

}