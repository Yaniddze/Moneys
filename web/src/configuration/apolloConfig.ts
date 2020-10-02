import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://yaniddzr.com/api/moneys',
  cache: new InMemoryCache(),
});
