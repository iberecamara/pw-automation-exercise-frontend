import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { AccountCreatedDeletedPage } from '@pages/account-created-deleted.page';

export class AccountCreatedDeletedSteps {

    async clickContinue(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage, page: string): Promise<void> {
        await test.step(`Click Continue in Account ${page} page`, async () => {
            await accountCreatedDeletedPage.clickContinue();
        });
    }

    async validateAccountCreatedText(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage): Promise<void> {
        await test.step('Validate that "Account Created!" text is displayed', async () => {
            await expect.soft(
                accountCreatedDeletedPage.components.accountCreatedText,
                '"Account Created!" text should be visible'
            ).toBeVisible();
        });
    };

    async validateAccountDeletedText(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage): Promise<void> {
        await test.step('Validate that "Account Deleted!" text is displayed', async () => {
            await expect.soft(
                accountCreatedDeletedPage.components.accountDeletedText,
                '"Account Deleted!" text should be visible'
            ).toBeVisible();
        });
    };


}