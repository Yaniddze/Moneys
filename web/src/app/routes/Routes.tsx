// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom';

// Pages
import { HomePage } from '../../views/pages/HomePage';

type PropType = {
  children?: never;
}

export const Routes: FC<PropType> = () => (
  <BrowserRouter>
    <Switch>

      <Route path="/home">
        <HomePage />
      </Route>

      <Redirect to="/home" />

    </Switch>
  </BrowserRouter>
);
