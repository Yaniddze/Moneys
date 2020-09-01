import React, { FC } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Auth/Login" render={(props) => (<div>123</div>)} />
      <Route path="/Auth/Register" render={(props) => (<div>123</div>)} />

      <Redirect to="/Auth/Login" />
    </Switch>
  </BrowserRouter>
);
