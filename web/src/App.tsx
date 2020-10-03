// Core
import React, { FC } from 'react';

import { GlobalStyles } from './app/GlobalStyles';
import { StructureWrapper } from './app/StructureWrapper';
import { Secure } from './app/secure';
import { Themed } from './app/themed';
import { Routes } from './app/routes';
import { Apollo } from './app/apollo';

import { Header } from './views/components/header';
import { Footer } from './views/components/footer';

export const App: FC = () => (
  <Themed>
    <>
      <GlobalStyles />
      <Secure>

        <Apollo>

          <StructureWrapper>
            <Header />
            <main>
              <Routes />
            </main>
            <Footer />
          </StructureWrapper>

        </Apollo>

      </Secure>
    </>
  </Themed>
);
