import { Environment } from '@configs/environment.config';
import { Locator, Page } from '@playwright/test';

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async checkbox(locator: Locator, checked: boolean): Promise<void> {
        if (checked) {
            await locator.check();
        } else {
            await locator.uncheck();
        }
    }

    async fill(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    async selectOption(locator: Locator, option: string): Promise<void> {
        await locator.selectOption(option);
    }

}