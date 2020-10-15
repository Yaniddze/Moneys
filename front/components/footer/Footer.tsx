import { FC } from 'react';

import { StyledFooter } from './StyledFooter';

type PropTypes = {
  children?: never;
}

export const Footer: FC<PropTypes> = () => (
  <StyledFooter>
    Footer
  </StyledFooter>
);
