import { test } from '@fixtures/fixtures';
import { GenerateRandomUser, UserType } from '@data/model/user.model';

test.describe('User login', async () => {

    let user: UserType;
    test.beforeEach('Create valid user via API', async ({ logger, userApi, apiSteps }) => {
        user = GenerateRandomUser();
        await apiSteps.createAccount(logger, userApi, user);
    });

    test('Login with valid user',
        { tag: ['@TC2', '@user-login', '@valid-user'] },
        async ({
            logger, page, homeSteps, signupLoginSteps, accountCreatedDeletedSteps,
            homePage, signupLoginPage, accountCreatedDeletedPage
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateLoginToAccountText(logger, signupLoginPage);
            await signupLoginSteps.enterLoginData(logger, signupLoginPage, user);
            await homeSteps.validateUserLoggedText(logger, homePage, user);
            await homeSteps.clickDeleteAccount(logger, homePage);
            await accountCreatedDeletedSteps.validateAccountDeletedText(logger, accountCreatedDeletedPage);
        });

    test('Login with invalid user',
        { tag: ['@TC3.1', '@user-login', '@login-error', '@invalid-user'] },
        async ({
            logger, page, homeSteps, signupLoginSteps, apiSteps, userApi, homePage, signupLoginPage
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateLoginToAccountText(logger, signupLoginPage);
            const email = user.email;
            user.email = `invalid_${user.email}`;
            await signupLoginSteps.enterLoginData(logger, signupLoginPage, user);
            await signupLoginSteps.validateInvalidCredentialsMessage(logger, signupLoginPage);
            user.email = email;
            await apiSteps.deleteAccount(logger, userApi, user);
        });

    test('Login with invalid password',
        { tag: ['@TC3.2', '@user-login', '@invalid-password'] },
        async ({
            logger, page, homeSteps, signupLoginSteps, userApi, apiSteps, homePage, signupLoginPage
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateLoginToAccountText(logger, signupLoginPage);
            const password = user.password;
            user.password = `invalid_${user.password}`;
            await signupLoginSteps.enterLoginData(logger, signupLoginPage, user);
            await signupLoginSteps.validateInvalidCredentialsMessage(logger, signupLoginPage);
            user.password = password;
            await apiSteps.deleteAccount(logger, userApi, user);
        });

});
