// Core
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useState,
} from 'react';
import { createGlobalStyle } from 'styled-components';
import { useForm } from 'react-hook-form';

// Components
import { CentredDiv } from './CentredDiv';
import { StyledInput } from '../inputs';
import { StyledForm } from './StyledForm';

type FormTypes = {
  login: string;
  password: string;
}

export const LoginForm: FC = () => {
  const [loginInput, setLoginInput] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormTypes>();

  const LabelStateStyles = createGlobalStyle`
    .form-label__to-up {
      margin-top: -10px;
      font-size: 13px;
    }
    
    .form-label__to-down {
      margin-top: 20px;
    }
    
    .form-label {
      position: absolute;
      left: 0;
      margin-left: 30px;
      transition: .5s all ease
    }
  `;

  const onSubmit = (data: FormTypes): void => {
    console.log(data);
  };

  const handleLoginChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setLoginInput(text.length > 0);
  };

  return (
    <CentredDiv>
      <LabelStateStyles />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <div>
          <p>
            {errors.login && errors.login.message}
          </p>
          <div>
            <StyledInput
              name="login"
              ref={register({
                required: true,
                maxLength: 50,
              })}
              onChange={handleLoginChange}
            />
            <span
              className={`${loginInput ? 'form-label__to-up' : 'form-label__to-down'} form-label`}
            >
              Login
            </span>
          </div>
        </div>

        <div>
          <p>
            {errors.password && errors.password.message}
          </p>
          <div>
            Password
          </div>
          <StyledInput
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
