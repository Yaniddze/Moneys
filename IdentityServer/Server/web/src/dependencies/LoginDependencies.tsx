// Core
import React, { FC, ReactElement } from 'react';

// Login Units
import { LoginUnit } from '../model/login/types';
import { DefaultLoginUnit } from '../model/login/DefaultLoginUnit';
import { AxiosLoginUnit } from '../model/login/AxiosLoginUnit';

export const LoginUnitContext = React.createContext<LoginUnit>(new DefaultLoginUnit());

type PropTypes = {
  children: ReactElement;
}

export const LoginDependencies: FC<PropTypes> = ({ children }: PropTypes) => (
  <LoginUnitContext.Provider value={new AxiosLoginUnit()}>
    {children}
  </LoginUnitContext.Provider>
);
