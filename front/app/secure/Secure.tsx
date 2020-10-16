// Core
import { 
  FC, 
  ReactElement, 
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

  if (manager !== null) {
    manager.getUser()
      .then((user) => {
        if (user === null) {
          setUser(user);
          if (router.pathname !== '/authentication/callback') {
            manager.signinRedirect();
          }
        }
      });
  }
  
  return (
    <div>
      { children }
    </div>
  );
};
