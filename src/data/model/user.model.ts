import { VALID_COUNTRIES, VALID_TITLES } from '@data/constants/constants';
import { faker } from '@faker-js/faker';
import { ArraysUtils } from '@utils/arrays.utils';

export interface UserType {
    name: string,
    email: string,
    password: string,
    title: string,
    birthDate: string,
    birthMonth: string,
    birthYear: string,
    firstname: string,
    lastname: string,
    company: string,
    address: string,
    addressTwo: string,
    country: string,
    zipcode: string,
    state: string,
    city: string,
    mobileNumber: string
}

export function GenerateRandomUser(): UserType {
    const dob: Date = faker.date.birthdate();
    return {
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        title: ArraysUtils.getRandomElement(VALID_TITLES),
        birthDate: dob.getUTCDate().toString(),
        birthMonth: dob.getUTCMonth().toString(),
        birthYear: dob.getUTCFullYear().toString(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        company: faker.company.name(),
        address: faker.location.postalAddress(),
        addressTwo: faker.location.secondaryAddress(),
        country: ArraysUtils.getRandomElement(VALID_COUNTRIES),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number()
    }
}