import { 
  FC, 
  ReactElement, 
  useEffect,
  useState, 
} from 'react';
import { ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Hooks
import { useUserStorage } from '../../hooks/storage/useUserStorage';
import { useUserManager } from '../../hooks/useUserManager';

import { createClient } from './apolloConfig';

type PropTypes = {
  children: ReactElement;
}

export const Apollo: FC<PropTypes> = ({
  children,
}: PropTypes) => {
  const { user } = useUserStorage();
  const [client, setClient] = useState(createClient(user?.access_token));
  const { manager } = useUserManager();

  useEffect(() => {
    if (user !== null) {
      const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (networkError) {
          manager.signoutRedirect();
        }
      });
       
      setClient(createClient(user?.access_token, errorLink));
    }
  }, [user]);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
