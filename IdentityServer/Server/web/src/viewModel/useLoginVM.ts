// Core
import { useContext } from 'react';

// Context
import { LoginUnitContext } from '../dependencies/LoginDependencies';

// Types
import {
  FetchingLoginResponse,
  LoginInfo,
  LoginUnit,
} from '../model/login/types';

// Storage
import { loginResponseStorage } from '../model/login/loginStateStorage';

type ReturnType = {
  loginState: FetchingLoginResponse;
  fetchLogin: (loginInfo: LoginInfo) => void;
}

export const useLoginVM = (): ReturnType => {
  const loginUnit: LoginUnit = useContext(LoginUnitContext);

  const fetchLogin = (loginInfo: LoginInfo): void => {
    loginResponseStorage.isFetching = true;
    loginUnit.Invoke(loginInfo).then((result) => {
      loginResponseStorage.isFetching = false;
      loginResponseStorage.data = result;
    });
  };

  return {
    fetchLogin,
    loginState: loginResponseStorage,
  };
};
