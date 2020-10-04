import React, { FC } from 'react';

import { useBills } from '../../../hooks/useBills';
import { useHomePageWrapper } from './useHomePageWrapper';

type PropTypes = {
  children?: never;
}

export const HomePage: FC<PropTypes> = () => {
  const { state } = useBills();
  const { Wrapper } = useHomePageWrapper();

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