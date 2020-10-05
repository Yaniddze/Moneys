// Core
import React, { FC } from 'react';

// Components
import { Title } from '../styles';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';

type PropTypes = {
  children?: never;
}

export const TransactionsPage: FC<PropTypes> = () => {
  const { Wrapper } = usePageWrapper();

  return (
    <Wrapper>
      <Title>
        Транзакции
      </Title>
    </Wrapper>
  );
};
