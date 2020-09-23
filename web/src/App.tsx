// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import { Secure } from './app/Secure';
import { Themed } from './app/Themed';

export const App: FC = () => (
  <Themed>
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
  </Themed>
);
