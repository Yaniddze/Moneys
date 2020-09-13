import React from 'react';
import { ScreenWrapper, ScreenWrapperProps } from './types';

export const MobileWrapper: ScreenWrapper = (
  { children }: ScreenWrapperProps,
) => (
  <div>
    {children}
  </div>
);
