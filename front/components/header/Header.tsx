// Core
import { FC } from 'react';

// Styles
import {
  Wrapper,
  VerticalWrapper,
  StyledHeader,
} from './styles';

// Components
import { ToggleSwitch } from '../switches';

// Hooks
import { useHeaderValues } from '../../hooks/viewModels/useHeaderValues';
import { useHeaderWrappers } from './useHeaderWrappers';

// Types
import { Nav } from './navbar/types';

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
  });

  return (
    <div style={{ display: 'flex' }}>
      <StyledHeader>
        {menuSwitch}
        <Wrapper>
          <VerticalWrapper>
            <ToggleSwitch
              initValue={!light}
              handleChange={reverseLight}
            />
          </VerticalWrapper>

          {navBar}

        </Wrapper>
      </StyledHeader>
    </div>
  );
};
