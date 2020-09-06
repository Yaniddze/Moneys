// Core
import React, { FC, useEffect } from 'react';

import { LoginForm } from '../components/forms';

import { Particles } from '../components/particles';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Login';
  });

  return (
    <div>
      <Particles />
      <LoginForm />
    </div>
  );
};
