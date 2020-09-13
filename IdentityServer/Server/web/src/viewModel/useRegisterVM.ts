// Core
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// Context
import { RegisterUnitContext } from '../dependencies/RegisterDependencies';

// Types
import {
  FetchingRegisterResponse,
  RegisterInfo,
} from '../model/register/types';

type ReturnType = {
  registerState: FetchingRegisterResponse;
  fetchRegister: (registerInfo: RegisterInfo) => void;
  tryCancelFetch: () => void;
}

export const useRegisterVM = (): ReturnType => {
  const terminatedRef = useRef(false);
  const fetchingRef = useRef(false);

  const registerUnit = useContext(RegisterUnitContext);
  const [registerStorage, setRegisterState] = useState<FetchingRegisterResponse>({
    isFetching: false,
    data: {
      success: false,
      errors: [],
    },
  });

  const fetchRegister = (registerInfo: RegisterInfo): void => {
    fetchingRef.current = true;

    setRegisterState({
      isFetching: true,
      data: {
        success: false,
        errors: [],
      },
    });

    registerUnit.Invoke(registerInfo)
      .then((result) => {
        if (!terminatedRef.current) {
          fetchingRef.current = false;

          setRegisterState({
            isFetching: false,
            data: result,
          });
        }
      });
  };

  useEffect(() => (): void => {
    terminatedRef.current = true;
  }, []);

  const tryCancelFetch = (): void => {
    if (fetchingRef.current) {
      registerUnit.InvokeCancel();
    }
  };

  return {
    fetchRegister,
    registerState: registerStorage,
    tryCancelFetch,
  };
};
