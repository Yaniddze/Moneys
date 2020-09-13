// Core
import React, { FC, useEffect } from 'react';

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

  const returnUrl = getReturnUrl(searchParams);

  useEffect(() => {
    document.title = 'Registration';

    return tryCancelFetch;
  }, []);

  const handleSubmit = (e: RegisterInfo): void => {
    if (!registerState.isFetching) {
      fetchRegister(e);
    }
  };

  const handleGoogleClick = (): void => {
    redirect(ExternalGoogleAuth(returnUrl));
  };

  const loader = registerState.isFetching && (
    <FourColorsLoader />
  );

  if (registerState.data.success) {
    redirect(returnUrl);
  }

  let registerError = '';

  if (!registerState.isFetching && registerState.data.errors.length > 0) {
    registerError = registerState.data.errors[0];
  }

  return (
    <div>
      {loader}
      <CentredDiv>
        <RegisterForm
          handleGoogleClick={handleGoogleClick}
          handleSubmit={handleSubmit}
          error={registerError}
          loginFormPath={`/auth/login${searchParams}`}
        />
      </CentredDiv>
    </div>
  );
};
