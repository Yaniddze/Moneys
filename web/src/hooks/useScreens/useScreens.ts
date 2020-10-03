// Core
import { useScreenStorage } from './useScreenStorage';

// Types
import { Screens, SortedScreensValues } from './types';

export const useScreens = (): Screens => {
  const { width } = useScreenStorage();

  for (let i = 0; i < SortedScreensValues.length; i++) {
    const value = SortedScreensValues[i];

    if (width >= value) {
      return value;
    }
  }

  return Screens.PC;
};
