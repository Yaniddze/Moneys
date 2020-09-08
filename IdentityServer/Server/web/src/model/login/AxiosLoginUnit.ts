import { AxiosResponse } from 'axios';
import { LoginInfo, LoginResponse, LoginUnit } from './types';

import { httpClient } from '../../configuration/axiosConfiguration';

export class AxiosLoginUnit implements LoginUnit {
  Invoke(loginInfo: LoginInfo): Promise<LoginResponse> {
    return httpClient.post('/auth/login', loginInfo)
      .then((result: AxiosResponse<LoginResponse>) => result.data)
      .catch(() => ({ success: false, errors: ['Network error'] }));
  }
}
