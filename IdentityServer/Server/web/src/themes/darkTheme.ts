import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colors: {
    main: '#212529',
    secondary: '#343a40',
    dim: '#495057',
    dark: '#ced4da',
    calcDarkInRgba: ((opacity): string => `rgba(206,212,218,${opacity})`),
  },

  font: {
    btnFontSize: '15px',
    smallerSize: '13px',
    normalSize: '16px',

    btnFontColor: 'white',
  },
};
