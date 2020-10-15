import { FC } from 'react';

import { useScreens } from './useScreens';
import { WrapperProps } from '../components/wrappers/types';
import { MinWidths } from './useScreens/types';
import { MobileWrapper, PcWrapper, TabletWrapper } from '../components/wrappers';

type ReturnType = {
  Wrapper: FC<WrapperProps>;
}

export const usePageWrapper = (): ReturnType => {
  const screen = useScreens();

  let Wrapper: FC<WrapperProps> = () => <div />;

  switch (screen) {
    case MinWidths.PC:
      Wrapper = PcWrapper;
      break;

    case MinWidths.Tablet:
      Wrapper = TabletWrapper;
      break;

    case MinWidths.Mobile:
      Wrapper = MobileWrapper;
      break;

    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = screen;
  }

  return {
    Wrapper,
  };
};
