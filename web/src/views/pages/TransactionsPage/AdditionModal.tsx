// Core
import React, { FC, useState, MouseEvent } from 'react';

// Components
import { ModalContainer } from '../../components/modals';
import { SquareButtonWithShadow } from '../../components/buttons';
import { InputWithAnimatedSpan } from '../../components/inputs';

// Hooks
import { useTransactionAddition } from '../../../hooks/transactions';

// Types
import { TransactionType, Bill } from '../../../domain/types';
import { InputChangeEvent } from '../../components/inputs/InputWithAnimatedSpan';

type PropTypes = {
  children?: never;
  transactionTypes: TransactionType[];
  bills: Bill[];
  handleClose: () => void;
}

type FormValues = {

}

export const AdditionModal: FC<PropTypes> = (
  { transactionTypes, handleClose, bills }: PropTypes,
) => {
  const [formValues, setFormValues] = useState<FormValues>({

  });
  const { state, fetch } = useTransactionAddition();

  const handleChange = (e: InputChangeEvent): void => {
    setFormValues((old) => ({
      ...old,
      [e.name]: e.newText,
    }));
  };

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const types = transactionTypes.map((type) => (
    <option key={type.id} value={type.id}>
      {type.title}
    </option>
  ));

  const billOptions = bills.map((bill) => (
    <option key={bill.id} value={bill.title}>
      { bill.title }
    </option>
  ));

  return (
    <ModalContainer handleClose={handleClose}>
      <form>
        <InputWithAnimatedSpan
          labelText="Значение"
          inputName="value"
          inputType="number"
          onChange={handleChange}
        />
        <select>
          { types }
        </select>
        <select>
          { billOptions }
        </select>
        <div style={{ display: 'flex' }}>
          <SquareButtonWithShadow
            onClick={handleClick}
          >
            Добавить
          </SquareButtonWithShadow>
        </div>
      </form>
    </ModalContainer>
  );
};
