// Core
import React, { FC, useEffect } from 'react';

// Form
import { LoginForm } from '../components/forms';

import { Particles } from '../components/particles';

// Login units
import { LoginUnit } from '../../model/login/types';
import { AxiosLoginUnit } from '../../model/login/AxiosLoginUnit';
import { DefaultLoginUnit } from '../../model/login/DefaultLoginUnit';

type PropTypes = {
  children?: never;
}

export const LoginUnitContext = React.createContext<LoginUnit>(new DefaultLoginUnit());

export const LoginPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Login';
  });

  return (
    <div>
      <LoginUnitContext.Provider value={new AxiosLoginUnit()}>
        <Particles />
        <LoginForm />
      </LoginUnitContext.Provider>
    </div>
  );
};
