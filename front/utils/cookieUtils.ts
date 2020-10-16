import Cookies, { CookieAttributes } from 'js-cookie';

const accessCookieName = 'access';
const idCookieName = 'user.id';

// TODO: Reset to production
const cookieConfig: CookieAttributes = {
  // secure: true;
};

export function saveUser(accessToken: string, id: string): void {
  Cookies.set(accessCookieName, accessToken, cookieConfig);
  Cookies.set(idCookieName, id, cookieConfig);
}

export function deleteUser(): void {
  Cookies.remove(accessCookieName);
  Cookies.remove(idCookieName);
}

type ReturnType = {
  accessToken: string;
  userId: string
}

export function getUserInfo(): ReturnType {
  return {
    accessToken: Cookies.get(accessCookieName),
    userId: Cookies.get(idCookieName),
  };
}
