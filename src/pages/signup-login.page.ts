import { Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { SignupLoginComponents } from '@components/signup-login.components';

export class SignupLoginPage extends BasePage {

    readonly components: SignupLoginComponents;

    constructor(page: Page) {
        super(page);
        this.components = new SignupLoginComponents(page);
    }

    async enterLoginEmail(email: string): Promise<void> {
        await this.fill(this.components.loginEmailInput, email);
    }

    async enterLoginPassword(password: string): Promise<void> {
        await this.fill(this.components.loginPasswordInput, password);
    }

    async clickLogin(): Promise<void> {
        await this.click(this.components.loginButton);
    }

    async enterSignupLogin(login: string): Promise<void> {
        await this.fill(this.components.signupLoginInput, login);
    }

    async enterSignupEmail(email: string): Promise<void> {
        await this.fill(this.components.signupEmailInput, email);
    }

    async clickSignup(): Promise<void> {
        await this.click(this.components.signupButton);
    }

}