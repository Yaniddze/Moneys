// Core
import React, { FC } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// GlobalStyle
import { GlobalStyle } from './GlobalStyle';

// Components
import { ThemedApp } from './ThemedApp';
import { Particles } from './view/components/particles';

// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';

// Dependencies
import { LoginDependencies } from './dependencies/LoginDependencies';
import { RegisterDependencies } from './dependencies/RegisterDependencies';

export const App: FC = () => (
  <BrowserRouter>
    <GlobalStyle />

    <ThemedApp>
      <div>
        <Particles />

        <Switch>

          <Route
            path="/auth/login"
            render={
              (props) => (
                <LoginDependencies>
                  <LoginPage />
                </LoginDependencies>
              )
            }
          />

          <Route
            path="/auth/register"
            render={
              (props) => (
                <RegisterDependencies>
                  <RegisterPage />
                </RegisterDependencies>
              )
            }
          />

          <Redirect to="/auth/login" />

        </Switch>
      </div>
    </ThemedApp>

  </BrowserRouter>
);
