// Core
import { FC, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { 
  Dialog,
  Button,
} from '@material-ui/core';

// Hooks
import { useTransactionAddition } from '../../../hooks/transactions';
import { useBills } from '../../../hooks/bills';
import { useTransactionTypes } from '../../../hooks/useTransactionTypes';

// Components
import { Loader } from '../../Loader';
import { Form, FormTypes } from './Form';

import { Bill, TransactionType } from '../../../domain/types';

const ButtonsHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;

  > span {
    height: 30px;
    width: 1px;
    background: black;
  }
`;

type PropTypes = {
  children?: never;
  shown: boolean;
  onClose: () => void;
}

export const AddTransaction: FC<PropTypes> = (
  { shown, onClose }: PropTypes,
) => {
  const [spending, setSpending] = useState(false);
  const { state, fetch } = useTransactionAddition();
  const bills = useBills();
  const transactionTypes = useTransactionTypes();

  const loading = state.fetching 
  || bills.state.fetching
  || transactionTypes.state.fetching;

  const onSubmit = (values: FormTypes): void => {
    fetch(
      values.billId,
      values.date,
      values.description || '',
      values.typeId,
      Number(values.value),
    );
  };

  let propBills: Bill[] = [];

  if (!loading) {
    propBills = bills.state.data.data;
  }

  let propTransactionTypes: TransactionType[] = [];

  if (!loading) {
    propTransactionTypes = transactionTypes.state.data.types;
  }

  const additionTypes = propTransactionTypes.filter((type) => !type.spending);
  const spendingTypes = propTransactionTypes.filter((type) => type.spending);

  const handleSpendingClick = (e: MouseEvent) => {
    e.preventDefault();

    setSpending((old) => !old);
  };

  return (
    <Dialog
      open={shown}
      onClose={onClose}
    >
      <ButtonsHolder>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSpendingClick}
          disabled={!spending}
        >
          Доход
        </Button>

        <span />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSpendingClick}
          disabled={spending}
        >
          Расход
        </Button>
      </ButtonsHolder>
      <Loader
        visible={loading}
      />

      <Form 
        onSubmit={onSubmit}
        bills={propBills}
        types={spending ? spendingTypes : additionTypes}
      />
      
    </Dialog>
  );
};
