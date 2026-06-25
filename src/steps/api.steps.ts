import { ResponseType } from '@data/types/response.type';
import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { UserApi } from '@api/user.api';
import { UserType } from '@data/model/user.model';
import { NEWLINE } from '@data/constants/string.constants';

export class ApiSteps {

    async createAccount(logger: TestAutomationLogger, userApi: UserApi, user: UserType): Promise<void> {
        logger.info(`Creating user via API:${NEWLINE}${JSON.stringify(user, null, 4)}`);
        await test.step('Create valid user via API', async () => {
            const response: ResponseType = await userApi.createUser(user);
            expect(response.responseCode, "User create response code must be 201").toBe(201);
            expect(response.message, "User create response message must be 'User created!'").toBe('User created!');
        });
        logger.info('User created.');
    };

    async deleteAccount(logger: TestAutomationLogger, userApi: UserApi, user: UserType): Promise<void> {
        logger.info(`Deleting user via API:${NEWLINE}${JSON.stringify(user, null, 4)}`);
        await test.step('Delete user via API', async () => {
            const response: ResponseType = await userApi.deleteUser(user.email, user.password);
            expect(response.responseCode, "User delete response code must be 200").toBe(200);
            expect(response.message, "User delete response must be 'Account deleted!'").toBe('Account deleted!');
        });
        logger.info('User deleted.');
    };

}