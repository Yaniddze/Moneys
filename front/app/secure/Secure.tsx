// Core
import { 
  FC, 
  ReactElement, 
  useEffect,
  useState,
} from 'react';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
  OidcSecure,
} from '@axa-fr/react-oidc-context/dist';

// Config
import { oidcConfig } from '../../configuration/oidcConfig';

// Pages
import { Authenticating } from './Authenticating';
import { NotAuthenticated } from './NotAuthenticated';
import { NotAuthorized } from './NotAuthorized';
import { Callback } from './Callback';

type PropTypes = {
  children: ReactElement;
}

export const Secure: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const [Wrapper, setWrapper] = useState<FC>(
    () => (<div />),
  );

  useEffect(() => {
    setWrapper(
      (props) => (
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
            {props.children}
          </OidcSecure>
        </AuthenticationProvider>
      ), 
    );
  });
  
  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
};
