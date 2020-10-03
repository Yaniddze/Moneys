// Core
import React, { FC } from 'react';
import styled from 'styled-components';

// Components
import { StyledHeader } from './StyledHeader';
import { ToggleSwitch } from '../switches';

// ViewModel
import { useHeaderVM } from '../../../hooks/viewModels/useHeaderVM';
import { Navbar } from './navbar/Navbar';

import { Nav } from './navbar/types';

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

export const Header: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const { username, light, reverseLight } = useHeaderVM();

  return (
    <div style={{ display: 'flex' }}>
      <StyledHeader>
        <Wrapper>
          <ToggleSwitch
            initValue={!light}
            handleChange={reverseLight}
          />

          <NavsWrapper>
            <Navbar navs={navs} />
          </NavsWrapper>

          <ButtonWrapper>
            {username}

            <button type="button">
              Sign out
            </button>
          </ButtonWrapper>

        </Wrapper>
      </StyledHeader>
    </div>
  );
};
