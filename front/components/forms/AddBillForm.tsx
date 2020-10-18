// Core
import { FC, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { 
  Dialog,
  TextField,
  Button,
} from '@material-ui/core';

// Hooks
import { useBillAddition } from '../../hooks/bills';

// Components
import { Loader } from '../Loader';

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

type FormTypes = {
  title: string;
}

type PropTypes = {
  children?: never;
  shown: boolean;
  onClose: () => void;
}

export const AddBillForm: FC<PropTypes> = (
  { shown, onClose }: PropTypes,
) => {
  const { state, fetch } = useBillAddition();

  const {
    register, handleSubmit, errors, setValue,
  } = useForm<FormTypes>();

  useEffect(() => {
    register('title', {
      required: {
        value: true,
        message: 'Обязательно',
      },
    });
  }, [register]);

  const onSubmit = (values: FormTypes): void => {
    fetch(values.title);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (value !== null && name !== null) {
      setValue(name, value);
    }
  };

  return (
    <Dialog
      open={shown}
      onClose={onClose}
    >
      <Loader
        visible={state.fetching}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <div>
          <TextField
            variant="outlined"
            color="primary"
            label="Title"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            name="title"
            error={!!errors.title}
            helperText={!!errors.title && errors.title.message}
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
