// Core
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

// Types
import { Screens, SortedScreensValues } from './types';

export const useScreens = (): Screens => {
  const [screenWidth, setScreenWidth] = useState(window.outerWidth);

  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  for (let i = 0; i < SortedScreensValues.length; i++) {
    const value = SortedScreensValues[i];

    if (screenWidth >= value) {
      return value;
    }
  }

  return Screens.PC;
};
