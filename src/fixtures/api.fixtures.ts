
import { test as base } from "@playwright/test";
import { UserApi } from "@api/user.api";

type ApiConstructor<T> = new () => T;

function createApiFixture<T>(apiConstructor: ApiConstructor<T>) {
    return async ({ }, use: (value: T) => Promise<void>) => {
        const apiInstance = new apiConstructor();
        await use(apiInstance);
    };
}

type ApiFixtures = {
    userApi: UserApi,
};

export const test = base.extend<ApiFixtures>({
    userApi: createApiFixture(UserApi),
});