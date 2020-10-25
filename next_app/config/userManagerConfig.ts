import { 
  InMemoryWebStorage, 
  UserManager,
  WebStorageStateStore, 
} from 'oidc-client';

export function CreateUserManager(): UserManager {
  const manager = new UserManager({
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
    stateStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
    authority: 'https://yaniddze.com',
    scope: 'openid profile offline_access email money_api user.scope',
    client_id: 'client_id_react',
    client_secret: 'client_secret_react',
    post_logout_redirect_uri: 'http://localhost:3000/',
    redirect_uri: 'http://localhost:3000/authentication/callback',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent',
    automaticSilentRenew: true,
  });

  manager.startSilentRenew();

  return manager;
}
