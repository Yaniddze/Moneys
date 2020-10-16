import { useState, useEffect } from 'react';
import { observable, autorun } from 'mobx';
import { User } from 'oidc-client';
import Cookies, { CookieAttributes } from 'js-cookie';

type StoreType = {
  user: User,
}

type ReturnType = {
  user: User;
  setUser: (user: User) => void;
}

const storage = observable<StoreType>({
  user: null,
});

export const useUserStorage = (): ReturnType => {
  const [user, setUser] = useState(storage.user);

  useEffect(() => autorun(() => {
    setUser(storage.user);
  }), []);

  const changeUser = (newUser: User) => {
    if (newUser !== null) {
      const options: CookieAttributes = {
        //  secure: true,
      };

      Cookies.set('access', newUser.access_token, options);
      Cookies.set('user.id', newUser.profile['user.id'], options);
    }
    storage.user = newUser;
  };

  return {
    user,
    setUser: changeUser,
  };
};
