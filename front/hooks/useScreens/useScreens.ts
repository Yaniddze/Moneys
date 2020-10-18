// Core
import { useMediaQuery } from '@material-ui/core';

// Types
import { MinWidths } from './types';

export const useScreens = (): MinWidths => {
  const mobile = useMediaQuery(`(min-width:${MinWidths.Mobile}px)`);
  const tablet = useMediaQuery(`(min-width:${MinWidths.Tablet}px)`);
  const pc = useMediaQuery(`(min-width:${MinWidths.PC}px)`);

  if (pc) return MinWidths.PC;
  if (tablet) return MinWidths.Tablet;
  if (mobile) return MinWidths.Mobile;

  return MinWidths.Tablet;
};
