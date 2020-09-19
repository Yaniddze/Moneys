import {
  UserManager,
  WebStorageStateStore,
  User,
  UserManagerSettings,
} from 'oidc-client';

export default class AuthService {
  private userManager: UserManager;

  constructor() {
    const domain = 'https://yaniddze.com';

    const settings: UserManagerSettings = {
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      authority: domain,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: 'vue_application',
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: 'http://localhost:8080/callback.html',
      automaticSilentRenew: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      silent_redirect_uri: 'http://localhost:8080/silent-renew.html',
      // eslint-disable-next-line @typescript-eslint/camelcase
      response_type: 'code',
      scope: 'openid profile email offline_access',
      // eslint-disable-next-line @typescript-eslint/camelcase
      post_logout_redirect_uri: 'http://localhost:8080/',
      filterProtocolClaims: true,
    };

    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public getAccessToken(): Promise<string> {
    return this.userManager.getUser().then((data: any) => data.access_token);
  }
}
