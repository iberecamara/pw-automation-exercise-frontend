import { SubscriptionActions } from '@actions/subscription.actions';
import { CartComponents } from '@components/cart.components';
import { EMPTY } from '@data/constants/string.constants';
import { ProductType } from '@data/model/product.model';
import { BasePage } from '@pages/base.page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {

    readonly components: CartComponents;
    readonly subscription: SubscriptionActions;

    constructor(page: Page) {
        super(page);
        this.components = new CartComponents(page);
        this.subscription = new SubscriptionActions(page);
    }

    async getCartItems(): Promise<ProductType[]> {
        const cartItems: ProductType[] = []
        const itemLocators: Locator[] = await this.components.cartItemsTable.locator('tbody').locator('tr').all();
        for (const itemLocator of itemLocators) {
            const index = await itemLocator.getAttribute('id') ?? EMPTY;
            const name = await itemLocator.locator('.cart_description').getByRole('link').textContent() ?? EMPTY;
            const category = await itemLocator.locator('.cart_description').locator('p').textContent() ?? EMPTY;
            const price = await itemLocator.locator('.cart_price').locator('p').textContent() ?? EMPTY;
            const quantity = await itemLocator.locator('.cart_quantity').getByRole('button').textContent() ?? EMPTY;
            const totalPrice = await itemLocator.locator('.cart_total_price').textContent() ?? EMPTY;
            cartItems.push({
                index: +index.replace('product-', EMPTY),
                name: name,
                category: category,
                price: +price.replace('Rs. ', EMPTY),
                quantity: +quantity,
                totalPrice: +totalPrice.replace('Rs. ', EMPTY),
            });
        }
        return cartItems;
    }

}
