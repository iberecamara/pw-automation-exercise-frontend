
import { test as base } from "@playwright/test";
import { AccountCreatedDeletedSteps } from "@steps/account-created-deleted.steps";
import { ApiSteps } from "@steps/api.steps";
import { ContactUsSteps } from "@steps/contact-us.steps";
import { HomeSteps } from "@steps/home.steps";
import { SignupLoginSteps } from "@steps/signup-login.steps";
import { SignupSteps } from "@steps/signup.steps";

type StepsConstructor<T> = new () => T;

function createStepFixture<T>(stepConstructor: StepsConstructor<T>) {
    return async ({ }, use: (value: T) => Promise<void>) => {
        const stepInstance = new stepConstructor();
        await use(stepInstance);
    };
}

type StepsFixtures = {
    apiSteps: ApiSteps,
    homeSteps: HomeSteps,
    signupLoginSteps: SignupLoginSteps,
    signupSteps: SignupSteps,
    accountCreatedDeletedSteps: AccountCreatedDeletedSteps,
    contactUsSteps: ContactUsSteps,
};

export const test = base.extend<StepsFixtures>({
    apiSteps: createStepFixture(ApiSteps),
    homeSteps: createStepFixture(HomeSteps),
    signupLoginSteps: createStepFixture(SignupLoginSteps),
    signupSteps: createStepFixture(SignupSteps),
    accountCreatedDeletedSteps: createStepFixture(AccountCreatedDeletedSteps),
    contactUsSteps: createStepFixture(ContactUsSteps),

});