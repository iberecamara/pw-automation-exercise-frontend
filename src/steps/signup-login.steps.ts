import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { UserType } from '@data/model/user.model';
import { SignupLoginPage } from '@pages/signup-login.page';

export class SignupLoginSteps {

    async enterLoginData(logger: TestAutomationLogger, signupLoginPage: SignupLoginPage, user: UserType): Promise<void> {
        logger.info(`Using login: ${user.name}`);
        logger.info(`Using email: ${user.email}`);
        await test.step('Enter login data', async () => {
            await signupLoginPage.enterLoginEmail(user.email);
            await signupLoginPage.enterLoginPassword(user.password);
            await signupLoginPage.clickLogin();
        });
    };

    async enterSignupData(logger: TestAutomationLogger, signupLoginPage: SignupLoginPage, user: UserType): Promise<void> {
        logger.info(`Using login: ${user.name}`);
        logger.info(`Using email: ${user.email}`);
        await test.step('Enter signup data', async () => {
            await signupLoginPage.enterSignupLogin(user.name);
            await signupLoginPage.enterSignupEmail(user.email);
        });
    }

    async clickSignup(loogger: TestAutomationLogger, signupLoginPage: SignupLoginPage): Promise<void> {
        await test.step('Click Signup', async () => {
            await signupLoginPage.clickSignup();
        });
    }

    async validateLoginToAccountText(logger: TestAutomationLogger, signupLoginPage: SignupLoginPage): Promise<void> {
        await test.step('Validate that Signup / Login page have the expected text in the Login section', async () => {
            await expect.soft(
                signupLoginPage.components.loginSectionHeader,
                'Login section header "Login to your account" should be visible'
            ).toBeVisible();
        });
    };

    async validateNewUserSignupText(logger: TestAutomationLogger, signupLoginPage: SignupLoginPage): Promise<void> {
        await test.step('Validate that Signup / Login page have the expected text in the Signup section', async () => {
            await expect.soft(
                signupLoginPage.components.signupSectionHeader,
                'Signup section header "New User Signup!" should be visible'
            ).toBeVisible();
        });
    }


}