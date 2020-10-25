import { User } from 'oidc-client';
import { FC, ReactNode } from 'react';

import { useUserManager } from '../hook';

type PropTypes = {
  children: ReactNode;
}

export const Secure: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const { userManager } = useUserManager();

  if (userManager !== null) {
    userManager.getUser()
      .then((user: User) => {
        if (user === null) {
          userManager.signinRedirect();
        }
      });
  }

  return (
    <>
      { children }
    </>
  );
};
