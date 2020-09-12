// Core
import React, {
  FC,
  useState,
  MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

// Components
import { RightWrappedDiv } from '../divs';
import { ErrorDiv } from '../ErrorDiv';
import { StyledForm } from './StyledForm';
import { StyledLink } from '../links';
import {
  SquareButtonWithShadow,
  GoogleButton,
} from '../buttons';
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
  registerFormPath: string;
  handleGoogleClick: () => void;
}

export const LoginForm: FC<PropTypes> = ({
  handleSubmit,
  error,
  registerFormPath,
  handleGoogleClick,
}: PropTypes) => {
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
        inputType="text"
        inputName="login"
        labelText="Login"
        onChange={handleInputChange}
      />

      <InputWithAnimatedSpan
        inputType="password"
        inputName="password"
        labelText="Password"
        onChange={handleInputChange}
      />

      <div style={{ display: 'flex' }}>
        <SquareButtonWithShadow onClick={handleClick} type="submit">
          Sign in
        </SquareButtonWithShadow>
      </div>

      <RightWrappedDiv>
        <Link
          to={registerFormPath}
        >
          <StyledLink>
            Sign on
          </StyledLink>
        </Link>
      </RightWrappedDiv>

      <div>
        <GoogleButton
          onClick={handleGoogleClick}
          text="Sign in"
        />
      </div>
    </StyledForm>
  );
};
