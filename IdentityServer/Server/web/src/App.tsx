// Core
import React, { FC, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled, {
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';

// Themes
import {
  greenTheme,
  darkTheme,
} from './themes';

// GlobalStyle
import { GlobalStyle } from './GlobalStyle';

// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';

const SwitchInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px;
  z-index:10;
`;

export const App: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(greenTheme);

  const handleChange = (): void => {
    setCurrentTheme((current) => {
      if (current === greenTheme) {
        return darkTheme;
      }
      return greenTheme;
    });
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <SwitchInput type="checkbox" onChange={handleChange} />
      <ThemeProvider theme={currentTheme}>
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
};
