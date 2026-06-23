import { test } from '@fixtures/fixtures';
import { GenerateRandomUser, UserType } from '@data/model/user.model';

test.describe('User login', async () => {

    test('Login with valid user',
        { tag: ['@TC2', '@user-login', '@valid-user'] },
        async ({ logger, page, apiSteps, homeSteps, signupLoginSteps, accountCreatedDeletedSteps, userApi, homePage, signupLoginPage, accountCreatedDeletedPage }) => {

            const user: UserType = GenerateRandomUser();
            await apiSteps.createAccount(logger, userApi, user);
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateLoginToAccountText(logger, signupLoginPage);
            await signupLoginSteps.enterLoginData(logger, signupLoginPage, user);
            await homeSteps.validateUserLoggedText(logger, homePage, user);
            await homeSteps.clickDeleteAccount(logger, homePage);
            await accountCreatedDeletedSteps.validateAccountDeletedText(logger, accountCreatedDeletedPage);

        });

});
