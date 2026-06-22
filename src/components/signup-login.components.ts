import { Locator, Page } from '@playwright/test';

export class SignupLoginComponents {

    readonly signupSectionHeader: Locator;
    readonly loginInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.signupSectionHeader = page.getByText('New User Signup!');
        this.loginInput = page.getByTestId('signup-name');
        this.emailInput = page.getByTestId('signup-email');
        this.signupButton = page.getByTestId('signup-button');
    }

}