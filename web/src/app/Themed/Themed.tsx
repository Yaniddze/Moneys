// Core
import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

// Themes
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';

import { useThemeStorage } from '../../hooks/storage/useThemeStorage';

type PropType = {
  children: ReactElement;
};

export const Themed: FC<PropType> = ({
  children,
}: PropType) => {
  const { light } = useThemeStorage();

  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(
    light ? lightTheme : darkTheme,
  );

  useEffect(() => {
    setCurrentTheme(light ? lightTheme : darkTheme);
  }, [light]);

  return (
    <ThemeProvider theme={currentTheme}>
      {children}
    </ThemeProvider>
  );
};
