// Core
import { FC, useState } from 'react';

// Components
import { Title } from '../../components/Title';
import { SimpleLoader } from '../../components/loaders';
import { SquareButtonWithShadow } from '../../components/buttons';
import { AdditionModal } from './AdditionModal';

// Hooks
import { usePageWrapper } from '../../hooks/usePageWrapper';
import { useTransactions } from '../../hooks/transactions';
import { useBills } from '../../hooks/bills';
import { useTransactionTypes } from '../../hooks/useTransactionTypes';

type PropTypes = {
  children?: never;
}

export const TransactionsPage: FC<PropTypes> = () => {
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

  const modal = modalShown && !loader && (
    <AdditionModal
      transactionTypes={transactionTypes.state.data.types}
      bills={bills.state.data.data}
      handleClose={handleModalClose}
    />
  );

  const additionBtn = !loader && (
    <div style={{ display: 'flex' }}>
      <SquareButtonWithShadow onClick={handleModalOpen}>
        +
      </SquareButtonWithShadow>
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
        { modal }
        { loader }
        <Title>
          Транзакции
        </Title>
        {items}
        {additionBtn}
      </div>
    </Wrapper>
  );
};
