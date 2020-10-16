import { FC, ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useUserStorage } from '../../hooks/storage/useUserStorage';

import { createClient } from './apolloConfig';

type PropTypes = {
  children: ReactElement;
}

export const Apollo: FC<PropTypes> = ({
  children,
}: PropTypes) => {
  const { user } = useUserStorage();
  const client = createClient(user?.access_token);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
