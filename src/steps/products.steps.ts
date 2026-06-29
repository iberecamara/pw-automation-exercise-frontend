import { EMPTY } from '@data/constants/string.constants';
import { ProductType } from '@data/model/product.model';
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

    async navigateToProductView(logger: TestAutomationLogger, productsPage: ProductsPage, productIndex: number): Promise<void> {
        logger.info(`Navigating to product #${productIndex}`);
        await test.step('Navigating to product view', async () => {
            await productsPage.clickProductView(productIndex);
        });
        logger.info(`Navigated to product #${productIndex}`);
    }

    async searchProducts(logger: TestAutomationLogger, productsPage: ProductsPage, searchTerm: string): Promise<void> {
        logger.info(`Searching for products with '${searchTerm}'.`);
        await test.step('Searching products', async () => {
            await productsPage.searchProducts(searchTerm);
        });
        logger.info(`Searched for '${searchTerm}'.`);
    }

    async getProductDetails(logger: TestAutomationLogger, productsPage: ProductsPage, productName: string): Promise<ProductType> {
        logger.info(`Retrieving products details for '${productName}'.`);
        let product: ProductType = { name: EMPTY, price: 0 };
        await test.step(`Retrieve product details for '${productName}'`, async () => {
            product = await productsPage.getProductDetails({ productName: productName });
        });
        logger.info(`Retried products details for '${productName}'.`);
        return product;
    }

    async getProducts(logger: TestAutomationLogger, productsPage: ProductsPage): Promise<ProductType[]> {
        logger.info('Retrieveing all products details');
        const products: ProductType[] = [];
        await test.step('Retrieve all products', async () => {
            products.push(...await productsPage.getProducts());
        });
        logger.info('Retrieved all products details');
        return products;
    }

    async hoverProduct(logger: TestAutomationLogger, productsPage: ProductsPage, productName: string): Promise<void> {
        logger.info(`Hovering over product '${productName}'.`);
        await test.step(`Hover over product '${productName}'.`, async () => {
            await productsPage.hoverProduct(productName);
        });
        logger.info(`Hovered over product '${productName}'.`);
    }

    async addProductToCartFromHover(logger: TestAutomationLogger, productsPage: ProductsPage, productName: string): Promise<void> {
        logger.info(`Adding product '${productName}' to cart from hover overlay.`);
        await test.step(`Add product '${productName}' to cart from hover overlay.`, async () => {
            await productsPage.clickAddToCartFromHover(productName);
        });
        logger.info(`Added product '${productName}' to cart from hover overlay.`);
    }

    async continueShopping(logger: TestAutomationLogger, productsPage: ProductsPage): Promise<void> {
        logger.info('Clicking Continue Shopping.');
        await test.step('Click Continue Shopping', async () => {
            await productsPage.clickContinueShopping();
        });
        logger.info('Clicked Continue Shopping.');
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

    validateDisplayedProductsHaveSearchTerm(logger: TestAutomationLogger, products: ProductType[], searchTerm: string): void {
        logger.info(`Validating displayed Products have the search term '${searchTerm}'.`);
        for (const product of products) {
            expect.soft(
                product.name.toLowerCase(),
                `Products should have the search term '${searchTerm}'.`
            ).toContain(searchTerm.toLowerCase());
        }
    }

}