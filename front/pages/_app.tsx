import { FC, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';

type PropTypes = {
  Component: FC,
  pageProps: any,
}

const Styles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    height: 100%;
  }
`;

export default function MyApp(
  { Component, pageProps }: PropTypes,
): ReactNode {
  return (
    <>
      <Styles />
      <Component {...pageProps} />
    </>
  );
}
