import { LoginUnit, LoginInfo, LoginResponse } from './types';

export class DefaultLoginUnit implements LoginUnit {
  Invoke(loginInfo: LoginInfo): Promise<LoginResponse> {
    throw new Error('Login unit not provided');
  }

  InvokeCancel(): void {
    throw new Error('Login unit not provided');
  }
}
