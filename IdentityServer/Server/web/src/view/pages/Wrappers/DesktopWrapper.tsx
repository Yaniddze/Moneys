// Core
import React from 'react';
import styled from 'styled-components';

// Types
import { ScreenWrapper, ScreenWrapperProps } from './types';

const CentredDiv = styled.div`
  @media (min-height: 500px) {
    & {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const DesktopWrapper: ScreenWrapper = (
  { children }: ScreenWrapperProps,
) => (
  <CentredDiv>
    {children}
  </CentredDiv>
);
