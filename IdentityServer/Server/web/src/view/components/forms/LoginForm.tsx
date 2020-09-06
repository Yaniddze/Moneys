// Core
import React, { FC } from 'react';

// Components
import { CentredDiv } from './CentredDiv';
import { LoginInput } from '../inputs';
import { StyledForm } from './StyledForm';

export const LoginForm: FC = () => (
  <CentredDiv>
    <StyledForm>

      <div>
        <div>
          Login
        </div>
        <LoginInput />
      </div>

      <div>
        <div>
          Password
        </div>
        <LoginInput />
      </div>

      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </StyledForm>
  </CentredDiv>
);
