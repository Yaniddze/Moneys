// Core
import { useEffect, useState } from 'react';
import { observable, autorun } from 'mobx';
import Cookies from 'js-cookie';

export type ThemeStorage = {
  light: boolean;
}

type ReturnType = {
  light: boolean;
  reverseLight: () => void;
}

export const lightValue = 'light';
export const darkValue = 'dark';
export const cookieName = 'Moneys.Theme';

const storage = observable<ThemeStorage>({
  light: Cookies.get(cookieName) === lightValue,
});

export const useThemeStorage = (): ReturnType => {
  const [current, setCurrent] = useState(storage.light);

  useEffect(() => autorun(() => {
    if (!storage.light) {
      Cookies.set(cookieName, darkValue);
    } else {
      Cookies.set(cookieName, lightValue);
    }
    setCurrent(storage.light);
  }), []);

  const reverseLight = (): void => {
    storage.light = !storage.light;
  };

  return {
    light: current,
    reverseLight,
  };
};
