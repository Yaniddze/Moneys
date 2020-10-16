import { FC, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';

import { Apollo } from '../app/apollo';
import { Secure } from '../app/secure';
import { StructureWrapper } from '../app/StructureWrapper';
import { Themed } from '../app/themed';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { useResizeEventHolder } from '../hooks/useScreens';

import { navs } from '../configuration/navbarConfig';

type PropTypes = {
  Component: FC,
  pageProps: any,
}

export const GlobalStyles = createGlobalStyle`
  body, html {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: ${(props): string => props.theme.colors.background.color};
    color: ${(props): string => props.theme.colors.background.contrast};
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

export default function MyApp(
  { Component, pageProps }: PropTypes,
): ReactNode {
  useResizeEventHolder();

  return (
    <Themed>
      <>
        <GlobalStyles />
        <Secure>

          <Apollo>

            <StructureWrapper>
              <>
                <Header navs={navs} />
                <main>
                  <Component {...pageProps} />
                </main>
                <Footer />
              </>
            </StructureWrapper>

          </Apollo>

        </Secure>
      </>
    </Themed>
  );
}
