// Core
import { 
  FC, 
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { 
  Dialog,
  TextField,
  Button,
} from '@material-ui/core';

// Hooks
import { useTransactionAddition } from '../../../hooks/transactions';
import { useBills } from '../../../hooks/bills';
import { useTransactionTypes } from '../../../hooks/useTransactionTypes';

// Components
import { Loader } from '../../Loader';
import { Select, Node } from '../../Select';

const StyledForm = styled.form`
  padding: 10px;

  > div {
    margin: 10px 0;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  width: 100%;

  button {
    margin-left: auto;
  }
`;

const DateFormatter = styled.div`
  > * {
    width: 100%;
  }
`;

type FormTypes = {
  billId: string;
  date: Date;
  description: string;
  typeId: string;
  value: string;
}

type PropTypes = {
  children?: never;
  shown: boolean;
  onClose: () => void;
}

export const AddTransactionForm: FC<PropTypes> = (
  { shown, onClose }: PropTypes,
) => {
  const { state, fetch } = useTransactionAddition();
  const bills = useBills();
  const transactionTypes = useTransactionTypes();

  const loading = state.fetching 
  || bills.state.fetching
  || transactionTypes.state.fetching;

  const {
    register, handleSubmit, errors, setValue,
  } = useForm<FormTypes>();

  useEffect(() => {
    register('billId', {
      required: {
        value: true,
        message: 'Обязательно',
      },
    });

    register('date', {
      required: {
        value: true,
        message: 'Обязательно',
      },
    });

    register('description', {
      minLength: {
        value: 3,
        message: 'Минимум 3 символа',
      },
      maxLength: {
        value: 50,
        message: 'Максимум 50 символов',
      },
    });

    register('typeId', {
      required: {
        value: true,
        message: 'Обязательно',
      },
    });
    
    register('value', {
      required: {
        value: true,
        message: 'Обязательно',
      },
      validate: (value) => {
        const parsed = Number(value);

        return !Number.isNaN(parsed);
      },
    });
  }, [register]);

  const onSubmit = (values: FormTypes): void => {
    fetch(
      values.billId,
      values.date,
      values.description || '',
      values.typeId,
      Number(values.value),
    );
  };

  const mappedBills = bills.state.data.data
    .map<Node>((bill) => ({
      title: bill.title,
      value: bill.id,
    }));

  const mappedTransactionTypes = transactionTypes.state.data.types
    .map<Node>((type) => ({
      title: type.title,
      value: type.id,
    }));

  return (
    <Dialog
      open={shown}
      onClose={onClose}
    >
      <Loader
        visible={loading}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <div>
          <Select
            label="Счёт"
            nodes={mappedBills}
            onChange={(value: string) => { 
              setValue('billId', value);
            }}
            error={!!errors.billId}
          />
        </div>

        <DateFormatter>
          <TextField
            variant="outlined"
            color="primary"
            name="date"
            type="date"
            label="Дата"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => { setValue('date', e.target.value); }}
            error={!!errors.date}
            helperText={!!errors.date && errors.date.message}
          />
        </DateFormatter>

        <div>
          <TextField
            variant="outlined"
            color="primary"
            multiline
            label="Описание"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => { setValue('description', e.target.value); }}
            error={!!errors.description}
            helperText={!!errors.description && errors.description.message}
          />
        </div>

        <div>
          <Select
            label="Тип"
            nodes={mappedTransactionTypes}
            onChange={(value: string) => { 
              setValue('typeId', value);
            }}
            error={!!errors.typeId}
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            color="primary"
            multiline
            label="Значение"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => { setValue('value', e.target.value); }}
            error={!!errors.value}
            helperText={!!errors.value && errors.value.message}
          />
        </div>
        
        <RightWrapper>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            disabled={state.fetching}
          >
            Add
          </Button>
        </RightWrapper>
        
      </StyledForm>
    </Dialog>
  );
};
