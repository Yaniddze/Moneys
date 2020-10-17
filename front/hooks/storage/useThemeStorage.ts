// Core
import { useEffect, useState } from 'react';
import {
  makeObservable,
  observable, 
  action,
  autorun,
} from 'mobx';
import Cookies from 'js-cookie';

export const lightValue = 'light';
export const darkValue = 'dark';
export const cookieName = 'Moneys.Theme';

class Storage {
  light = false;

  constructor() {
    makeObservable(this, {
      light: observable,
      setLight: action,
    });
  }

  setLight(value: boolean) {
    this.light = value;
  }
}

export type ThemeStorage = {
  light: boolean;
}

type ReturnType = {
  light: boolean;
  reverseLight: () => void;
}

const storage = new Storage();

export const useThemeStorage = (): ReturnType => {
  const [current, setCurrent] = useState(storage.light);

  useEffect(() => {
    const init = Cookies.get(cookieName) === lightValue;
    if (init !== storage.light) {
      storage.setLight(init);
      setCurrent(init);
    }

    return autorun(() => {
      if (!storage.light) {
        Cookies.set(cookieName, darkValue);
      } else {
        Cookies.set(cookieName, lightValue);
      }
      setCurrent(storage.light);
    });
  }, []);

  const reverseLight = (): void => {
    storage.setLight(!storage.light);
  };

  return {
    light: current,
    reverseLight,
  };
};
