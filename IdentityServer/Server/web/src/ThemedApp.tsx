// Core
import React, { FC, ReactElement, useState } from 'react';
import Cookies from 'js-cookie';
import
styled, {
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';

// Themes
import {
  greenTheme,
  darkTheme,
} from './themes';

const SwitchInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px;
  z-index:10;
`;

type PropTypes = {
  children: ReactElement;
}

const cookedTheme = Cookies.get('Moneys.Theme');

const isGreenCooked = cookedTheme === 'green';

export const ThemedApp: FC<PropTypes> = ({ children }: PropTypes) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(
    isGreenCooked ? greenTheme : darkTheme,
  );

  const handleChange = (): void => {
    setCurrentTheme((current) => {
      if (current === greenTheme) {
        Cookies.set('Moneys.Theme', 'dark');
        return darkTheme;
      }
      Cookies.set('Moneys.Theme', 'green');
      return greenTheme;
    });
  };

  return (
    <div>
      <SwitchInput
        checked={currentTheme === darkTheme}
        type="checkbox"
        onChange={handleChange}
      />
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </div>
  );
};
