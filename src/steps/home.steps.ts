import { Environment } from '@configs/environment.config';
import { UserType } from '@data/model/user.model';
import { test } from '@fixtures/fixtures';
import { HomePage } from '@pages/home.page';
import { expect, Page } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';

export class HomeSteps {

    // Actions
    async navigateHome(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        logger.info(`Navigating to home page at '${Environment.BASE_URL}'.`);
        await test.step('Navigate to application home page', async () => {
            await homePage.home();
        });
        logger.info('Navigated to home page.');
    };

    async clickSignupLogin(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        logger.info('Clicking "Signup / Login" button in Signup / Login page');
        await test.step('Click "Signup / Login" button in Signup / Login page', async () => {
            await homePage.clickSignupLogin();
        });
        logger.info('Clicked "Signup / Login" button in Signup / Login page');
    }

    async clickDeleteAccount(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        logger.info('Clicking "Delete Account" in home page');
        await test.step('Click "Delete Account" in home page', async () => {
            await homePage.clickDeleteAccount();
        });
        logger.info('Clicked "Delete Account" in home page');
    }

    async clickLogout(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        logger.info('Clicking "Logout" in home page');
        await test.step('Click "Logout" in home page', async () => {
            await homePage.clickLogout();
        });
        logger.info('Clicked "Logout" in home page');
    }

    async clickContactUs(logger: TestAutomationLogger, homePage: HomePage): Promise<void> {
        logger.info('Clicking "Contact us" in home page');
        await test.step('Click "Contact us" in home page', async () => {
            await homePage.clickContactUs();
        });
        logger.info('Clicked "Contact us" in home page');
    }

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

    async validateUserLoggedText(logger: TestAutomationLogger, homePage: HomePage, user: UserType): Promise<void> {
        logger.info('Validating that "Logged in as <username>" text is displayed');
        await test.step('Validate that "Logged in as <username>" text is displayed', async () => {
            await expect.soft(
                homePage.components.loggedInText(user.name),
                `"Logged in as ${user.name}" text should be visible`
            ).toBeVisible();
        });
    }

}