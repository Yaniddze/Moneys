// Core
import { useScreenStorage } from '../storage/useScreenStorage';

// Types
import { MinWidths, SortedScreensValues } from './types';

export const useScreens = (): MinWidths => {
  const { width } = useScreenStorage();

  for (let i = 0; i < SortedScreensValues.length; i++) {
    const value = SortedScreensValues[i];

    if (width >= value) {
      return value;
    }
  }

  return MinWidths.PC;
};
