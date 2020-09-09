// Core
import React, { FC, useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { useObserver } from 'mobx-react';

import { LoginForm } from '../components/forms';

// Hooks
import { useLoginVM } from '../../viewModel/useLoginVM';

// Components
import { CentredDiv } from '../components/divs';
import { LoginInfo } from '../../model/login/types';
import { FourColorsLoader } from '../components/loaders';

type PropTypes = {
  children?: never;
}

export const LoginPage: FC<PropTypes> = () => {
  const { fetchLogin, loginState, tryCancelFetch } = useLoginVM();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(loginState.isFetching);

  const handleSubmit = (e: LoginInfo): void => {
    if (!isFetching) {
      fetchLogin(e);
    }
  };

  useEffect(() => {
    document.title = 'Login';

    return tryCancelFetch;
  }, []);

  useEffect(() => autorun(() => {
    setIsFetching(loginState.isFetching);
    if (loginState.isFetching) {
      setError('');
    } else {
      const tempErrors = loginState.data.errors;
      setError(tempErrors.length > 0 ? tempErrors[0] : '');
    }
  }));

  const loader = isFetching && (
    <FourColorsLoader />
  );

  return useObserver(() => (
    <div>
      {loader}
      <CentredDiv>
        <LoginForm
          registerFormPath="/auth/register"
          error={error}
          handleSubmit={handleSubmit}
        />
      </CentredDiv>
    </div>
  ));
};
