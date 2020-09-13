// Core
import React, { FC, ReactElement } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
// GlobalStyle
import { GlobalStyle } from './GlobalStyle';
// Components
import { ThemedApp } from './ThemedApp';
import { Particles } from './view/components/particles';
// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';
// Hooks
import { Screens, useScreens } from './hooks/useScreens';
// Dependencies
import { LoginDependencies } from './dependencies/LoginDependencies';
import { RegisterDependencies } from './dependencies/RegisterDependencies';

export const App: FC = () => {
  const screen = useScreens();

  let particles: ReactElement | undefined;

  switch (screen) {
    case Screens.Mobile:
      break;

    case Screens.Desktop:
      particles = <Particles />;
      break;

    default:
      throw new Error('Unhandled screen error');
  }

  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemedApp>
        <div>
          {particles}

          <Switch>

            <Route
              path="/auth/login"
              render={
                (props): ReactElement => (
                  <LoginDependencies>
                    <LoginPage
                      screen={screen}
                      searchParams={props?.location.search}
                    />
                  </LoginDependencies>
                )
              }
            />

            <Route
              path="/auth/register"
              render={
                (props): ReactElement => (
                  <RegisterDependencies>
                    <RegisterPage
                      screen={screen}
                      searchParams={props?.location.search}
                    />
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
};
