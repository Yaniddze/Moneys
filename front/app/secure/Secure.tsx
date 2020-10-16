// Core
import { 
  FC, 
  ReactElement, 
  useEffect,
} from 'react';
import { useRouter } from 'next/router';

// Hooks
import { useUserManager } from '../../hooks/useUserManager';
import { useUserStorage } from '../../hooks/storage/useUserStorage';

type PropTypes = {
  children: ReactElement;
}

export const Secure: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const router = useRouter();
  const { setUser } = useUserStorage();

  const { manager } = useUserManager();

  useEffect(() => {
    if (manager !== null) {
      manager.getUser()
        .then((user) => {
          if (user === null) {
            if (router.pathname !== '/authentication/callback') {
              manager.signinRedirect();
            }
          }
          setUser(user);
        });
    }
  }, [manager]);
  
  return (
    <div>
      { children }
    </div>
  );
};
