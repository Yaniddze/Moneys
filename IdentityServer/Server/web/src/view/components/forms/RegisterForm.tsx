// Core
import React, {
  FC,
  useState,
  MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

// Types
import { RegisterInfo } from '../../../model/register/types';

// Components
import { StyledForm } from './StyledForm';
import { InputChangeEvent, InputWithAnimatedSpan } from '../inputs/InputWithAnimatedSpan';
import { RightWrappedDiv } from '../divs';
import { StyledLink } from '../links';
import { SquareButtonWithShadow, GoogleButton } from '../buttons';
import { ErrorDiv } from '../ErrorDiv';

type FormTypes = {
  login: string;
  password: string;
  confirm: string;
  email: string;
}

type PropTypes = {
  children?: never;
  handleSubmit: (e: RegisterInfo) => void;
  error: string;
  loginFormPath: string;
  handleGoogleClick: () => void;
}
export const RegisterForm: FC<PropTypes> = ({
  handleSubmit,
  error,
  loginFormPath,
  handleGoogleClick,
}: PropTypes) => {
  const [formValues, setFormValues] = useState<FormTypes>({
    login: '',
    password: '',
    confirm: '',
    email: '',
  });

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();

    handleSubmit({
      username: formValues.login,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      email: formValues.email,
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
        labelText="Login"
        inputName="login"
        inputType="text"
        onChange={handleInputChange}
      />

      <InputWithAnimatedSpan
        labelText="Email"
        inputName="email"
        inputType="email"
        onChange={handleInputChange}
      />

      <InputWithAnimatedSpan
        labelText="Password"
        inputName="password"
        inputType="password"
        onChange={handleInputChange}
      />

      <InputWithAnimatedSpan
        labelText="Confirm"
        inputName="confirm"
        inputType="password"
        onChange={handleInputChange}
      />

      <div style={{ display: 'flex' }}>
        <SquareButtonWithShadow
          onClick={handleClick}
          type="submit"
        >
          Sign on
        </SquareButtonWithShadow>
      </div>

      <RightWrappedDiv>
        <Link
          to={loginFormPath}
        >
          <StyledLink>
            Sign in
          </StyledLink>
        </Link>
      </RightWrappedDiv>

      <div>
        <GoogleButton
          text="Sign in"
          onClick={handleGoogleClick}
        />
      </div>

    </StyledForm>
  );
};
