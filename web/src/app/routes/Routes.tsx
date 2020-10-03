// Core
import React, { FC } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Pages
import { HomePage } from '../../views/pages/HomePage';

type PropType = {
  children?: never;
}

export const Routes: FC<PropType> = () => (
  <Switch>

    <Route path="/home">
      <HomePage />
    </Route>

    <Redirect to="/home" />

  </Switch>
);
