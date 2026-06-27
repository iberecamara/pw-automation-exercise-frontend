import { test } from '@fixtures/fixtures';
import { GenerateRandomUser, UserType } from '@data/model/user.model';

test.describe('User logout', async () => {

    let user: UserType;
    test.beforeEach('Create valid user via API', async ({ logger, userApi, apiSteps }) => {
        user = GenerateRandomUser();
        await apiSteps.createAccount(logger, userApi, user);
    });

    test('Login with valid user',
        { tag: ['@TC4', '@user-logout'] },
        async ({
            logger, page, homeSteps, signupLoginSteps, apiSteps, userApi,
            homePage, signupLoginPage,
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateLoginToAccountText(logger, signupLoginPage);
            await signupLoginSteps.enterLoginData(logger, signupLoginPage, user);
            await homeSteps.validateUserLoggedText(logger, homePage, user);
            await homeSteps.clickLogout(logger, homePage);
            await signupLoginSteps.validateSignupLoginTitle(logger, page);
            await apiSteps.deleteAccount(logger, userApi, user);
        });

});
