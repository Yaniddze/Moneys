// Core
import React, { FC } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Themes
import { greenTheme } from './themes';

// GlobalStyle
import { GlobalStyle } from './GlobalStyle';

// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';

export const App: FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ThemeProvider theme={greenTheme}>
      <Switch>
        <Route
          path="/auth/login"
          render={
            (props) => <LoginPage />
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
    </ThemeProvider>
  </BrowserRouter>
);
