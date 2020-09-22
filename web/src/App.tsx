import React, { FC } from 'react';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
  OidcSecure,
} from '@axa-fr/react-oidc-context/dist';
import { oidcConfig } from './configuration/oidcConfig';

export const App: FC = () => (
  <AuthenticationProvider
    isEnabled
    configuration={oidcConfig}
    UserStore={InMemoryWebStorage}
  >
    <OidcSecure>
      <div>
        Hello!
      </div>
    </OidcSecure>
  </AuthenticationProvider>
);
