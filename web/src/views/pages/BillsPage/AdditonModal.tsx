// Core
import React, {
  FC,
  useState,
  MouseEvent,
} from 'react';

// Hooks
import { useBillAddition } from '../../../hooks/bills/useBillAddition';

// Components
import { ModalContainer } from '../../components/modals';
import { InputWithAnimatedSpan } from '../../components/inputs';
import { InputChangeEvent } from '../../components/inputs/InputWithAnimatedSpan';
import { SquareButtonWithShadow } from '../../components/buttons';
import { SimpleLoader } from '../../components/loaders';

type FormValue = {
  title: string;
}

type PropTypes = {
  children?: never;
  handleClose: () => void;
  hidden: boolean;
}

export const AdditionModal: FC<PropTypes> = (
  { handleClose, hidden }: PropTypes,
) => {
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

  const successMessage = !state.fetching && state.answer.success && (
    <p>
      Добавлен
    </p>
  );

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

  return (
    <ModalContainer
      hidden={hidden}
      handleClose={handleClose}
    >
      <form>
        { loader }
        { errors }
        { successMessage }
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
};
