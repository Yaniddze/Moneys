// Core
import React, { FC } from 'react';
import { useObserver } from 'mobx-react';
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
`;

export const Header: FC<PropTypes> = (
  { navs }: PropTypes,
) => {
  const { username, light, reverseLight } = useHeaderVM();

  return useObserver(() => (
    <StyledHeader>
      <Wrapper>
        <ToggleSwitch
          initValue={!light}
          handleChange={reverseLight}
        />
        {username}
        <div style={{ display: 'flex' }}>
          <Navbar navs={navs} />
        </div>
      </Wrapper>
    </StyledHeader>
  ));
};
