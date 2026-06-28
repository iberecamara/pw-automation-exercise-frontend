import { Locator, Page } from '@playwright/test';

export class ProductsComponents {

    readonly productsContainer: Locator;
    readonly productViewLink: Function;
    readonly indexOffset = 1;

    constructor(page: Page) {
        this.productsContainer = page.locator('.features_items');
        this.productViewLink = (index: number): Locator => {
            return page.getByRole('link', { name: ' View Product' }).nth(index - this.indexOffset);
        }
    }

}