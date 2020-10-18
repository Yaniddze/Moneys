// Core
import { FC } from 'react';
import { Switch, withStyles, NoSsr } from '@material-ui/core';

// Styles
import {
  Wrapper,
  VerticalWrapper,
  StyledHeader,
} from './styles';

// Hooks
import { useHeaderValues } from '../../hooks/viewModels/useHeaderValues';
import { useHeaderWrappers } from './useHeaderWrappers';

// Utils
import { deleteUser } from '../../utils/cookieUtils';

// Types
import { Nav } from './navbar/types';

const StyledSwitch = withStyles({
  root: {
    width: 80,
    height: 40,
  },
  switchBase: {
    '&$checked': {
      transform: 'translateX(40px)',
    },
  },
  thumb: {
    marginTop: -1,
    width: 24,
    height: 24,
  },
  checked: {},
})(Switch);

type PropTypes = {
  children?: never;
  navs: Nav[];
}

export const Header: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const { username, light, reverseLight } = useHeaderValues();

  const { menuSwitch, navBar } = useHeaderWrappers({
    username,
    navs,
    onLogout: deleteUser,
  });

  return (
    <div style={{ display: 'flex' }}>
      <StyledHeader>
        {menuSwitch}
        <Wrapper>
          <NoSsr>
            <VerticalWrapper>
              <StyledSwitch
                checked={!light}
                onChange={reverseLight}
              />
            </VerticalWrapper>
          </NoSsr>
          
          {navBar}

        </Wrapper>
      </StyledHeader>
    </div>
  );
};
