import { UserManagerSettings } from 'oidc-client';

export const oidcConfig: UserManagerSettings = {
  authority: 'https://yaniddze.com',
  // eslint-disable-next-line @typescript-eslint/camelcase
  client_id: 'client_id_react',
  // eslint-disable-next-line @typescript-eslint/camelcase
  client_secret: 'client_secret_react',
  // eslint-disable-next-line @typescript-eslint/camelcase
  response_type: 'code',
  scope: 'openid profile offline_access email user.scope money_api',
  // eslint-disable-next-line @typescript-eslint/camelcase
  redirect_uri: 'http://localhost:3000/authentication/callback',
  // eslint-disable-next-line @typescript-eslint/camelcase
  silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  // eslint-disable-next-line @typescript-eslint/camelcase
  post_logout_redirect_uri: 'http://localhost:3000/',
};
