import { WebStorageStateStore, UserManager } from 'oidc-client';

export function CreateUserManager(): UserManager {
  return new UserManager({
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: 'https://yaniddze.com',
    scope: 'openid profile offline_access email money_api user.scope',
    client_id: 'client_id_react',
    client_secret: 'client_secret_react',
    post_logout_redirect_uri: 'http://localhost:3000/',
    redirect_uri: 'http://localhost:3000/authentication/callback',
  });
}
