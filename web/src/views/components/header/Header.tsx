// Core
import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
// Components
import { StyledHeader } from './StyledHeader';
import { Navbar } from './navbar/Navbar';
import { HamburgerSwitch, ToggleSwitch } from '../switches';
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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const VerticalWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const NavsWrapper = styled(VerticalWrapper)`
  width: 100%;
  
  @media(min-width: ${Screens.PC}px) {
    width: ${Screens.PC - 180}px;
    margin-left: auto;
    margin-right-auto;
  }
  
  & > div {
    display: flex;
  }
  
  & > div > div {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonWrapper = styled(VerticalWrapper)`
  margin-left: auto;
`;

type MobileWrapperProps = {
  offset: number;
}

const MobileWrapper = styled.div<MobileWrapperProps>`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: ${(props): string => props.theme.colors.background.color};
  z-index: 10;
  transition: 0.2s all ease;
  left: 0;
  top: 0;
  margin-left: ${(props): string => `${props.offset}px`};
  padding-top: 80px;
  
  & > div {
    padding: 10px;
  }
  
  & > div > div {
    width: 100%;
    height: 100%;
    font-size: 42px;
    margin: 10px 0;
  }
`;

const HamburgerWrapper = styled.div`
  z-index: 11;
`;

export const Header: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const { username, light, reverseLight } = useHeaderVM();
  const width = useScreens();
  const [navOffset, setNavOffset] = useState(-Screens.Tablet);

  const handleHamburgerClick = (): void => {
    setNavOffset((old) => (old !== 0 ? 0 : -Screens.Tablet));
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
      </MobileWrapper>
    );
  } else {
    navBar = (
      <>
        <NavsWrapper>
          <Navbar navs={navs} />
        </NavsWrapper>

        <ButtonWrapper>
          {username}

          <button type="button">
            Sign out
          </button>
        </ButtonWrapper>
      </>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <StyledHeader>
        {menuSwitch}
        <Wrapper>
          <ToggleSwitch
            initValue={!light}
            handleChange={reverseLight}
          />

          {navBar}

        </Wrapper>
      </StyledHeader>
    </div>
  );
};
