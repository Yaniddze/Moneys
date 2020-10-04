import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: {
      color: '#66BB6A',
      contrast: '#000',
    },

    secondary: {
      color: '#B9F6CA',
      contrast: '#3a7d3d',
    },

    background: {
      color: '#E8F5E9',
      contrast: '#000000',
    },

    error: {
      color: '#B00020',
      contrast: '#FFFFFF',
    },

    footer: {
      color: '#1B5E20',
      contrast: '#FFF',
    },

    button: {
      color: '#245830',
      contrast: 'white',
    },
  },

  font: {
    normalSize: '16px',
    smallerSize: '13px',
    btnFontSize: '15px',
  },
};
