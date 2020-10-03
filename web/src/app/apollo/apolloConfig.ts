import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createClient = (token: string) => new ApolloClient({
  uri: 'https://yaniddze.com/api/moneys',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
