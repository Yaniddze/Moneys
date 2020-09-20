import { VuexOidcClientSettings } from 'vuex-oidc';

export const oidcSettings: VuexOidcClientSettings = {
  authority: 'https://yaniddze.com',
  clientId: 'vue_application',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'code',
  scope: 'openid profile email offline_access',
};
