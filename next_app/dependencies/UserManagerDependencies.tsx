import { 
  FC, 
  createContext,
  useEffect, 
  useState,
  ReactNode,
} from 'react';
import { UserManager } from 'oidc-client';
import { CreateUserManager } from '../config';

export const UserManagerContext = createContext<UserManager | null>(null);

type PropTypes = {
  children: ReactNode;
}

export const UserManagerDependencies: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const [manager, setManager] = useState<UserManager | null>(null);

  useEffect(() => {
    setManager(CreateUserManager());
  }, []);
  
  return (
    <UserManagerContext.Provider value={manager}>
      { children }
    </UserManagerContext.Provider>
  );
};
