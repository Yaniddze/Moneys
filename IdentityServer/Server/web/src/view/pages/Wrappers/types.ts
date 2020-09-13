import { FC, ReactElement } from 'react';

export type ScreenWrapperProps = {
  children: ReactElement;
}

export type ScreenWrapper = FC<ScreenWrapperProps>;
