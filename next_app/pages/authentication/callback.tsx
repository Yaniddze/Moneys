import { useEffect } from 'react';

import Router from 'next/router';

import { useUserManager } from '../../hook';

export default function Callback(): JSX.Element {
  const { userManager } = useUserManager();

  useEffect(() => {
    if (userManager !== null) {
      userManager.signinRedirectCallback()
        .then(() => {
          Router.push('/');
          userManager.clearStaleState();
        });
    }
  }, [userManager]);

  return (
    <div>
      Callback...
    </div>
  );
}
