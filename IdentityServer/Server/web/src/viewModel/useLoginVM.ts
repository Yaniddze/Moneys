import { useState } from 'react';

// Types
import { LoginResponse } from '../model/types/responses';
import { LoginUnit } from '../model/types/workers';

// Utils
import { useTerminated } from '../utils/useTerminated';

type PropTypes = {
  loginUnit: LoginUnit;
}

type FetchLoginType = {
  isFetching: boolean;
  data: LoginResponse;
}

type ReturnType = {
  loginResponse: FetchLoginType;
  fetchLogin: (userName: string, password: string) => void;
}

export const useLoginVM = ({ loginUnit }: PropTypes): ReturnType => {
  const terminated = useTerminated();
  
  const [loginResponse, setLoginResponse] = useState<FetchLoginType>({
    isFetching: false,
    data: {
      errors: [],
      success: false,
    },
  });

  const fetchLogin = (userName: string, password: string): void => {
    setLoginResponse({
      isFetching: true,
      data: {
        success: false,
        errors: [],
      },
    });

    loginUnit.Invoke(userName, password)
      .then((result) => {
        if (!terminated) {
          setLoginResponse({
            isFetching: false,
            data: result,
          });
        }
      });
  };

  return {
    loginResponse,
    fetchLogin,
  };
};
