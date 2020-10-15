import { FC, ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

import { createClient } from './apolloConfig';

type PropTypes = {
  children: ReactElement;
}

export const Apollo: FC<PropTypes> = ({
  children,
}: PropTypes) => {
  const { oidcUser } = useReactOidc();
  const client = createClient(oidcUser.access_token);

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
