export type LoginResponse = {
  success: boolean;
  errors: string[];
};

export type FetchingLoginResponse = {
  isFetching: boolean;
  data: LoginResponse;
};

export type LoginInfo = {
  username: string;
  password: string;
}

export interface LoginUnit {
  Invoke: (loginInfo: LoginInfo) => Promise<LoginResponse>;
}
