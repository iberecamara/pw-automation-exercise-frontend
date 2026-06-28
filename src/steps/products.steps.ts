import { test } from '@fixtures/fixtures';
import { ProductsPage } from '@pages/products.page';
import { expect, Page } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';

export class ProductsSteps {

    // Actions
    async getProductsCount(logger: TestAutomationLogger, producsPage: ProductsPage): Promise<number> {
        logger.info('Getting the number of Products displayed');
        let count: number = 0;
        await test.step('Getting the number of Products displayed', async () => {
            count = await producsPage.getProductsCount();
        });
        logger.info(`Found ${count} Products in page`);
        return count;
    }

    async navigateToProductView(logger: TestAutomationLogger, producsPage: ProductsPage, productIndex: number): Promise<void> {
        logger.info(`Navigating to product #${productIndex}`);
        await test.step('Navigating to product view', async () => {
            await producsPage.clickProductView(productIndex);
        });
        logger.info(`Navigated to product #${productIndex}`);
    }

    // Validations
    async validateProductsTitle(logger: TestAutomationLogger, page: Page): Promise<void> {
        logger.info('Validating Products page title.');
        await test.step('Validate that Products page have the expected title', async () => {
            await expect.soft(
                page,
                'Products page should have the expected title'
            ).toHaveTitle('Automation Exercise - All Products');
        });
    }

    async validateProductsCount(logger: TestAutomationLogger, count: number, expectedCount: number): Promise<void> {
        logger.info('Validating count of Products in page.');
        await test.step('Validate that Products page have the expected amout of products', async () => {
            expect.soft(
                count,
                'Products page should have the expected amout of products'
            ).toBe(expectedCount);
        });
    }

}