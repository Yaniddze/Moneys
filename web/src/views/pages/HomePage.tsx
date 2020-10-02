import React, { FC } from 'react';
import { useBills } from '../../hooks/useBills';

type PropTypes = {
  children?: never;
}

export const HomePage: FC<PropTypes> = () => {
  const { bills } = useBills();

  return (
    <div>
      Home page
    </div>
  );
};
