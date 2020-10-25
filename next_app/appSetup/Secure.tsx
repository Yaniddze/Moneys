import { User } from 'oidc-client';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

import { useUserManager } from '../hook';

type PropTypes = {
  children: ReactNode;
}

export const Secure: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const router = useRouter();
  const { userManager } = useUserManager();

  if (userManager !== null) {
    userManager.getUser()
      .then((user: User) => {
        if ((user === null) 
          && router.route !== '/authentication/callback'
          && router.route !== '/authentication/silent'
        ) {
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
