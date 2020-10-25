import { FC } from 'react';

import {
  GlobalStyles,
} from '../appSetup';

type PropTypes = {
  Component: FC,
  pageProps: any,
}

export default function App({ Component, pageProps }: PropTypes): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
