import { Locator, Page } from '@playwright/test';

export class ProductsComponents {

    readonly productsContainer: Locator;
    readonly productViewLink: Function;
    readonly indexOffset = 1;
    readonly searchProductsInput: Locator;
    readonly searchProductsButton: Locator;

    constructor(page: Page) {
        this.productsContainer = page.locator('.features_items');
        this.productViewLink = (index: number): Locator => {
            return page.getByRole('link', { name: ' View Product' }).nth(index - this.indexOffset);
        };
        this.searchProductsInput = page.getByPlaceholder('Search Product');
        this.searchProductsButton = page.locator('#submit_search');
    }

}