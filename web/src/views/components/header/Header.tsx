// Core
import React, { FC } from 'react';

import { StyledHeader } from './StyledHeader';

type PropTypes = {
  children?: never;
}

export const Header: FC<PropTypes> = () => {
  return (
    <StyledHeader>
      hello!
    </StyledHeader>
  );
};
