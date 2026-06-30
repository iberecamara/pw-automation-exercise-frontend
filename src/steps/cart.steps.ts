import { ProductType } from '@data/model/product.model';
import { test } from '@fixtures/fixtures';
import { CartPage } from '@pages/cart.page';
import { expect } from '@playwright/test';
import { TestAutomationLogger } from '@utils/logger.utils';

export class CartSteps {


    // Actions
    async getCartProducts(logger: TestAutomationLogger, cartPage: CartPage): Promise<ProductType[]> {
        logger.info('Retrieveing all products details');
        const products: ProductType[] = [];
        await test.step('Retrieve all  products', async () => {
            products.push(...await cartPage.getCartItems());
        });
        logger.info('Retrieved all products details');
        return products;
    }

    // Validations
    async validateCartItems(logger: TestAutomationLogger, cartItems: ProductType[], addedItems: ProductType[]) {
        logger.info('Validating all products in cart.');
        await test.step('Validate all products', async () => {
            expect.soft(
                cartItems,
                'Cart items must match added items.'
            ).toEqual(
                expect.arrayContaining(addedItems)
            );
        });
    }

    async validateProductQuantity(logger: TestAutomationLogger, cartPage: CartPage, quantity: number): Promise<void> {
        logger.info(`Validating product quantity in cart to be ${quantity}.`);
        await test.step('Validate product quantity in cart', async () => {
            const product = (await cartPage.getCartItems()).at(0);
            expect.soft(
                product?.quantity,
                `Product quantity in cart should be ${quantity}.`
            ).toBe(quantity);
        });
    }

}