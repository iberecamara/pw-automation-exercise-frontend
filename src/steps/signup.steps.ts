import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { UserType } from '@data/model/user.model';
import { SignupPage } from '@pages/signup.page';
import { NEWLINE } from '@data/constants/string.constants';
import { StringUtils } from '@utils/string.utils';

export class SignupSteps {

    async enterSignupData(logger: TestAutomationLogger, signupPage: SignupPage, user: UserType): Promise<void> {
        logger.info(`Using signup data: ${NEWLINE}${StringUtils.prettyJson(user)}`)
        await test.step('Enter user data for Signup', async () => {
            await signupPage.chooseTitle(user.title);
            await signupPage.enterPassword(user.password);
            await signupPage.selectDobDay(user.birthDate);
            await signupPage.selectDobMonth(user.birthMonth);
            await signupPage.selectDobYear(user.birthYear);
            await signupPage.checkNewsletter(true);
            await signupPage.checkOptIn(true);
            await signupPage.enterAddressFirstName(user.firstname);
            await signupPage.enterAddressLastName(user.lastname);
            await signupPage.enterCompany(user.company);
            await signupPage.enterAddress(user.address);
            await signupPage.enterAddressTwo(user.addressTwo);
            await signupPage.selectAddressCountry(user.country);
            await signupPage.enterAddressState(user.state);
            await signupPage.enterAddressCity(user.city);
            await signupPage.enterAddressZipCode(user.zipcode);
            await signupPage.enterAddressMobilePhone(user.mobileNumber);
        });
    }

    async clickCreateAccount(logger: TestAutomationLogger, signupPage: SignupPage): Promise<void> {
        logger.info('Clicking Signup page Create Account link.');
        await test.step('Click Create Account in Signup page', async () => {
            await signupPage.clickCreateAccount();
        });
    }

    async validateEnterAccountInformationText(logger: TestAutomationLogger, signupPage: SignupPage): Promise<void> {
        logger.info('Validating Signup page data entry heading text.');
        await test.step('Validate that Signup page have the expected text', async () => {
            await expect.soft(
                signupPage.components.enterAccountInformationHeader,
                'Signup page "Enter Account Information" should be visible'
            ).toBeVisible();
        });
    }

}