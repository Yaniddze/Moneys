// Core
import { UserManager } from 'oidc-client';
import { useContext } from 'react';

import {
  UserManagerContext,
} from '../../dependencies';

type ReturnType = {
  userManager: UserManager | null;
};

export const useUserManager = (): ReturnType => {
  const userManager = useContext(UserManagerContext);

  return {
    userManager,
  };
};
