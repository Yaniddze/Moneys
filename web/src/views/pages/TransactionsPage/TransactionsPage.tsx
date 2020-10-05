// Core
import React, { FC } from 'react';

// Components
import { Title } from '../styles';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useTransactions } from '../../../hooks/transactions';

type PropTypes = {
  children?: never;
}

export const TransactionsPage: FC<PropTypes> = () => {
  const { Wrapper } = usePageWrapper();
  const { state } = useTransactions();

  const loader = state.fetching && <SimpleLoader />;
  const items = !state.fetching && state.data.success && state.data.data.map((transaction) => (
    <div key={transaction.id}>
      { transaction.info.value }
    </div>
  ));

  return (
    <Wrapper>
      <div>
        { loader }
        <Title>
          Транзакции
        </Title>
        {items}
      </div>
    </Wrapper>
  );
};
