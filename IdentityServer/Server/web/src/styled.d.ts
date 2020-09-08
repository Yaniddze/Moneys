import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
      dim: string;
      dark: string;
      calcDarkInRgba: (opacity: number) => string;
      error: string;
      linkColor: string;
    };

    font: {
      normalSize: string;
      smallerSize: string;
      btnFontSize: string;

      btnFontColor: string;
    };
  }
}
