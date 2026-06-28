import { ProductsComponents } from '@components/products.components';
import { EMPTY } from '@data/constants/string.constants';
import { ResumedProductType } from '@data/model/product.model';
import { BasePage } from '@pages/base.page';
import { Locator, Page } from '@playwright/test';

export class ProductsPage extends BasePage {

    readonly components: ProductsComponents;

    constructor(page: Page) {
        super(page);
        this.components = new ProductsComponents(page);
    }

    async getProductsCount(): Promise<number> {
        return await this.components.productsContainer.locator('.single-products').count();
    }

    async getProducts(): Promise<ResumedProductType[]> {
        const products: ResumedProductType[] = [];
        const locators: Locator[] = await this.components.productsContainer.locator('.single-products').all();
        for (const locator of locators) {
            products.push(await this.getProductDetail(locator));
        }
        return products;
    }

    async getProductDetail(locator: Locator): Promise<ResumedProductType> {
        const price = await locator.locator('h2').first().textContent() ?? '';
        const name = await locator.locator('p').first().textContent() ?? '';
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

}