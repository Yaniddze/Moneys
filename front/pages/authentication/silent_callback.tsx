// Core
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Hooks
import { useUserManager } from '../../hooks/useUserManager';
import { useUserStorage } from '../../hooks/storage/useUserStorage';

export default function SilentCallback(): JSX.Element {
  const router = useRouter();
  const { manager } = useUserManager();
  const { setUser } = useUserStorage();

  useEffect(() => {
    if (manager !== null) {
      manager.signinSilentCallback(router.asPath)
        .then((foundedUser) => {
          setUser(foundedUser);
          router.push('/');
        })
        .catch((e) => {
          console.log(e);
          
          router.push('/');
        });
    }
  }, [manager]);

  return (
    <div>
      Silent Callback
    </div>
  );
}
