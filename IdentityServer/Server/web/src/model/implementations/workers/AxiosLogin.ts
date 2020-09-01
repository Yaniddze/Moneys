import { AxiosResponse } from 'axios';
import { httpClient } from '../../../configuration/axiosConfiguration';
import { LoginUnit } from '../../types/workers';
import { LoginResponse } from '../../types/responses';

export class AxiosLogin implements LoginUnit {
  Invoke(userName: string, password: string): Promise<LoginResponse> {
    return httpClient.post('auth', {
      username: userName,
      password,
    })
      .then((result: AxiosResponse<LoginResponse>) => result.data)
      .catch(() => ({ success: false, errors: ['Network Error'] }));
  }
}
