// Core
import React, { FC } from 'react';
import { useObserver } from 'mobx-react';
import styled from 'styled-components';

// Components
import { StyledHeader } from './StyledHeader';
import { ToggleSwitch } from '../switches';

// ViewModel
import { useHeaderVM } from '../../../hooks/viewModels/useHeaderVM';

type PropTypes = {
  children?: never;
}

const Wrapper = styled.div`
  display: flex;
`;

export const Header: FC<PropTypes> = () => {
  const { username, light, reverseLight } = useHeaderVM();

  return useObserver(() => (
    <StyledHeader>
      <Wrapper>
        <ToggleSwitch
          initValue={!light}
          handleChange={reverseLight}
        />
        {username}
      </Wrapper>
    </StyledHeader>
  ));
};
