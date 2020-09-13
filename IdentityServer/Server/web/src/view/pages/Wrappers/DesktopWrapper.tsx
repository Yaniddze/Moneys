import React from 'react';
import { ScreenWrapper, ScreenWrapperProps } from './types';
import { CentredDiv } from '../../components/divs';

export const DesktopWrapper: ScreenWrapper = (
  { children }: ScreenWrapperProps,
) => (
  <CentredDiv>
    {children}
  </CentredDiv>
);
