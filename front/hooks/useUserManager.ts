import { useState, useEffect } from 'react';
import { UserManager, WebStorageStateStore } from 'oidc-client';

import { oidcConfig } from '../configuration/oidcConfig';

type ReturnType = {
  manager: UserManager;
}

export const useUserManager = (): ReturnType => {
  const [manager, setManagaer] = useState<null | UserManager>(null);

  useEffect(() => {
    setManagaer(new UserManager({
      ...oidcConfig,
      userStore: new WebStorageStateStore({ store: localStorage }),
      stateStore: new WebStorageStateStore({ store: localStorage }),
    }));
  }, []);

  return {
    manager,
  };
};
