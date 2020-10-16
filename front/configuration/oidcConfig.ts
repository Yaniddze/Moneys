import { UserManagerSettings } from 'oidc-client';

export const oidcConfig: UserManagerSettings = {
  authority: 'https://yaniddze.com',
  client_id: 'client_id_react',
  client_secret: 'client_secret_react',
  response_type: 'code',
  scope: 'openid profile offline_access email user.scope money_api',
  redirect_uri: 'http://localhost:3000/authentication/callback',
  silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  post_logout_redirect_uri: 'http://localhost:3000/',
};
