import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloLink, 
  HttpLink, 
} from '@apollo/client';

export const createClient = (token: string, errorLink?: ApolloLink) => {
  const httpLink = new HttpLink({
    uri: 'https://yaniddze.com/api/moneys',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return new ApolloClient({
    link: errorLink !== undefined 
      ? ApolloLink.from([
        errorLink,
        httpLink,
      ]) 
      : httpLink,
    cache: new InMemoryCache(),
  });
};
