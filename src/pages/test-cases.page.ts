import { TestCasesComponents } from '@components/test-cases.components';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';


export class TestCasesPage extends BasePage {

    readonly components: TestCasesComponents;

    constructor(page: Page) {
        super(page);
        this.components = new TestCasesComponents(page);
    }


}