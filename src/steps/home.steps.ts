import { Environment } from '@configs/environment.config';
import { expect, Page } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { HomePage } from '@pages/home.page';
import { TestAutomationLogger } from '@utils/logger.utils';
import { UserType } from '@data/model/user.model';

export class HomeSteps {

    async navigateHome(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        await test.step('Navigate to application home page', async () => {
            logger.info(`Navigating to home page at '${Environment.BASE_URL}'.`);
            await homePage.home();
            logger.info(`Navigated to home page.`);
        });
    };

    async clickSignupLogin(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        await test.step('Click "Signup / Login" button in Signup / Login page', async () => {
            await homePage.clickSignupLogin();
        });
    }

    async clickDeleteAccount(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        await test.step('Click "Delete Account" in home page', async () => {
            await homePage.clickDeleteAccount();
        });
    }

    async validateHomeTitle(logger: TestAutomationLogger, page: Page): Promise<void> {
        await test.step('Validate that application home page have the expected text', async () => {
            await expect.soft(
                page,
                `Home page should have the expected title: ${Environment.APPLICATION}`
            ).toHaveTitle(Environment.APPLICATION);
        });

    };

    async validateUserLoggedText(logger: TestAutomationLogger, homePage: HomePage, user: UserType): Promise<void> {
        await test.step('Validate that "Logged in as <username>" text is displayed', async () => {
            await expect.soft(
                homePage.components.loggedInText(user.name),
                `"Logged in as ${user.name}" text should be visible`
            ).toBeVisible();
        });
    }

}