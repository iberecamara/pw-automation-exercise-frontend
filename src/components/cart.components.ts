import { Locator, Page } from '@playwright/test';

export class CartComponents {

    readonly cartItemsTable: Locator;

    constructor(page: Page) {
        this.cartItemsTable = page.locator('#cart_info_table');
    }

}