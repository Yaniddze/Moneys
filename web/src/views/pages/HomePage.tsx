import React, { FC } from 'react';

import { useBills } from '../../hooks/useBills';
import { useScreens } from '../../hooks/useScreens';

import { Screens } from '../../hooks/useScreens/types';
import { PcWrapper } from '../components/wrappers';
import { WrapperProps } from '../components/wrappers/types';

type PropTypes = {
  children?: never;
}

export const HomePage: FC<PropTypes> = () => {
  const { state } = useBills();
  const screen = useScreens();

  let Wrapper: FC<WrapperProps> = () => <div />;

  switch (screen) {
    case Screens.PC:
      Wrapper = PcWrapper;
      break;

    case Screens.Tablet:
      break;

    case Screens.Mobile:
      break;

    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = screen;
  }

  const loading = state.fetching && <div>Loading</div>;
  const errors = !state.fetching && !state.data.success && state.data.errors.map((er) => (
    <div>{er}</div>
  ));

  return (
    <Wrapper>
      <div>
        Home page
        {loading}
        {errors}
      </div>
    </Wrapper>
  );
};
