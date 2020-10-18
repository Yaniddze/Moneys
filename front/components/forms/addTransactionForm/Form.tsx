import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  TextField,
} from '@material-ui/core';

import { Select, Node } from '../../Select';

import { 
  TransactionType,
  Bill,
} from '../../../domain/types';

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

export type FormTypes = {
  billId: string;
  date: Date;
  description: string;
  typeId: string;
  value: string;
}

type PropTypes = {
  children?: never;
  types: TransactionType[];
  bills: Bill[];
  onSubmit: (values: FormTypes) => void;
}

export const Form: FC<PropTypes> = (
  { types, bills, onSubmit }: PropTypes,
) => {
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

        return !Number.isNaN(parsed) && parsed > 0;
      },
    });
  }, [register]);

  const mappedBills = bills
    .map<Node>((bill) => ({
      title: bill.title,
      value: bill.id,
    }));

  const mappedTransactionTypes = types
    .map<Node>((type) => ({
      title: type.title,
      value: type.id,
    }));

  return (
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
        >
          Add
        </Button>
      </RightWrapper>
        
    </StyledForm>
  );
};
