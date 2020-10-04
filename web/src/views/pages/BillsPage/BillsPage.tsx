// Core
import React, { FC } from 'react';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';

type PropTypes = {
  children?: never;
}

export const BillsPage: FC<PropTypes> = () => {
  const { Wrapper } = usePageWrapper();

  return (
    <Wrapper>
      <div>
        124
      </div>
    </Wrapper>
  );
};
