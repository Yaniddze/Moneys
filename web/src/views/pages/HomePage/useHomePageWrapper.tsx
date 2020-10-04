import React, { FC } from 'react';

import { useScreens } from '../../../hooks/useScreens';
import { WrapperProps } from '../../components/wrappers/types';
import { Screens } from '../../../hooks/useScreens/types';
import { MobileWrapper, PcWrapper, TabletWrapper } from '../../components/wrappers';

type ReturnType = {
  Wrapper: FC<WrapperProps>;
}

export const useHomePageWrapper = (): ReturnType => {
  const screen = useScreens();

  let Wrapper: FC<WrapperProps> = () => <div />;

  switch (screen) {
    case Screens.PC:
      Wrapper = PcWrapper;
      break;

    case Screens.Tablet:
      Wrapper = TabletWrapper;
      break;

    case Screens.Mobile:
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
