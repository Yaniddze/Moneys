import React, { FC } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Pages
import { LoginPage } from './view/pages/LoginPage';
import { RegisterPage } from './view/pages/RegisterPage';
import { Particles } from './view/components/particles';

export const App: FC = () => (
  <BrowserRouter>
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
      <Route
        path="/particles"
        component={Particles}
      />

      <Redirect to="/Auth/Login" />
    </Switch>
  </BrowserRouter>
);
