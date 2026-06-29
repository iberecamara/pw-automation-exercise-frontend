import { HeaderActions } from '@actions/header.actions';
import { ProductsComponents } from '@components/products.components';
import { EMPTY } from '@data/constants/string.constants';
import { ProductType } from '@data/model/product.model';
import { BasePage } from '@pages/base.page';
import { expect, Locator, Page } from '@playwright/test';
import { TestAutomationException } from '../exceptions/test-automation.exception';

export class ProductsPage extends BasePage {

    readonly components: ProductsComponents;
    readonly header: HeaderActions;

    constructor(page: Page) {
        super(page);
        this.components = new ProductsComponents(page);
        this.header = new HeaderActions(page);
    }

    async getProducts(): Promise<ProductType[]> {
        const products: ProductType[] = [];
        const locators: Locator[] = await this.components.productsContainer.locator('.single-products').all();
        for (const locator of locators) {
            products.push(await this.getProductDetails({ locator: locator }));
        }
        return products;
    }

    async getProductsCount(): Promise<number> {
        return await this.components.productsContainer.locator('.single-products').count();
    }

    async getProductDetails(options: { locator?: Locator, productName?: string }): Promise<ProductType> {
        if (!options.locator && !options.productName) {
            throw new TestAutomationException('Please provide either a locator or a product name.');
        }
        if (options.productName) {
            options.locator = await this.components.productLocator(options.productName);
        }
        const price = await options?.locator?.locator('h2').first().textContent() ?? EMPTY;
        const name = await options?.locator?.locator('p').first().textContent() ?? EMPTY;
        return {
            name: name,
            price: +price.replace('Rs. ', EMPTY),
        }
    }

    async clickProductView(productIndex: number): Promise<void> {
        this.click(this.components.productViewLink(productIndex));
    }

    async searchProducts(terms: string): Promise<void> {
        await this.fill(this.components.searchProductsInput, terms);
        await this.click(this.components.searchProductsButton);
    }

    async hoverProduct(productName: string): Promise<void> {
        await this.hover(await this.components.productLocator(productName));
    }

    async clickAddToCartFromHover(productName: string): Promise<void> {
        const productLocator: Locator = await this.components.productLocator(productName);
        const overlayLocator: Locator = productLocator.locator('.product-overlay');
        const addToCartLocator: Locator = overlayLocator.getByText('Add to cart');
        await this.click(addToCartLocator);
    }

    async clickContinueShopping(): Promise<void> {
        await expect(this.components.continueShoppingButton).toBeVisible();
        await this.click(this.components.continueShoppingButton);
    }

}