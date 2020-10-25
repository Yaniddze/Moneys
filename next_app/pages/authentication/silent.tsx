import Router from 'next/router';

import { useUserManager } from '../../hook';

export default function Silent(): JSX.Element {
  const { userManager } = useUserManager();

  if (userManager !== null) {
    userManager.signinSilentCallback()
      .then(() => {
        Router.push('/');
        userManager.clearStaleState();
      });
  }

  return (
    <div>
      Callback...
    </div>
  );
}
