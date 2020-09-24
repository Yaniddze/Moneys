// Core
import React, { FC } from 'react';

import { GlobalStyles } from './app/GlobalStyles';
import { Secure } from './app/secure';
import { Themed } from './app/themed';
import { Routes } from './app/routes';

import { Header } from './views/components/header';

export const App: FC = () => (
  <Themed>
    <>
      <GlobalStyles />
      <Secure>
        <>
          <Header />
          <Routes />
        </>
      </Secure>
    </>
  </Themed>
);
