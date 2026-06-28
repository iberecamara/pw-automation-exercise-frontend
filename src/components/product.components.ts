import { Locator, Page } from '@playwright/test';

export class ProductComponents {

    readonly productDetailContainer: Locator;

    constructor(page: Page) {
        this.productDetailContainer = page.locator('.product-details');
    }

}