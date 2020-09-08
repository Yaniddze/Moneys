// Core
import React, { FC, useEffect } from 'react';

import { LoginForm } from '../components/forms';
import { Particles } from '../components/particles';

// Components
import { CentredDiv } from '../components/divs';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  useEffect(() => {
    document.title = 'Login';
  });

  return (
    <div>
      <Particles />
      <CentredDiv>
        <div>
          <LoginForm />
        </div>
      </CentredDiv>
    </div>
  );
};
