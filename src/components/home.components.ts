import { Locator, Page } from '@playwright/test';

export class HomeComponents {

    readonly signupLoginButton: Locator;
    readonly loggedInText: Function;
    readonly deleteAccountLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.signupLoginButton = page.getByText('Signup / Login');
        this.loggedInText = (username: string): Locator => {
            return page.getByText(`Logged in as ${username}`);
        }
        this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
        this.logoutLink = page.getByRole('link', { name: ' Logout' });
    }

}