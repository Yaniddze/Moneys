// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import { SecureApp } from './SecureApp';

export const App: FC = () => (
  <SecureApp>
    <BrowserRouter>
      <Switch>

        <Route path="/app">
          <div>
            Hello!
          </div>
        </Route>

      </Switch>
    </BrowserRouter>
  </SecureApp>
);
