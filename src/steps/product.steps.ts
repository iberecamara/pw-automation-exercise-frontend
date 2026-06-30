import { NEWLINE } from '@data/constants/string.constants';
import { ProductType } from '@data/model/product.model';
import { test } from '@fixtures/fixtures';
import { ProductPage } from '@pages/product.page';
import { ProductsPage } from '@pages/products.page';
import { expect, Page } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';
import { StringUtils } from '@utils/string.utils';

export class ProductSteps {

    // Actions
    async getProductsCount(logger: TestAutomationLogger, producsPage: ProductsPage): Promise<number> {
        logger.info('Getting the number of Products displayed');
        let count: number;
        await test.step('Getting the number of Products displayed', async () => {
            count = await producsPage.getProductsCount();
        });
        logger.info(`Found ${count!} Products in page`);
        return count!;
    }

    async getProductDetails(logger: TestAutomationLogger, productPage: ProductPage): Promise<ProductType> {
        logger.info('Retrieving displayed Product details');
        let product: ProductType;
        await test.step('Retrieve displayed Product details', async () => {
            product = await productPage.getProductDetails();
        });
        logger.info(`Retrieved displayed Product details: ${NEWLINE}${StringUtils.prettyJson(product!)}`);
        return product!;
    }

    async setProductQuantity(logger: TestAutomationLogger, productPage: ProductPage, quantity: number): Promise<void> {
        logger.info(`Setting product quantity to ${quantity}`);
        await test.step('Set product quantity', async () => {
            await productPage.setQuantity(quantity);
        });
        logger.info(`Set product quantity to ${quantity}`);
    }

    async addToCart(logger: TestAutomationLogger, productPage: ProductPage): Promise<void> {
        logger.info('Adding product to cart');
        await test.step('Add product to cart', async () => {
            await productPage.clickAddToCart();
        });
        logger.info('Added product to cart');
    }

    async viewCart(logger: TestAutomationLogger, productPage: ProductPage): Promise<void> {
        logger.info('Clicking View Cart');
        await test.step('Navigating to cart from modal', async () => {
            await productPage.clickViewCart();
        });
        logger.info('Clicked View Cart');
    }


    // Validations
    async validateProductDetailsTitle(logger: TestAutomationLogger, page: Page): Promise<void> {
        logger.info('Validating Product page title.');
        await test.step('Validate that Product page have the expected title', async () => {
            await expect.soft(
                page,
                'Products page should have the expected title'
            ).toHaveTitle('Automation Exercise - Product Details');
        });
    }

    async validateProductDetails(logger: TestAutomationLogger, firstProduct: ProductType, productDetails: ProductType): Promise<void> {
        logger.info('Validating that retrieved product matches the first product.');
        logger.info(`First product: ${NEWLINE}${StringUtils.prettyJson(firstProduct)}`);
        logger.info(`Retrieved product: ${NEWLINE}${StringUtils.prettyJson(productDetails)}`);
        await test.step('Validate that retrieved product matches the first product', async () => {
            expect.soft(
                productDetails,
                'Retrieved product should match the first product'
            ).toStrictEqual(firstProduct);
        });
    }

}