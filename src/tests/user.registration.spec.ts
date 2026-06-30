import { test } from '@fixtures/fixtures';
import { GenerateRandomUser, UserType } from '@data/model/user.model';
import { CREATED, DELETED } from '@data/constants/common.constants';
import { StringUtils } from '@utils/string.utils';

test.describe('User registration', async () => {

    test('Register user',
        { tag: ['@TC1', '@user-register'] },
        async ({
            page, logger, homeSteps, signupLoginSteps, signupSteps, accountCreatedDeletedSteps,
            homePage, signupLoginPage, signupPage, accountCreatedDeletedPage, sharedSteps
        }) => {

            const user: UserType = GenerateRandomUser();
            await sharedSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await sharedSteps.clickSignupLogin(logger, homePage.header);
            await signupLoginSteps.validateNewUserSignupText(logger, signupLoginPage);
            await signupLoginSteps.enterSignupData(logger, signupLoginPage, user);
            await signupLoginSteps.clickSignup(logger, signupLoginPage);
            await signupSteps.validateEnterAccountInformationText(logger, signupPage);
            await signupSteps.enterSignupData(logger, signupPage, user);
            await signupSteps.clickCreateAccount(logger, signupPage);
            await accountCreatedDeletedSteps.validateAccountActionText(logger, accountCreatedDeletedPage, CREATED);
            await accountCreatedDeletedSteps.clickContinue(logger, accountCreatedDeletedPage, StringUtils.capitalize(CREATED));
            await sharedSteps.validateUserLoggedText(logger, homePage.header, user);
            await sharedSteps.clickDeleteAccount(logger, homePage.header);
            await accountCreatedDeletedSteps.validateAccountActionText(logger, accountCreatedDeletedPage, DELETED);
            await accountCreatedDeletedSteps.clickContinue(logger, accountCreatedDeletedPage, StringUtils.capitalize(DELETED));

        });

    test('Register User with existing email',
        { tag: ['@TC5', '@user-register', '@user-register-error'] },
        async ({
            page, logger, homeSteps, signupLoginSteps, apiSteps, userApi, homePage, signupLoginPage, sharedSteps
        }) => {

            const user: UserType = GenerateRandomUser();
            await apiSteps.createAccount(logger, userApi, user);
            await sharedSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await sharedSteps.clickSignupLogin(logger, homePage.header);
            await signupLoginSteps.validateNewUserSignupText(logger, signupLoginPage);
            await signupLoginSteps.enterSignupData(logger, signupLoginPage, user);
            await signupLoginSteps.clickSignup(logger, signupLoginPage);
            await signupLoginSteps.validateEmailAlreadyExistsMessage(logger, signupLoginPage);
            await apiSteps.deleteAccount(logger, userApi, user);
        });

});
