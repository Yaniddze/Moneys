// Core
import React, { FC, ReactElement, useState } from 'react';
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

export const ThemedApp: FC<PropTypes> = ({ children }: PropTypes) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(greenTheme);

  const handleChange = (): void => {
    setCurrentTheme((current) => {
      if (current === greenTheme) {
        return darkTheme;
      }
      return greenTheme;
    });
  };

  return (
    <div>
      <SwitchInput type="checkbox" onChange={handleChange} />
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </div>
  );
};
