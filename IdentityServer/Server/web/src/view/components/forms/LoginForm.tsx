// Core
import React, { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';

// Components
import { CentredDiv } from './CentredDiv';
import { StyledForm } from './StyledForm';
import { AnimatedLabel } from '../inputs/AnimatedLabel';
import { StyledInput } from '../inputs';

type FormTypes = {
  login: string;
  password: string;
}

export const LoginForm: FC = () => {
  const [formValues, setFormValues] = useState<FormTypes>({
    login: '',
    password: '',
  });
  const { register, handleSubmit, errors } = useForm<FormTypes>();

  const onSubmit = (data: FormTypes): void => {
    console.log(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CentredDiv>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

        <div>
          <p>
            {errors.login?.message}
          </p>
          <AnimatedLabel
            labelText="Login"
            isValueEntered={formValues.login.length > 0}
            input={(
              <StyledInput
                name="login"
                onChange={handleInputChange}
                ref={register({
                  required: true,
                  maxLength: 50,
                })}
              />
            )}
          />
        </div>

        <div>
          <p>
            {errors.password?.message}
          </p>
          <AnimatedLabel
            labelText="Password"
            isValueEntered={formValues.password.length > 0}
            input={(
              <StyledInput
                name="password"
                type="password"
                onChange={handleInputChange}
                ref={register({
                  required: true,
                  maxLength: 50,
                })}
              />
            )}
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
