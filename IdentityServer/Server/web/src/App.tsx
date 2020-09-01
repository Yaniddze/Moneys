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

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/Auth/Login"
        render={
          (props) => <LoginPage />
        }
      />
      <Route
        path="/Auth/Register"
        render={
          (props) => <RegisterPage />
        }
      />

      <Redirect to="/Auth/Login" />
    </Switch>
  </BrowserRouter>
);
