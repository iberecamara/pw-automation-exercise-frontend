import { Environment } from '@configs/environment.config';
import { UserType } from '@data/model/user.model';
import axios, { AxiosResponse } from 'axios';
import { ResponseType } from '@data/types/response.type';

export class UserApi {

    async createUser(user: UserType): Promise<ResponseType> {
        const params = new URLSearchParams();
        params.append('name', user.name);
        params.append('email', user.email);
        params.append('password', user.password);
        params.append('title', user.title);
        params.append('birth_date', user.birthDate);
        params.append('birth_month', user.birthMonth);
        params.append('birth_year', user.birthYear);
        params.append('firstname', user.firstname);
        params.append('lastname', user.lastname);
        params.append('company', user.company);
        params.append('address1', user.address);
        params.append('address2', user.addressTwo);
        params.append('country', user.country);
        params.append('zipcode', user.zipcode);
        params.append('state', user.state);
        params.append('city', user.city);
        params.append('mobile_number', user.mobileNumber);
        const response: AxiosResponse = await axios.post(Environment.CREATE_ACCOUNT_API_URL, params);
        return response.data;
    }

    async deleteUser(email: string, password: string): Promise<ResponseType> {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        const response: AxiosResponse = await axios.delete(Environment.DELETE_ACCOUNT_API_URL, { data: params });
        return response.data;
    }

}