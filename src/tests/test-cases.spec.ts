import { test } from '@fixtures/fixtures';

test.describe('Test Cases page', async () => {

    test('Validate Test Cases page',
        { tag: ['@TC7', '@test-cases'] },
        async ({
            logger, page, homeSteps, homePage, testCaseSteps, sharedSteps
        }) => {
            await sharedSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await sharedSteps.clickTestCases(logger, homePage.header);
            await testCaseSteps.validateTestCasesTitle(logger, page);
        });

});
