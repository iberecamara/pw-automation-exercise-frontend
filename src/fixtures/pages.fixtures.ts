
import { AccountCreatedDeletedPage } from "@pages/account-created-deleted.page";
import { ContactUsPage } from "@pages/contact-us.page";
import { HomePage } from "@pages/home.page";
import { SignupLoginPage } from "@pages/signup-login.page";
import { SignupPage } from "@pages/signup.page";
import { test as base, Page } from "@playwright/test";

type PageConstructor<T> = new (page: Page) => T;

function createPageFixture<T>(pageConstructor: PageConstructor<T>) {
    return async ({ page }: { page: Page }, use: (value: T) => Promise<void>) => {
        const pageInstance = new pageConstructor(page);
        await use(pageInstance);
    };
}

type PageFixtures = {
    homePage: HomePage,
    signupLoginPage: SignupLoginPage,
    signupPage: SignupPage,
    accountCreatedDeletedPage: AccountCreatedDeletedPage,
    contactUsPage: ContactUsPage,
};

export const test = base.extend<PageFixtures>({
    homePage: createPageFixture(HomePage),
    signupLoginPage: createPageFixture(SignupLoginPage),
    signupPage: createPageFixture(SignupPage),
    accountCreatedDeletedPage: createPageFixture(AccountCreatedDeletedPage),
    contactUsPage: createPageFixture(ContactUsPage),
});