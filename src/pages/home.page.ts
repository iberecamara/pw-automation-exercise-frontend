import { HeaderActions } from '@actions/header.actions';
import { SubscriptionActions } from '@actions/subscription.actions';
import { HomeComponents } from '@components/home.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {

    readonly components: HomeComponents;
    readonly header: HeaderActions;
    readonly subscription: SubscriptionActions;

    constructor(page: Page) {
        super(page);
        this.components = new HomeComponents(page);
        this.header = new HeaderActions(page);
        this.subscription = new SubscriptionActions(page);
    }

    async clickProductView(productIndex: number): Promise<void> {
        this.click(this.components.productViewLink(productIndex));
    }

}