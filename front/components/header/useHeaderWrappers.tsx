// Core
import { ReactElement, useState, MouseEvent } from 'react';

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
import { useScreens } from '../../hooks/useScreens';
import { MinWidths } from '../../hooks/useScreens/types';
import { useUserManager } from '../../hooks/useUserManager';

// Types
import { Nav } from './navbar/types';

type ReturnType = {
  navBar: ReactElement;
  menuSwitch: ReactElement | false;
}

type PropTypes = {
  navs: Nav[];
  username: string;
  onLogout: () => void;
}

export const useHeaderWrappers = ({ 
  username, navs, onLogout,
}: PropTypes): ReturnType => {
  const width = useScreens();
  const [navOffset, setNavOffset] = useState(-MinWidths.PC);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const { manager } = useUserManager();

  const handleHamburgerClick = (value: boolean): void => {
    setHamburgerClicked(value);
    setNavOffset((old) => (old !== 0 ? 0 : -MinWidths.PC));
  };

  const handleMobileWrapperClick = (): void => {
    handleHamburgerClick(false);
  };

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onLogout();
    manager.signoutRedirect();
  };

  const menuSwitch = width === MinWidths.Mobile && (
    <HamburgerWrapper>
      <HamburgerSwitch
        clicked={hamburgerClicked}
        handleClick={handleHamburgerClick}
      />
    </HamburgerWrapper>
  );

  let navBar: ReactElement;

  if (width === MinWidths.Mobile) {
    navBar = (
      <MobileWrapper
        onClick={handleMobileWrapperClick}
        offset={navOffset}
      >
        <Navbar navs={navs} />
        <HorizontalWrapper>
          <span>
            {username}
          </span>
        </HorizontalWrapper>

        <HorizontalWrapper>
          <SquareButtonWithShadow onClick={handleLogout}>
            Выйти
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
            <SquareButtonWithShadow onClick={handleLogout}>
              Выйти
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
