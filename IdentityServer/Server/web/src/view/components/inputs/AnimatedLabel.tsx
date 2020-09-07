// Core
import React, {
  FC,
  ReactElement,
} from 'react';

// Components
import { LabelAnimationStyles } from './LabelAnimationStyles';

type PropTypes = {
  children?: never;
  // Need to be input
  input: ReactElement;
  labelText: string;
  isValueEntered: boolean;
}

export const AnimatedLabel: FC<PropTypes> = (
  { labelText, input, isValueEntered }: PropTypes,
) => (
  <div>
    <LabelAnimationStyles />
    {input}
    <span
      className={`${isValueEntered ? 'form-label__to-up' : 'form-label__to-down'} form-label`}
    >
      {labelText}
    </span>
  </div>
);
