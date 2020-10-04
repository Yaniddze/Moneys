import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: ColorWithContrast;

      secondary: ColorWithContrast;

      background: ColorWithContrast;

      error: ColorWithContrast;

      footer: ColorWithContrast;

      button: ColorWithContrast;
    };

    font: {
      normalSize: string;
      smallerSize: string;
      btnFontSize: string;
    };
  }
}

type ColorWithContrast = {
  color: string;
  contrast: string;
};
