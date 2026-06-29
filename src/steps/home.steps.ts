import { Environment } from '@configs/environment.config';
import { test } from '@fixtures/fixtures';
import { expect, Page } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';

export class HomeSteps {

    // Actions


    // Validations
    async validateHomeTitle(logger: TestAutomationLogger, page: Page): Promise<void> {
        logger.info('Validating that  application home page have the expected title');
        await test.step('Validate that application home page have the expected title', async () => {
            await expect.soft(
                page,
                `Home page should have the expected title: ${Environment.APPLICATION}`
            ).toHaveTitle(Environment.APPLICATION);
        });
    };

}