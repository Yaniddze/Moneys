// Core
import React, { FC, useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { useObserver } from 'mobx-react';

import { LoginForm } from '../components/forms';
import { Particles } from '../components/particles';

// Hooks
import { useLoginVM } from '../../viewModel/useLoginVM';

// Components
import { CentredDiv } from '../components/divs';
import { LoginInfo } from '../../model/login/types';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  const { fetchLogin, loginState } = useLoginVM();
  const [error, setError] = useState('');

  const handleSubmit = (e: LoginInfo): void => {
    fetchLogin(e);
  };

  useEffect(() => {
    document.title = 'Login';
  });

  useEffect(() => autorun(() => {
    const tempErrors = loginState.data.errors;
    setError(tempErrors.length > 0 ? tempErrors[0] : '');
  }));

  return useObserver(() => (
    <div>
      <Particles />
      <CentredDiv>
        <LoginForm error={error} handleSubmit={handleSubmit} />
      </CentredDiv>
    </div>
  ));
};
