import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { AccountCreatedDeletedPage } from '@pages/account-created-deleted.page';

export class AccountCreatedDeletedSteps {

    async clickContinue(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage, page: string): Promise<void> {
        logger.info(`Clicking Continue in Account ${page} page`);
        await test.step(`Click Continue in Account ${page} page`, async () => {
            await accountCreatedDeletedPage.clickContinue();
        });
        logger.info(`Clicked Continue in Account ${page} page`);
    }

    async validateAccountCreatedText(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage): Promise<void> {
        logger.info('Validating that "Account Created!" text is displayed');
        await test.step('Validate that "Account Created!" text is displayed', async () => {
            await expect.soft(
                accountCreatedDeletedPage.components.accountCreatedText,
                '"Account Created!" text should be visible'
            ).toBeVisible();
        });
    };

    async validateAccountDeletedText(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage): Promise<void> {
        logger.info('Validating that "Account Deleted!" text is displayed');
        await test.step('Validate that "Account Deleted!" text is displayed', async () => {
            await expect.soft(
                accountCreatedDeletedPage.components.accountDeletedText,
                '"Account Deleted!" text should be visible'
            ).toBeVisible();
        });
    };


}