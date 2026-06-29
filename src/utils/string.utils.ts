import { faker } from "@faker-js/faker";

export class StringUtils {

    static prettyJson<T>(target: T): string {
        return JSON.stringify(target, null, 4);
    }

    static generateRandomEmail(): string {
        return faker.internet.email();
    }

    static capitalize(text: string): string {
        return text.replace(/^\w/, (c) => c.toUpperCase());
    }

}
