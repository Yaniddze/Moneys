// Core
import React, { FC } from 'react';

// Components
import { Title } from '../styles';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';

type PropTypes = {
  children?: never;
}

export const BillsPage: FC<PropTypes> = () => {
  const { Wrapper } = usePageWrapper();

  return (
    <Wrapper>
      <Title>
        124
      </Title>
    </Wrapper>
  );
};
