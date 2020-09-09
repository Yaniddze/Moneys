// Core
import React, { FC, useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { useObserver } from 'mobx-react';

// Hooks
import { useLoginVM } from '../../viewModel/useLoginVM';

// Components
import { CentredDiv } from '../components/divs';
import { LoginInfo } from '../../model/login/types';
import { FourColorsLoader } from '../components/loaders';
import { LoginForm } from '../components/forms';

// Utils
import { getReturnUrl } from '../../model/utils/getReturnUrl';
import { redirect } from '../../model/utils/redirect';

type PropTypes = {
  children?: never;
  searchParams: string;
}

export const LoginPage: FC<PropTypes> = ({
  searchParams,
}: PropTypes) => {
  const { fetchLogin, loginState, tryCancelFetch } = useLoginVM();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(loginState.isFetching);
  const [successLogin, setSuccessLogin] = useState(loginState.data.success);

  const returnUrl = getReturnUrl(searchParams);

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
    setSuccessLogin(loginState.data.success);
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

  if (successLogin) {
    redirect(returnUrl);
  }

  return useObserver(() => (
    <div>
      {loader}
      <CentredDiv>
        <LoginForm
          registerFormPath={`/auth/register${searchParams}`}
          error={error}
          handleSubmit={handleSubmit}
        />
      </CentredDiv>
    </div>
  ));
};
