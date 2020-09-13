// Core
import React from 'react';

// Types
import { ScreenWrapper, ScreenWrapperProps } from './types';

export const MobileWrapper: ScreenWrapper = (
  { children }: ScreenWrapperProps,
) => (
  <div>
    {children}
  </div>
);
