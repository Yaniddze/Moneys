import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  Canceler,
} from 'axios';
import { createClient } from '../../configuration/axiosConfiguration';
import { RegisterUnit, RegisterInfo, RegisterResponse } from './types';

export class AxiosRegisterUnit implements RegisterUnit {
  constructor() {
    const { httpClient, canceler } = createClient();
    this.httpClient = httpClient;
    this.canceler = canceler;
  }

  private readonly cancellationWord = 'AxiosRegisterUnit_Request_Cancellation';

  private readonly httpClient: AxiosInstance;

  private readonly canceler: Canceler | undefined;

  Invoke(registerInfo: RegisterInfo): Promise<RegisterResponse> {
    return this.httpClient.post('/register', registerInfo)
      .then((result: AxiosResponse<RegisterResponse>) => result.data)
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
