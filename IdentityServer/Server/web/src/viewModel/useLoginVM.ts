// Core
import { useContext, useEffect } from 'react';

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
    loginResponseStorage.data.errors = [];
    loginUnit.Invoke(loginInfo).then((result) => {
      loginResponseStorage.isFetching = false;
      loginResponseStorage.data = result;
    });
  };

  useEffect(() => (): void => {
    loginResponseStorage.data.errors = [];
  }, []);

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
