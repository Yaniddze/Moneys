// Core
import React, { FC } from 'react';
import styled from 'styled-components';

// Components
import { CentredDiv } from './centredDiv';
import { LoginInput } from '../inputs';

const Form = styled.form`
  padding: 10px;
  border: 1px solid white;
  color: black;
  background: white;
  border-radius: 10px;
`;

export const LoginForm: FC = () => (
  <CentredDiv>
    <Form>

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
        <button>
          Submit
        </button>
      </div>
    </Form>
  </CentredDiv>
);
