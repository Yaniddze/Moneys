import { useState, useEffect } from 'react';
import {
  makeObservable,
  observable, 
  action,
  autorun,
} from 'mobx';
import { User } from 'oidc-client';

import { saveUser } from '../../utils/cookieUtils';

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
      saveUser(newUser.access_token, newUser.profile['user.id']);
    }
    storage.setUser(newUser);
  };

  return {
    user,
    setUser: changeUser,
  };
};
