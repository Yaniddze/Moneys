import { VuexOidcClientSettings } from 'vuex-oidc';

export const oidcSettings: VuexOidcClientSettings = {
  authority: 'https://yaniddze.com',
  clientId: 'vue_application',
  // eslint-disable-next-line @typescript-eslint/camelcase
  client_secret: 'secret_key',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'code',
  scope: 'openid profile email offline_access',
};
