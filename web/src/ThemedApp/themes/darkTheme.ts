import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colors: {
    main: 'white',
    secondary: 'gray',
    dim: 'gray',
    dark: 'black',
    calcDarkInRgba: (opacity): string => `rgba(120,120,120, ${opacity})`,
    error: 'red',
    linkColor: 'blue',
  },

  font: {
    normalSize: '16px',
    smallerSize: '13px',
    btnFontSize: '15px',

    btnFontColor: 'black',
  },
};
