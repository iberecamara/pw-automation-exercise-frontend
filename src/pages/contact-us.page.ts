import { ContactUsComponents } from '@components/contact-us.components';
import { UPLOAD_FILEPATH } from '@data/constants/constants';
import { BasePage } from '@pages/base.page';
import { Page } from '@playwright/test';
import path from 'path';


export class ContactUsPage extends BasePage {

    readonly components: ContactUsComponents;

    constructor(page: Page) {
        super(page);
        this.components = new ContactUsComponents(page);
    }

    async enterName(name: string): Promise<void> {
        await this.fill(this.components.nameInput, name);
    }

    async enterEmail(email: string): Promise<void> {
        await this.fill(this.components.emailInput, email);
    }

    async enterSubject(subject: string): Promise<void> {
        await this.fill(this.components.subjectInput, subject);
    }

    async enterMessage(message: string): Promise<void> {
        await this.fill(this.components.messageInput, message);
    }

    async selectUploadFile(file: string): Promise<void> {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.click(this.components.upoadFileInput);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(UPLOAD_FILEPATH, file));
    }

    async clickSubmit(accept?: boolean): Promise<void> {
        if (accept) {
            this.page.on('dialog', async dialog => dialog.accept());
        }
        await this.click(this.components.submitButton);
    }

    async clickHome(): Promise<void> {
        await this.click(this.components.homeButton);
    }

}