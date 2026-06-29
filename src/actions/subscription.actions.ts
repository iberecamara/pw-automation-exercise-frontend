import { SubscriptionComponents } from '@components/subscription.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class SubscriptionActions extends BasePage {

    readonly components: SubscriptionComponents;

    constructor(page: Page) {
        super(page);
        this.components = new SubscriptionComponents(page);
    }

    async enterSubscriptionEmail(email: string): Promise<void> {
        await this.fill(this.components.subscriptionEmailInput, email);
    }

    async clickSubscribe(): Promise<void> {
        await this.click(this.components.subscriptionEmailButton);
    }

}
