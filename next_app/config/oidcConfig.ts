import { OidcClientSettings } from 'oidc-client';

export const oidcConfig: OidcClientSettings = {
  authority: 'https://yaniddze.com',
  scope: 'openid profile offline_access email money_api user.scope',
  client_id: 'client_id_react',
  client_secret: 'client_secret_react',
  post_logout_redirect_uri: 'http://localhost:3000/',
  redirect_uri: 'http://localhost:3000/authentication/callback',
};
