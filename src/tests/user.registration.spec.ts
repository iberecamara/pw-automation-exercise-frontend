import { test } from '@fixtures/fixtures';
import { GenerateRandomUser, UserType } from '@data/model/user.model';

test.describe('User registration', async () => {

    test('Register user',
        { tag: ['@TC1', '@user-register'] },
        async ({
            page, logger, homeSteps, signupLoginSteps, signupSteps, accountCreatedDeletedSteps,
            homePage, signupLoginPage, signupPage, accountCreatedDeletedPage
        }) => {

            const user: UserType = GenerateRandomUser();
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateNewUserSignupText(logger, signupLoginPage);
            await signupLoginSteps.enterSignupData(logger, signupLoginPage, user);
            await signupLoginSteps.clickSignup(logger, signupLoginPage);
            await signupSteps.validateEnterAccountInformationText(logger, signupPage);
            await signupSteps.enterSignupData(logger, signupPage, user);
            await signupSteps.clickCreateAccount(logger, signupPage);
            await accountCreatedDeletedSteps.validateAccountCreatedText(logger, accountCreatedDeletedPage);
            await accountCreatedDeletedSteps.clickContinue(logger, accountCreatedDeletedPage, 'Created');
            await homeSteps.validateUserLoggedText(logger, homePage, user);
            await homeSteps.clickDeleteAccount(logger, homePage);
            await accountCreatedDeletedSteps.validateAccountDeletedText(logger, accountCreatedDeletedPage);
            await accountCreatedDeletedSteps.clickContinue(logger, accountCreatedDeletedPage, 'Deleted');

        });

    test('Error for existing email in Register user',
        { tag: ['@TC5', '@user-register', '@user-register-error'] },
        async ({
            page, logger, homeSteps, signupLoginSteps, apiSteps, userApi, homePage, signupLoginPage,
        }) => {

            const user: UserType = GenerateRandomUser();
            await apiSteps.createAccount(logger, userApi, user);
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickSignupLogin(logger, homePage);
            await signupLoginSteps.validateNewUserSignupText(logger, signupLoginPage);
            await signupLoginSteps.enterSignupData(logger, signupLoginPage, user);
            await signupLoginSteps.clickSignup(logger, signupLoginPage);
            await signupLoginSteps.validateEmailAlreadyExistsMessage(logger, signupLoginPage);
            await apiSteps.deleteAccount(logger, userApi, user);
        });

});
