// Core
import React, {
  FC,
  ReactElement,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { DefaultTheme, ThemeProvider } from 'styled-components';

// Components
import { ToggleSwitch } from '../../views/components/switches';

// Themes
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';

type PropType = {
  children: ReactElement;
};

const themeCookieName = 'Moneys.Theme';
const lightValue = 'light';
const darkValue = 'dark';

const cookedTheme = Cookies.get(themeCookieName);
const lightCooked = cookedTheme === lightValue;

export const Themed: FC<PropType> = ({
  children,
}: PropType) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(
    lightCooked ? lightTheme : darkTheme,
  );

  const handleChange = (): void => {
    if (currentTheme === lightTheme) {
      Cookies.set(themeCookieName, darkValue);
      setCurrentTheme(darkTheme);
    } else {
      Cookies.set(themeCookieName, lightValue);
      setCurrentTheme(lightTheme);
    }
  };

  return (
    <div>
      <ThemeProvider theme={currentTheme}>
        <ToggleSwitch
          initValue={!lightCooked}
          handleChange={handleChange}
        />
        <div>
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
};
