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

// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';

// Dependencies
import { LoginDependencies } from './dependencies/LoginDependencies';

export const App: FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ThemedApp>
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
              (props) => <RegisterPage />
            }
        />

        <Redirect to="/Auth/Login" />
      </Switch>
    </ThemedApp>
  </BrowserRouter>
);
