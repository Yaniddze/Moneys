// Core
import React, { FC } from 'react';

// Components
import { LoginInput as Input } from '../components/inputs';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  return (
    <div>
      Login page

      <div>
        <Input />
      </div>
    </div>
  );
};
