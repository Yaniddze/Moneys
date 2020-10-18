import { FC, ReactElement, useEffect } from 'react';
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
  const { manager } = useUserManager();
  const client = createClient(user?.access_token);

  useEffect(() => {
    onError(() => {
      manager.signoutRedirect();
    });
  }, [manager]);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
