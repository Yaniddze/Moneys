// Core
import React, { FC } from 'react';

import { GlobalStyles } from './app/GlobalStyles';
import { Secure } from './app/secure';
import { Themed } from './app/themed';
import { Routes } from './app/routes';

export const App: FC = () => (
  <Themed>
    <>
      <GlobalStyles />
      <Secure>
        <Routes />
      </Secure>
    </>
  </Themed>
);
