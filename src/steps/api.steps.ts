import { ResponseType } from '@data/types/response.type';
import { expect } from '@playwright/test';
import { test } from '@fixtures/fixtures';
import { TestAutomationLogger } from '@utils/logger.utils';
import { UserApi } from '@api/user.api';
import { UserType } from '@data/model/user.model';

export class ApiSteps {

    async createAccount(logger: TestAutomationLogger, userApi: UserApi, user: UserType): Promise<void> {
        await test.step('Create valid user via API', async () => {
            const response: ResponseType = await userApi.createUser(user);
            expect(response.responseCode, "User create response code must be 201").toBe(201);
            expect(response.message, "User create response message must be 'User created!'").toBe('User created!');
        });
    };

    async deleteAccount(logger: TestAutomationLogger, userApi: UserApi, user: UserType): Promise<void> {
        await test.step('Delete user via API', async () => {
            const response: ResponseType = await userApi.deleteUser(user.email, user.password);
            expect(response.responseCode, "User delete response code must be 200").toBe(200);
            expect(response.message, "User delete response must be 'Account deleted!'").toBe('Account deleted!');
        });

    };

}