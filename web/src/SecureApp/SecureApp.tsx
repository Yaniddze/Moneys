// Core
import React, { FC, ReactElement } from 'react';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
  OidcSecure,
} from '@axa-fr/react-oidc-context/dist';

// Config
import { oidcConfig } from '../configuration/oidcConfig';

// Pages
import { Authenticating } from './Authenticating';
import { NotAuthenticated } from './NotAuthenticated';
import { NotAuthorized } from './NotAuthorized';
import { Callback } from './Callback';

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
    authenticating={Authenticating}
    notAuthenticated={NotAuthenticated}
    notAuthorized={NotAuthorized}
    callbackComponentOverride={Callback}
  >
    <OidcSecure>
      {children}
    </OidcSecure>
  </AuthenticationProvider>
);
