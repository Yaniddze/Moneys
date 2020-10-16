import { useState, useEffect } from 'react';
import {
  makeObservable,
  observable, 
  action,
  autorun,
} from 'mobx';
import { User } from 'oidc-client';
import Cookies, { CookieAttributes } from 'js-cookie';

class Storage {
  user: User = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user: User) {
    this.user = user;
  }
}

type ReturnType = {
  user: User;
  setUser: (user: User) => void;
}

const storage = new Storage();

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
    storage.setUser(newUser);
  };

  return {
    user,
    setUser: changeUser,
  };
};
