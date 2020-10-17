// Core
import { useState } from 'react';
import Header from 'next/head';
import { Button } from '@material-ui/core';

// Components
import { Title } from '../../components/Title';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../../hooks/usePageWrapper';
import { useTransactions } from '../../hooks/transactions';
import { useBills } from '../../hooks/bills';
import { useTransactionTypes } from '../../hooks/useTransactionTypes';

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

  const loader = state.fetching
    && bills.state.fetching
    && transactionTypes.state.fetching
    && <SimpleLoader />;

  const additionBtn = !loader && (
    <div style={{ display: 'flex' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleModalOpen}
      >
        +
      </Button>
    </div>
  );

  const items = !state.fetching && state.data.success && state.data.data.map((transaction) => (
    <div key={transaction.id}>
      { transaction.info.value }
    </div>
  ));

  return (
    <Wrapper>
      <div>

        <Header>
          <title>
            Transactions
          </title>
        </Header>

        { loader }
        <Title>
          Транзакции
        </Title>
        {items}
        {additionBtn}
      </div>
    </Wrapper>
  );
}
