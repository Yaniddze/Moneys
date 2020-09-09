// Core
import { useContext } from 'react';

// Context
import { RegisterUnitContext } from '../dependencies/RegisterDependencies';

// Types
import {
  FetchingRegisterResponse,
  RegisterInfo,
} from '../model/register/types';

// Storage
import { registerStateStorage } from '../model/register/registerStateStorage';

type ReturnType = {
  registerState: FetchingRegisterResponse;
  fetchRegister: (registerInfo: RegisterInfo) => void;
  tryCancelFetch: () => void;
}

export const useRegisterVM = (): ReturnType => {
  const registerUnit = useContext(RegisterUnitContext);

  const fetchRegister = (registerInfo: RegisterInfo): void => {
    registerStateStorage.isFetching = true;
    registerUnit.Invoke(registerInfo)
      .then((result) => {
        registerStateStorage.isFetching = false;
        registerStateStorage.data = result;
      });
  };

  const tryCancelFetch = (): void => {
    if (registerStateStorage.isFetching) {
      registerStateStorage.isFetching = false;
      registerUnit.InvokeCancel();
    }
  };

  return {
    fetchRegister,
    registerState: registerStateStorage,
    tryCancelFetch,
  };
};
