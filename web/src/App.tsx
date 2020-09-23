// Core
import React, { FC } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import { GlobalStyles } from './app/GlobalStyles';
import { Secure } from './app/Secure';
import { Themed } from './app/Themed';

export const App: FC = () => (
  <Themed>
    <div>

      <GlobalStyles />

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

    </div>
  </Themed>
);
