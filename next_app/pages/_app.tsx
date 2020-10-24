import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body, html {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100%;
  }
  
  #__next {
    height: 100%;
    > div {
      height: 100%;
    }
  }
`;

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
