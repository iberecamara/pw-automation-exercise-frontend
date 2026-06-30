import { ProductComponents } from '@components/product.components';
import { EMPTY } from '@data/constants/string.constants';
import { ProductType } from '@data/model/product.model';
import { BasePage } from '@pages/base.page';
import { expect, Page } from '@playwright/test';

export class ProductPage extends BasePage {

    readonly components: ProductComponents;

    constructor(page: Page) {
        super(page);
        this.components = new ProductComponents(page);
    }

    async getProductDetails(): Promise<ProductType> {
        const index = await this.components.productDetailContainer.locator('#product_id').first().getAttribute('value') ?? EMPTY;
        const name = await this.components.productDetailContainer.locator('h2').first().textContent() ?? EMPTY;
        const category = await this.components.productDetailContainer.locator('p').first().textContent() ?? EMPTY;
        const price = await this.components.productDetailContainer.locator('span').first().locator('span').first().textContent() ?? EMPTY;
        const availability = await this.components.productDetailContainer.locator('p').nth(1).textContent() ?? EMPTY;
        const condition = await this.components.productDetailContainer.locator('p').nth(2).textContent() ?? EMPTY;
        const brand = await this.components.productDetailContainer.locator('p').nth(3).textContent() ?? EMPTY;
        return {
            index: +index,
            name: name,
            category: category.replace('Category: ', EMPTY),
            price: +price.replace('Rs. ', EMPTY),
            availability: availability.replace('Availability: ', EMPTY),
            condition: condition.replace('Condition: ', EMPTY),
            brand: brand.replace('Brand: ', EMPTY)
        }
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.fill(this.components.productQuantityInput, quantity.toString());
    }

    async clickAddToCart(): Promise<void> {
        await this.click(this.components.addToCartButton);
    }

    async clickContinueShopping(): Promise<void> {
        await expect(this.components.continueShoppingButton).toBeVisible();
        await this.click(this.components.continueShoppingButton);
    }

    async clickViewCart(): Promise<void> {
        await expect(this.components.viewCartLink).toBeVisible();
        await this.click(this.components.viewCartLink);
    }

}
