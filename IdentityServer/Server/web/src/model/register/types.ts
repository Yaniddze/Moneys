export type RegisterResponse = {
  success: boolean;
  errors: string[];
};

export type FetchingRegisterResponse = {
  isFetching: boolean;
  data: RegisterResponse;
};

export type RegisterInfo = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

export interface RegisterUnit {
  Invoke(registerInfo: RegisterInfo): Promise<RegisterResponse>;
}
