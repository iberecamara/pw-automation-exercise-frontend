import { Locator, Page } from '@playwright/test';

export class AccountCreatedDeletedComponents {

    readonly accountCreatedText: Locator;
    readonly accountDeletedText: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.accountCreatedText = page.getByText('Account Created!');
        this.accountDeletedText = page.getByText('Account Deleted!');
        this.continueButton = page.getByTestId('continue-button');
    }

}