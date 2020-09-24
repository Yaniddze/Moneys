import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body, html {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: ${(props): string => (props.theme.colors.dim)};
    width: 100%;
    height: 100%;
  }
  
  #root {
    height: 100%;
  }
`;
