// Core
import { useState } from 'react';
import { Button } from '@material-ui/core';
import Header from 'next/head';

// Components
import { Title } from '../components/Title';
import { Loader } from '../components/Loader';
import { AddTransactionForm } from '../components/forms';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useTransactions } from '../hooks/transactions';
import { useBills } from '../hooks/bills';
import { useTransactionTypes } from '../hooks/useTransactionTypes';

export default function Transactions(): JSX.Element {
  const [modalShown, setModalShown] = useState(false);
  const { Wrapper } = usePageWrapper();
  const { state } = useTransactions();
  const bills = useBills();
  const transactionTypes = useTransactionTypes();

  const handleModalClose = (): void => {
    setModalShown(false);
  };

  const handleModalOpen = (): void => {
    setModalShown(true);
  };

  const loading = state.fetching
    && bills.state.fetching
    && transactionTypes.state.fetching;

  const items = !state.fetching && state.data.success && state.data.data.map((transaction) => (
    <div key={transaction.id}>
      { transaction.info.value }
    </div>
  ));

  return (
    <Wrapper>
      <div>
        <AddTransactionForm
          shown={modalShown}
          onClose={handleModalClose}
        />

        <Loader
          visible={loading}
        />

        <Header>
          <title>
            Transactions
          </title>
        </Header>

        { loading }
        <Title>
          Транзакции
        </Title>
        {items}
        
        <div style={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalOpen}
            disabled={loading}
          >
            +
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
