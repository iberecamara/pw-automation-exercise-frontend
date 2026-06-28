import { ProductsComponents } from '@components/products.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class ProductsPage extends BasePage {

    readonly components: ProductsComponents;

    constructor(page: Page) {
        super(page);
        this.components = new ProductsComponents(page);
    }

    async getProductsCount(): Promise<number> {
        return await this.components.productsContainer.locator('.single-products').count();
    }

    async clickProductView(productIndex: number): Promise<void> {
        await this.components.productViewLink(productIndex).click();
    }

}