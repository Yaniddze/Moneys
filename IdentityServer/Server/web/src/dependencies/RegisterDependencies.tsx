// Core
import React, { FC, ReactElement } from 'react';

// Register units
import { RegisterUnit } from '../model/register/types';
import { DefaultRegisterUnit } from '../model/register/DefaultRegisterUnit';
import { AxiosRegisterUnit } from '../model/register/AxiosRegisterUnit';

export const RegisterUnitContext = React.createContext<RegisterUnit>(new DefaultRegisterUnit());

type PropTypes = {
  children: ReactElement;
}

export const RegisterDependencies: FC<PropTypes> = ({ children }: PropTypes) => (
  <RegisterUnitContext.Provider value={new AxiosRegisterUnit()}>
    {children}
  </RegisterUnitContext.Provider>
);
