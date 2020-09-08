// Core
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import {
  StyledLink,
} from '../components/links';

type PropTypes = {
  children?: never;
}

export const RegisterPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Registration';
  });

  return (
    <div>
      Register Page
      <Link to="/auth/login">
        <StyledLink>
          Sign in
        </StyledLink>
      </Link>
    </div>
  );
};
