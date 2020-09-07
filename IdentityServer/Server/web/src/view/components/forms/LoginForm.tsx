// Core
import React, {
  FC,
  useState,
  MouseEvent,
} from 'react';

// Components
import { CentredDiv } from './CentredDiv';
import { StyledForm } from './StyledForm';
import {
  InputWithAnimatedSpan,
  InputChangeEvent,
} from '../inputs/InputWithAnimatedSpan';

type FormTypes = {
  login: string;
  password: string;
}

export const LoginForm: FC = () => {
  const [formValues, setFormValues] = useState<FormTypes>({
    login: '',
    password: '',
  });

  const handleSubmit = (e: MouseEvent): void => {
    e.preventDefault();

    console.log(formValues);
  };

  const handleInputChange = (e: InputChangeEvent): void => {
    setFormValues({
      ...formValues,
      [e.name]: e.newText,
    });
  };

  return (
    <CentredDiv>
      <StyledForm>

        <InputWithAnimatedSpan
          inputName="login"
          labelText="Login"
          onChange={handleInputChange}
        />

        <InputWithAnimatedSpan
          inputName="password"
          labelText="Password"
          onChange={handleInputChange}
        />

        <div>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>

      </StyledForm>
    </CentredDiv>
  );
};
