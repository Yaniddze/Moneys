// Core
import React, { FC, useEffect } from 'react';

// Components
import { LoginInput as Input } from '../components/inputs';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Login';
  });
  
  return (
    <div>
      Login page

      <div>
        <Input />
      </div>
    </div>
  );
};
