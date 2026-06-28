import { ProductComponents } from '@components/product.components';
import { EMPTY } from '@data/constants/string.constants';
import { FullProductType } from '@data/model/product.model';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class ProductPage extends BasePage {

    readonly components: ProductComponents;

    constructor(page: Page) {
        super(page);
        this.components = new ProductComponents(page);
    }

    async getProductDetails(): Promise<FullProductType> {
        const index = await this.components.productDetailContainer.locator('#product_id').first().getAttribute('value') ?? '';
        const name = await this.components.productDetailContainer.locator('h2').first().textContent() ?? '';
        const category = await this.components.productDetailContainer.locator('p').first().textContent() ?? '';
        const price = await this.components.productDetailContainer.locator('span').first().locator('span').first().textContent() ?? '';
        const availability = await this.components.productDetailContainer.locator('p').nth(1).textContent() ?? '';
        const condition = await this.components.productDetailContainer.locator('p').nth(2).textContent() ?? '';
        const brand = await this.components.productDetailContainer.locator('p').nth(3).textContent() ?? '';
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

}
