// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import { Secure } from './app/Secure';

export const App: FC = () => (
  <Secure>
    <BrowserRouter>
      <Switch>

        <Route path="/app">
          <div>
            Hello!
          </div>
        </Route>

      </Switch>
    </BrowserRouter>
  </Secure>
);
