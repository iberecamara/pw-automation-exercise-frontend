import { SubscriptionActions } from '@actions/subscription.actions';
import { CartComponents } from '@components/cart.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {

    readonly components: CartComponents;
    readonly subscription: SubscriptionActions;

    constructor(page: Page) {
        super(page);
        this.components = new CartComponents(page);
        this.subscription = new SubscriptionActions(page);
    }


}
