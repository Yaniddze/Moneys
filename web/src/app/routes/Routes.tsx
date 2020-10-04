// Core
import React, { FC } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Pages
import { HomePage } from '../../views/pages/HomePage';
import { BillsPage } from '../../views/pages/BillsPage';

type PropType = {
  children?: never;
}

export const Routes: FC<PropType> = () => (
  <Switch>

    <Route path="/home">
      <HomePage />
    </Route>

    <Route path="/bills">
      <BillsPage />
    </Route>

    <Redirect to="/home" />

  </Switch>
);
