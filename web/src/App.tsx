// Core
import React, { FC } from 'react';

import { GlobalStyles } from './app/GlobalStyles';
import { Secure } from './app/secure';
import { Themed } from './app/themed';
import { Routes } from './app/routes';

import { Header } from './views/components/header';
import { Footer } from './views/components/footer';

export const App: FC = () => (
  <Themed>
    <>
      <GlobalStyles />
      <Secure>
        <>
          <Header />
          <Routes />
          <Footer />
        </>
      </Secure>
    </>
  </Themed>
);
