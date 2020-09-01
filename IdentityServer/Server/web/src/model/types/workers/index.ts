import {
  LoginResponse,
  RegisterResponse,
} from '../responses';

export interface LoginUnit {
  Invoke: (userName: string, password: string) =>
    Promise<LoginResponse>;
}

export interface RegisterUnit {
  Invoke: (userName: string, password: string, passwordConfirmation: string, email: string) =>
    Promise<RegisterResponse>;
}
