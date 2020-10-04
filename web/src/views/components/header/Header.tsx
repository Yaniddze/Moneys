// Core
import React, { FC, ReactElement, useState } from 'react';

// Styles
import {
  HamburgerWrapper,
  Wrapper,
  VerticalWrapper,
  NavsWrapper,
  HorizontalWrapper,
  ButtonWrapper,
  MobileWrapper,
  StyledHeader,
} from './styles';

// Components
import { Navbar } from './navbar/Navbar';
import { HamburgerSwitch, ToggleSwitch } from '../switches';
import { SquareButtonWithShadow } from '../buttons';

// Hooks
import { useHeaderVM } from '../../../hooks/viewModels/useHeaderVM';
import { useScreens } from '../../../hooks/useScreens';

// Types
import { Nav } from './navbar/types';
import { Screens } from '../../../hooks/useScreens/types';

type PropTypes = {
  children?: never;
  navs: Nav[];
}

export const Header: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const { username, light, reverseLight } = useHeaderVM();
  const width = useScreens();
  const [navOffset, setNavOffset] = useState(-Screens.PC);

  const handleHamburgerClick = (): void => {
    setNavOffset((old) => (old !== 0 ? 0 : -Screens.PC));
  };

  const menuSwitch = width === Screens.Mobile && (
    <HamburgerWrapper>
      <HamburgerSwitch handleClick={handleHamburgerClick} />
    </HamburgerWrapper>
  );

  let navBar: ReactElement;

  if (width === Screens.Mobile) {
    navBar = (
      <MobileWrapper offset={navOffset}>
        <Navbar navs={navs} />
        <HorizontalWrapper>
          <span>
            {username}
          </span>
        </HorizontalWrapper>

        <HorizontalWrapper>
          <SquareButtonWithShadow>
            Sign out
          </SquareButtonWithShadow>
        </HorizontalWrapper>
      </MobileWrapper>
    );
  } else {
    navBar = (
      <>
        <NavsWrapper>
          <Navbar navs={navs} />
        </NavsWrapper>

        <ButtonWrapper>
          <HorizontalWrapper>
            <span>
              {username}
            </span>
          </HorizontalWrapper>

          <HorizontalWrapper>
            <SquareButtonWithShadow>
              Sign out
            </SquareButtonWithShadow>
          </HorizontalWrapper>
        </ButtonWrapper>
      </>
    );
  }

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
