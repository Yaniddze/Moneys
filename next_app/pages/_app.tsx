// Core
import { FC } from 'react';

// Setup
import {
  GlobalStyles,
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
      <GlobalStyles />
      <Component {...pageProps} />
    </UserManagerDependencies>
  );
}
