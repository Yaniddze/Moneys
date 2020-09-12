// Core
import React, {
  FC,
  ReactElement,
  useState,
} from 'react';
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

import {
  ToogleSwitch,
} from './view/components/switch';

const SwitchInput = styled(ToogleSwitch)`
  position: absolute;
  left: 0;
  top: 0;
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
      <ThemeProvider theme={currentTheme}>
        <div>
          {children}
        </div>
        <SwitchInput
          initValue={!isGreenCooked}
          handleChange={handleChange}
        />
      </ThemeProvider>
    </div>
  );
};
