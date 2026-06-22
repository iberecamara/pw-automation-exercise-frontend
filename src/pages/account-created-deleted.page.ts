import { Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import { AccountCreatedDeletedComponents } from '@components/account-created-deleted.components';

export class AccountCreatedDeletedPage extends BasePage {

    readonly components: AccountCreatedDeletedComponents;

    constructor(page: Page) {
        super(page);
        this.components = new AccountCreatedDeletedComponents(page);
    }

    async clickContinue(): Promise<void> {
        await this.click(this.components.continueButton);
    }

}