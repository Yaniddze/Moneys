import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  colors: {
    primary: {
      color: '#616161',
      contrast: '#FFFFFF',
    },

    secondary: {
      color: '#BDBDBD',
      contrast: '#000',
    },

    background: {
      color: '#424242',
      contrast: '#FFF',
    },

    error: {
      color: '#B00020',
      contrast: '#FFFFFF',
    },

    footer: {
      color: '#000',
      contrast: '#FFF',
    },

    button: {
      color: '#2d2d2d',
      contrast: 'white',
    },
  },

  font: {
    normalSize: '16px',
    smallerSize: '13px',
    btnFontSize: '15px',
  },
};
