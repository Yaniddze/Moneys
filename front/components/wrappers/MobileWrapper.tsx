import { FC } from 'react';
import styled from 'styled-components';

import { WrapperProps } from './types';

const Wrapper = styled.div`
  padding: 10px;
`;

export const MobileWrapper: FC<WrapperProps> = (
  { children }: WrapperProps,
) => (
  <Wrapper>
    {children}
  </Wrapper>
);
