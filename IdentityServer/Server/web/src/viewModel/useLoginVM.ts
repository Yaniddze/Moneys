// Core
import { useContext } from 'react';

// Context
import { LoginUnitContext } from '../dependencies/LoginDependencies';

// Types
import {
  FetchingLoginResponse,
  LoginInfo,
} from '../model/login/types';

// Storage
import { loginResponseStorage } from '../model/login/loginStateStorage';

type ReturnType = {
  loginState: FetchingLoginResponse;
  fetchLogin: (loginInfo: LoginInfo) => void;
  tryCancelFetch: () => void;
}

export const useLoginVM = (): ReturnType => {
  const loginUnit = useContext(LoginUnitContext);

  const fetchLogin = (loginInfo: LoginInfo): void => {
    loginResponseStorage.isFetching = true;
    loginUnit.Invoke(loginInfo).then((result) => {
      loginResponseStorage.isFetching = false;
      loginResponseStorage.data = result;
    });
  };

  const tryCancelFetch = (): void => {
    if (loginResponseStorage.isFetching) {
      loginResponseStorage.isFetching = false;
      loginUnit.InvokeCancel();
    }
  };

  return {
    fetchLogin,
    loginState: loginResponseStorage,
    tryCancelFetch,
  };
};
