import { FC, ReactElement } from 'react';
import { useTheme } from 'styled-components';

import { 
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

type PropTypes = {
  children: ReactElement;
}

export const MaterialUi: FC<PropTypes> = (
  { children }: PropTypes,
) => {
  const styledTheme = useTheme();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: styledTheme.colors.primary.color,
        contrastText: styledTheme.colors.primary.contrast,
      },
      secondary: {
        main: styledTheme.colors.secondary.color,
        contrastText: styledTheme.colors.secondary.contrast,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  );
};
