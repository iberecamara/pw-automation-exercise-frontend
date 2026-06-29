import { expect, Locator } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { AccountCreatedDeletedPage } from '@pages/account-created-deleted.page';
import { StringUtils } from '@utils/string.utils';
import { CREATED } from '@data/constants/common.constants';

export class AccountCreatedDeletedSteps {

    // Actions
    async clickContinue(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage, page: string): Promise<void> {
        logger.info(`Clicking Continue in Account ${page} page`);
        await test.step(`Click Continue in Account ${page} page`, async () => {
            await accountCreatedDeletedPage.clickContinue();
        });
        logger.info(`Clicked Continue in Account ${page} page`);
    }

    // Validations
    async validateAccountActionText(logger: TestAutomationLogger, accountCreatedDeletedPage: AccountCreatedDeletedPage, action: string): Promise<void> {
        logger.info(`Validating that "Account ${StringUtils.capitalize(action)}!" text is displayed`);
        const locator: Locator = action === CREATED ? accountCreatedDeletedPage.components.accountCreatedText : accountCreatedDeletedPage.components.accountDeletedText
        await test.step(`Validate that "Account ${StringUtils.capitalize(action)}!" text is displayed`, async () => {
            await expect.soft(
                locator,
                `"Account ${StringUtils.capitalize(action)}!" text should be visible`
            ).toBeVisible();
        });
    };


}