// Core
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Hooks
import { useUserManager } from '../../hooks/useUserManager';
import { useUserStorage } from '../../hooks/storage/useUserStorage';

export default function Callback(): JSX.Element {
  const router = useRouter();
  const { manager } = useUserManager();
  const { setUser } = useUserStorage();

  useEffect(() => {
    if (manager !== null) {
      manager.getUser()
        .then((user) => {
          if (user !== null) {
            router.push('/');
          } else {
            manager.signinCallback(router.asPath)
              .then((foundedUser) => {
                setUser(foundedUser);
                router.push('/');
              });
          }
        });      
    }
  }, [manager]);

  return (
    <div>
      Callback
    </div>
  );
}
