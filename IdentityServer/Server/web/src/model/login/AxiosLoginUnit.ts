import {
  AxiosResponse,
  AxiosInstance,
  Canceler,
  AxiosError,
} from 'axios';
import { LoginInfo, LoginResponse, LoginUnit } from './types';

import { createClient } from '../../configuration/axiosConfiguration';

export class AxiosLoginUnit implements LoginUnit {
  constructor() {
    const { httpClient, canceler } = createClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosLoginUnit_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Invoke(loginInfo: LoginInfo): Promise<LoginResponse> {
    return this.httpClient.post('/auth/login', loginInfo)
      .then((result: AxiosResponse<LoginResponse>) => result.data)
      .catch((e: AxiosError) => {
        if (e.message === this.cancellationWord) {
          return {
            success: false,
            errors: [''],
          };
        }

        return {
          success: false,
          errors: ['Network error'],
        };
      });
  }

  InvokeCancel(): void {
    if (this.canceler) {
      this.canceler(this.cancellationWord);
    }
  }
}
