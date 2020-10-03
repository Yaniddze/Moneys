// Core
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from './app/GlobalStyles';
import { StructureWrapper } from './app/StructureWrapper';
import { Secure } from './app/secure';
import { Themed } from './app/themed';
import { Routes } from './app/routes';
import { Apollo } from './app/apollo';

import { Header } from './views/components/header';
import { Footer } from './views/components/footer';

import { navs } from './configuration/navbarConfig';

export const App: FC = () => (
  <Themed>
    <>
      <GlobalStyles />
      <Secure>

        <Apollo>

          <StructureWrapper>
            <BrowserRouter>
              <Header navs={navs} />
              <main>
                <Routes />
              </main>
              <Footer />
            </BrowserRouter>
          </StructureWrapper>

        </Apollo>

      </Secure>
    </>
  </Themed>
);
