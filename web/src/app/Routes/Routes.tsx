// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

// Pages
import { SomePage } from '../../views/pages/SomePage';

type PropType = {
  children?: never;
}

export const Routes: FC<PropType> = () => (
  <BrowserRouter>
    <Switch>

      <Route path="/app">
        <SomePage />
      </Route>

    </Switch>
  </BrowserRouter>
);
