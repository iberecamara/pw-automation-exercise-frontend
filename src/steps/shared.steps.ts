import { HeaderActions } from '@actions/header.actions';
import { Environment } from '@configs/environment.config';
import { DOWN } from '@data/constants/constants';
import { UserType } from '@data/model/user.model';
import { test } from '@fixtures/fixtures';
import { BasePage } from '@pages/base.page';
import { CartPage } from '@pages/cart.page';
import { HomePage } from '@pages/home.page';
import { ProductPage } from '@pages/product.page';
import { ProductsPage } from '@pages/products.page';
import { expect } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';

export class SharedSteps {

    // Actions
    async navigateHome<T extends BasePage>(logger: TestAutomationLogger, pageObject: T): Promise<void> {
        logger.info(`Navigating to home page at '${Environment.BASE_URL}'.`);
        await test.step('Navigate to application home page', async () => {
            await pageObject.goToHome();
        });
        logger.info('Navigated to home page.');
    };

    async clickHome(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Home" button in header');
        await test.step('Click "Home" button in header', async () => {
            await actions.clickHome();
        });
        logger.info('Clicked "Home" button in header');
    }

    async clickSignupLogin(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Signup / Login" button in header');
        await test.step('Click "Signup / Login" button in header', async () => {
            await actions.clickSignupLogin();
        });
        logger.info('Clicked "Signup / Login" button in header');
    }

    async clickDeleteAccount(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Delete Account" in header');
        await test.step('Click "Delete Account" in header', async () => {
            await actions.clickDeleteAccount();
        });
        logger.info('Clicked "Delete Account" in header');
    }

    async clickLogout(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Logout" in header');
        await test.step('Click "Logout" in header', async () => {
            await actions.clickLogout();
        });
        logger.info('Clicked "Logout" in header');
    }

    async clickContactUs(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Contact us" in header');
        await test.step('Click "Contact us" in header', async () => {
            await actions.clickContactUs();
        });
        logger.info('Clicked "Contact us" in header');
    }

    async clickTestCases(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Test Cases" in header');
        await test.step('Click "Test Cases" in header', async () => {
            await actions.clickTestCases();
        });
        logger.info('Clicked "Test Cases" in header');
    }

    async clickProducts(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Products" in header');
        await test.step('Click "Products" in header', async () => {
            await actions.clickProducts();
        });
        logger.info('Clicked "Products" in header');
    }

    async clickCart(logger: TestAutomationLogger, actions: HeaderActions): Promise<void> {
        logger.info('Clicking "Cart" in header');
        await test.step('Click "Cart" in header', async () => {
            await actions.clickCart();
        });
        logger.info('Clicked "Cart" in header');
    }

    async scrolling<T extends BasePage>(logger: TestAutomationLogger, pageObject: T, direction: string): Promise<void> {
        logger.info(`Scrolling to ${direction.toLowerCase() === DOWN ? 'bottom' : 'top'} of page.`);
        await test.step(`Scrolling to ${direction.toLowerCase() === DOWN ? 'bottom' : 'top'} of page.`, async () => {
            await pageObject.scroll(direction);
        });
        logger.info(`Scrolled to ${direction.toLowerCase() === DOWN ? 'bottom' : 'top'} of page.`);
    };

    async subscribeEmail(logger: TestAutomationLogger, pageObject: HomePage | CartPage, email: string): Promise<void> {
        logger.info('Subscribing email in page');
        logger.info(`Using email '${email}'`);
        await test.step('Subscribing email in page', async () => {
            await pageObject.subscription.enterSubscriptionEmail(email);
            await pageObject.subscription.clickSubscribe();
        });
        logger.info('Subscribed email in page');
    }

    async continueShopping(logger: TestAutomationLogger, pageObject: ProductsPage | ProductPage): Promise<void> {
        logger.info('Clicking Continue Shopping.');
        await test.step('Click Continue Shopping', async () => {
            await pageObject.clickContinueShopping();
        });
        logger.info('Clicked Continue Shopping.');
    }

    // Validations
    async validateSubscriptionHeading(logger: TestAutomationLogger, pageObject: HomePage | CartPage): Promise<void> {
        logger.info('Validating that page have the Subscription heading');
        await test.step('Validate that page have the Subscription heading', async () => {
            await expect.soft(
                pageObject.subscription.components.subscriptionHeading,
                'Page should have the expected Subscription heading'
            ).toBeVisible();
        });
    };

    async validateSubscriptionMessage(logger: TestAutomationLogger, pageObject: HomePage | CartPage): Promise<void> {
        logger.info('Validating that the Subscription message is displayed');
        await test.step('Validate that the Subscription message is displayed', async () => {
            await expect.soft(
                pageObject.subscription.components.subscriptionMessage,
                'Subscription message should be displayed'
            ).toBeVisible();
        });
    };

    async validateUserLoggedText(logger: TestAutomationLogger, actions: HeaderActions, user: UserType): Promise<void> {
        logger.info('Validating that "Logged in as <username>" text is displayed');
        await test.step('Validate that "Logged in as <username>" text is displayed', async () => {
            await expect.soft(
                actions.components.loggedInText(user.name),
                `"Logged in as ${user.name}" text should be visible`
            ).toBeVisible();
        });
    }

}