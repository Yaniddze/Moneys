// Core
import { FC } from 'react';

// Setup
import {
  GlobalStyles,
  Secure,
} from '../appSetup';

// Dependencies
import { UserManagerDependencies } from '../dependencies';

type PropTypes = {
  Component: FC,
  pageProps: any,
}

export default function App({ Component, pageProps }: PropTypes): JSX.Element {
  return (
    <UserManagerDependencies>
      <Secure>
        <GlobalStyles />
        <Component {...pageProps} />
      </Secure>
    </UserManagerDependencies>
  );
}
