// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

// Components
import { CentredDiv } from './CentredDiv';
import { LoginInput } from '../inputs';
import { StyledForm } from './StyledForm';

type FormTypes = {
  login: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { register, handleSubmit, errors } = useForm<FormTypes>();

  const onSubmit = (data: FormTypes): void => {
    console.log(data);
  };

  return (
    <CentredDiv>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <div>
          <p>
            {errors.login && errors.login.message}
          </p>
          <div>
            Login
          </div>
          <LoginInput
            name="login"
            ref={register({
              required: true,
              maxLength: 50,
            })}
          />
        </div>

        <div>
          <p>
            {errors.password && errors.password.message}
          </p>
          <div>
            Password
          </div>
          <LoginInput
            name="password"
            type="password"
            ref={register({
              required: true,
              maxLength: 50,
            })}
          />
        </div>

        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </StyledForm>
    </CentredDiv>
  );
};
