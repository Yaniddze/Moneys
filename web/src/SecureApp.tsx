// Core
import React, { FC, ReactElement } from 'react';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
  OidcSecure,
} from '@axa-fr/react-oidc-context/dist';

// Config
import { oidcConfig } from './configuration/oidcConfig';

type PropTypes = {
  children: ReactElement;
}

export const SecureApp: FC<PropTypes> = (
  { children }: PropTypes,
) => (
  <AuthenticationProvider
    isEnabled
    configuration={oidcConfig}
    UserStore={InMemoryWebStorage}
  >
    <OidcSecure>
      {children}
    </OidcSecure>
  </AuthenticationProvider>
);
