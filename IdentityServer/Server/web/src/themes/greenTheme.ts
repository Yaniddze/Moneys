import { DefaultTheme } from 'styled-components';

export const greenTheme: DefaultTheme = {
  colors: {
    main: '#62E200',
    secondary: '#62AA2A',
    dim: '#A6F16C',
    dark: '#409300',
    calcDarkInRgba: ((opacity): string => `rgba(64,147,0,${opacity})`),
    error: 'red',
    linkColor: 'black',
  },

  font: {
    btnFontSize: '15px',
    smallerSize: '13px',
    normalSize: '16px',

    btnFontColor: 'black',
  },
};
