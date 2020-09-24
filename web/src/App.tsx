// Core
import React, { FC } from 'react';

import { GlobalStyles } from './app/GlobalStyles';
import { Secure } from './app/Secure';
import { Themed } from './app/Themed';
import { Routes } from './app/Routes';

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
