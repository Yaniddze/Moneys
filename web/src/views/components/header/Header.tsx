// Core
import React, { FC } from 'react';

// Components
import { StyledHeader } from './StyledHeader';

type PropTypes = {
  children?: never;
}

export const Header: FC<PropTypes> = () => {
  return (
    <StyledHeader>
      <div>
        hello!
      </div>
    </StyledHeader>
  );
};
