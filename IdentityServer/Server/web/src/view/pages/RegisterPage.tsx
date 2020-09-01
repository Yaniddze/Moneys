import React, { FC, useEffect } from 'react';

type PropTypes = {
  children?: never;
}

export const RegisterPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Registration';
  });

  return (
    <div>
      Register Page
    </div>
  );
};
