import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
} from 'axios';
import { LoginInfo, LoginResponse, LoginUnit } from './types';

import { createClient } from '../../configuration/axiosConfiguration';

export class AxiosLoginUnit implements LoginUnit {
  constructor() {
    const { httpClient, canceler } = createClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Invoke(loginInfo: LoginInfo): Promise<LoginResponse> {
    return this.httpClient.post('/login', loginInfo)
      .then((result: AxiosResponse<LoginResponse>) => result.data)
      .catch(() => ({
        success: false,
        errors: ['Network error'],
      }));
  }

  InvokeCancel(): void {
    if (this.canceler) {
      this.canceler();
    }
  }
}
