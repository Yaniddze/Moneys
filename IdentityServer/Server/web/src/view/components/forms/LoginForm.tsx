// Core
import React, {
  FC,
  useState,
  MouseEvent,
} from 'react';

// Components
import { RightWrappedDiv } from '../divs';
import { ErrorDiv } from '../ErrorDiv';
import { StyledForm } from './StyledForm';
import { SquareButton } from '../buttons';
import {
  InputWithAnimatedSpan,
  InputChangeEvent,
} from '../inputs/InputWithAnimatedSpan';

// Types
import { LoginInfo } from '../../../model/login/types';

type FormTypes = {
  login: string;
  password: string;
}

type PropTypes = {
  children?: never;
  handleSubmit: (e: LoginInfo) => void;
  error: string;
}

export const LoginForm: FC<PropTypes> = ({ handleSubmit, error }: PropTypes) => {
  const [formValues, setFormValues] = useState<FormTypes>({
    login: '',
    password: '',
  });

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();

    handleSubmit({
      username: formValues.login,
      password: formValues.password,
    });
  };

  const handleInputChange = (e: InputChangeEvent): void => {
    setFormValues({
      ...formValues,
      [e.name]: e.newText,
    });
  };

  return (
    <StyledForm>

      <ErrorDiv>
        {error}
      </ErrorDiv>

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

      <RightWrappedDiv>
        <SquareButton onClick={handleClick} type="submit">
          Submit
        </SquareButton>
      </RightWrappedDiv>

    </StyledForm>
  );
};
