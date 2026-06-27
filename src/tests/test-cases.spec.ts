import { test } from '@fixtures/fixtures';

test.describe('Test Cases page', async () => {

    test('Validate Test Cases page',
        { tag: ['@TC7', '@test-cases'] },
        async ({
            logger, page, homeSteps, homePage, testCaseSteps
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickTestCases(logger, homePage);
            await testCaseSteps.validateTestCasesTitle(logger, page);
        });

});
