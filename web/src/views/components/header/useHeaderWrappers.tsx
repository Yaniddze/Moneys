// Core
import React, { ReactElement, useState } from 'react';

// Wrappers
import {
  ButtonWrapper,
  HamburgerWrapper,
  HorizontalWrapper,
  MobileWrapper,
  NavsWrapper,
} from './styles';

// Components
import { HamburgerSwitch } from '../switches';
import { Navbar } from './navbar/Navbar';
import { SquareButtonWithShadow } from '../buttons';

// Hooks
import { useScreens } from '../../../hooks/useScreens';
import { Screens } from '../../../hooks/useScreens/types';

// Types
import { Nav } from './navbar/types';

type ReturnType = {
  navBar: ReactElement;
  menuSwitch: ReactElement | false;
}

type PropTypes = {
  navs: Nav[];
  username: string;
}

export const useHeaderWrappers = (props: PropTypes): ReturnType => {
  const width = useScreens();
  const [navOffset, setNavOffset] = useState(-Screens.PC);
  const { username, navs } = props;

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

  return {
    navBar,
    menuSwitch,
  };
};
