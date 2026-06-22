import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { Environment } from '@configs/environment.config';
import { ArraysUtils } from '@utils/arrays.utils';
import { VALID_COUNTRIES, VALID_TITLES } from '@data/constants/common.constants';

test.describe('User registration', async () => {

    test('Register user',
        { tag: ['@TC1', '@user-register'] },
        async ({ page, logger, homePage, signupLoginPage, signupPage, accountCreatedDeletedPage }) => {

            await test.step('Navigate to application home page', async () => {
                await homePage.home();
            });

            await test.step('Validate that application home page have the expected text', async () => {
                await expect.soft(
                    page,
                    `Home page should have the expected title: ${Environment.APPLICATION}`
                ).toHaveTitle(Environment.APPLICATION);
            });

            await test.step('Click "Signup / Login" button in Signup / Login page', async () => {
                await homePage.clickSignupLogin();
            });

            await test.step('Validate that Signup / Login page have the expected text', async () => {
                await expect.soft(
                    signupLoginPage.components.signupSectionHeader,
                    'Signup section header "New User Signup!" should be visible'
                ).toBeVisible();
            });

            const login: string = faker.internet.displayName();
            const email: string = faker.internet.email();
            logger.info(`Using login: ${login}`);
            logger.info(`Using email: ${email}`);
            await test.step('Enter signup data', async () => {
                await signupLoginPage.enterLogin(login);
                await signupLoginPage.enterEmail(email);
                await signupLoginPage.clickSignup();
            });

            await test.step('Validate that Signup page have the expected text', async () => {
                await expect.soft(
                    signupPage.components.enterAccountInformationHeader,
                    'Signup page "Enter Account Information" should be visible'
                ).toBeVisible();
            });

            const title: string = ArraysUtils.getRandomElement(VALID_TITLES);
            const dob: Date = faker.date.birthdate();
            const password = faker.internet.password();
            const addressFirstName: string = faker.person.firstName();
            const addressLastName: string = faker.person.lastName();
            const addressCompany: string = faker.company.name();
            const addressAddress: string = faker.location.postalAddress();
            const addressAddressTwo: string = faker.location.secondaryAddress();
            const addressCountry: string = ArraysUtils.getRandomElement(VALID_COUNTRIES);
            const addressState: string = faker.location.state();
            const addressCity: string = faker.location.city();
            const addressZipcode: string = faker.location.zipCode();
            const addressMobilePhone: string = faker.phone.number();
            logger.info(`Using title: ${title}`);
            logger.info(`Using date of birth: ${dob}`);
            logger.info(`Using password: ${password}`);
            logger.info(`Using address first name: ${addressFirstName}`);
            logger.info(`Using address last name: ${addressLastName}`);
            logger.info(`Using address company: ${addressCompany}`);
            logger.info(`Using address primary: ${addressAddress}`);
            logger.info(`Using address secondary: ${addressAddressTwo}`);
            logger.info(`Using address country: ${addressCountry}`);
            logger.info(`Using address state: ${addressState}`);
            logger.info(`Using address city: ${addressCity}`);
            logger.info(`Using address zipcode: ${addressZipcode}`);
            logger.info(`Using address mobile phone: ${addressMobilePhone}`);


            await test.step('Enter user data', async () => {
                await signupPage.chooseTitle(title);
                await signupPage.enterPassword(password);
                await signupPage.selectDobDay(dob.getUTCDate().toString());
                await signupPage.selectDobMonth(dob.getUTCMonth().toString());
                await signupPage.selectDobYear(dob.getUTCFullYear().toString());
                await signupPage.checkNewsletter(true);
                await signupPage.checkOptIn(true);
                await signupPage.enterAddressFirstName(addressFirstName);
                await signupPage.enterAddressLastName(addressLastName);
                await signupPage.enterCompany(addressCompany);
                await signupPage.enterAddress(addressAddress);
                await signupPage.enterAddressTwo(addressAddressTwo);
                await signupPage.selectAddressCountry(addressCountry);
                await signupPage.enterAddressState(addressState);
                await signupPage.enterAddressCity(addressCity);
                await signupPage.enterAddressZipCode(addressZipcode);
                await signupPage.enterAddressMobilePhone(addressMobilePhone);
            });

            await test.step('Click Create Account in Signup page', async () => {
                await signupPage.clickCreateAccount();
            });

            await test.step('Validate that "Account Created!" text is displayed', async () => {
                await expect.soft(
                    accountCreatedDeletedPage.components.accountCreatedText,
                    '"Account Created!" text should be visible'
                ).toBeVisible();
            });

            await test.step('Click Continue in Account Created page', async () => {
                await accountCreatedDeletedPage.clickContinue();
            });

            await test.step('Validate that "Logged in as <username>" text is displayed', async () => {
                await expect.soft(
                    homePage.components.loggedInText(login),
                    `"Logged in as ${login}" text should be visible`
                ).toBeVisible();
            });

            await test.step('Click "Delete Account" in home page', async () => {
                await homePage.clickDeleteAccount();
            });

            await test.step('Validate that "Account Deleted!" text is displayed', async () => {
                await expect.soft(
                    accountCreatedDeletedPage.components.accountDeletedText,
                    '"Account Deleted!" text should be visible'
                ).toBeVisible();
            });

            await test.step('Click Continue in Account Deleted page', async () => {
                await accountCreatedDeletedPage.clickContinue();
            });

        });

});
