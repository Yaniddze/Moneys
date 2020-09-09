import { RegisterUnit, RegisterResponse, RegisterInfo } from './types';

export class DefaultRegisterUnit implements RegisterUnit {
  Invoke(registerInfo: RegisterInfo): Promise<RegisterResponse> {
    throw new Error('Register unit is not provided');
  }

  InvokeCancel(): void {
    throw new Error('Register unit is not provided');
  }
}
