// Core
import React, { ReactElement, useState, MouseEvent } from 'react';

// Hooks
import { useBillAddition } from '../../../hooks/bills/useBillAddition';

// Components
import { ModalContainer } from '../../components/modals';
import { InputWithAnimatedSpan } from '../../components/inputs';
import { InputChangeEvent } from '../../components/inputs/InputWithAnimatedSpan';
import { SquareButtonWithShadow } from '../../components/buttons';
import { SimpleLoader } from '../../components/loaders';

// Types
type ReturnType = {
  modal: ReactElement | false;
  open: () => void;
}

type FormValue = {
  title: string;
}

export const useAdditionForm = (): ReturnType => {
  const [modalOpened, setModalOpened] = useState(false);
  const [formValues, setFormValues] = useState<FormValue>({
    title: '',
  });

  const { state, fetch } = useBillAddition();

  const handleChange = (e: InputChangeEvent): void => {
    setFormValues((old) => ({
      ...old,
      [e.name]: e.newText,
    }));
  };

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (state.fetching) return;

    const { title } = formValues;

    if (title.length > 3) {
      fetch(title);
    }
  };

  let errorMessage = '';

  if (!state.fetching && state.answer.errors.length > 0) {
    state.answer.errors.forEach((item) => {
      errorMessage += `${item}\n`;
    });
  }

  const errors = errorMessage.length > 0 && (
    <p>
      { errorMessage }
    </p>
  );

  const loader = state.fetching && <SimpleLoader />;

  const modal = modalOpened && (
    <ModalContainer
      handleClose={(): void => {
        setModalOpened(false);
      }}
      hidden={!modalOpened}
    >
      <form>
        { loader }
        { errors }
        <InputWithAnimatedSpan
          labelText="Title"
          inputName="title"
          inputType="text"
          onChange={handleChange}
        />

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

  const open = (): void => {
    setModalOpened(true);
  };

  return {
    modal,
    open,
  };
};
