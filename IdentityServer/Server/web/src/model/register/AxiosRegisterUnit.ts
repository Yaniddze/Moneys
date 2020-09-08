import { AxiosResponse } from 'axios';
import { httpClient } from '../../configuration/axiosConfiguration';
import { RegisterUnit, RegisterInfo, RegisterResponse } from './types';

export class AxiosRegisterUnit implements RegisterUnit {
  Invoke(registerInfo: RegisterInfo): Promise<RegisterResponse> {
    return httpClient.post('/register', registerInfo)
      .then((result: AxiosResponse<RegisterResponse>) => result.data)
      .catch(() => ({ success: false, errors: ['Network error'] }));
  }
}
