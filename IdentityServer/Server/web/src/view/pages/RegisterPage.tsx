// Core
import React, { FC, useEffect, useState } from 'react';
import { autorun } from 'mobx';

// Components
import { CentredDiv } from '../components/divs';
import { RegisterForm } from '../components/forms';
import { FourColorsLoader } from '../components/loaders';

// Hook
import { useRegisterVM } from '../../viewModel/useRegisterVM';

// Types
import { RegisterInfo } from '../../model/register/types';

// Utils
import { redirect } from '../../model/utils/redirect';
import { getReturnUrl } from '../../model/utils/getReturnUrl';

import { ExternalGoogleAuth } from '../../configuration/ExternalAuthUrls';

type PropTypes = {
  children?: never;
  searchParams: string;
}

export const RegisterPage: FC<PropTypes> = ({
  searchParams,
}: PropTypes) => {
  const { registerState, fetchRegister, tryCancelFetch } = useRegisterVM();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(registerState.isFetching);
  const [successRegister, setSuccessRegister] = useState(registerState.data.success);

  const returnUrl = getReturnUrl(searchParams);

  useEffect(() => autorun(() => {
    setSuccessRegister(registerState.data.success);
    setIsFetching(registerState.isFetching);
    if (registerState.isFetching) {
      setError('');
    } else {
      const tempErrors = registerState.data.errors;
      setError(tempErrors.length > 0 ? tempErrors[0] : '');
    }
  }));

  useEffect(() => {
    document.title = 'Registration';

    return tryCancelFetch;
  }, []);

  const handleSubmit = (e: RegisterInfo): void => {
    if (!isFetching) {
      fetchRegister(e);
    }
  };

  const handleGoogleClick = (): void => {
    redirect(ExternalGoogleAuth(returnUrl));
  };

  const loader = isFetching && (
    <FourColorsLoader />
  );

  if (successRegister) {
    redirect(returnUrl);
  }

  return (
    <div>
      {loader}
      <CentredDiv>
        <RegisterForm
          handleGoogleClick={handleGoogleClick}
          handleSubmit={handleSubmit}
          error={error}
          loginFormPath={`/auth/login${searchParams}`}
        />
      </CentredDiv>
    </div>
  );
};
