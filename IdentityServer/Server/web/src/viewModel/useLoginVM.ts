// Core
import {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

// Context
import { LoginUnitContext } from '../dependencies/LoginDependencies';

// Types
import {
  FetchingLoginResponse,
  LoginInfo,
} from '../model/login/types';

type ReturnType = {
  loginState: FetchingLoginResponse;
  fetchLogin: (loginInfo: LoginInfo) => void;
  tryCancelFetch: () => void;
}

export const useLoginVM = (): ReturnType => {
  const terminatedRef = useRef(false);
  const fetchingRef = useRef(false);

  const loginUnit = useContext(LoginUnitContext);
  const [loginStorage, setLoginStorage] = useState<FetchingLoginResponse>({
    isFetching: false,
    data: {
      success: false,
      errors: [],
    },
  });

  const fetchLogin = (loginInfo: LoginInfo): void => {
    fetchingRef.current = true;
    setLoginStorage({
      isFetching: true,
      data: {
        success: false,
        errors: [],
      },
    });

    loginUnit.Invoke(loginInfo)
      .then((result) => {
        fetchingRef.current = false;

        if (!terminatedRef.current) {
          setLoginStorage({
            isFetching: false,
            data: result,
          });
        }
      });
  };

  const tryCancelFetch = (): void => {
    if (fetchingRef) {
      loginUnit.InvokeCancel();
    }
  };

  useEffect(() => (): void => {
    terminatedRef.current = true;
  }, []);

  return {
    fetchLogin,
    loginState: loginStorage,
    tryCancelFetch,
  };
};
