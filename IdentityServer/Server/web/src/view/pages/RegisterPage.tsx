// Core
import React, { FC, useEffect } from 'react';

// Components
import { RegisterForm } from '../components/forms';
import { FourColorsLoader } from '../components/loaders';

// Hook
import { useRegisterVM } from '../../viewModel/useRegisterVM';

// Types
import { RegisterInfo } from '../../model/register/types';
import { Screens } from '../../hooks/useScreens';

// Wrappers
import {
  MobileWrapper,
  DesktopWrapper,
  ScreenWrapper,
} from './Wrappers';

// Utils
import { redirect } from '../../model/utils/redirect';
import { getReturnUrl } from '../../model/utils/getReturnUrl';

import { ExternalGoogleAuth } from '../../configuration/ExternalAuthUrls';

type PropTypes = {
  children?: never;
  searchParams: string;
  screen: Screens;
}

export const RegisterPage: FC<PropTypes> = ({
  searchParams, screen,
}: PropTypes) => {
  const { registerState, fetchRegister, tryCancelFetch } = useRegisterVM();

  const returnUrl = getReturnUrl(searchParams);

  let Wrapper: ScreenWrapper = DesktopWrapper;

  switch (screen) {
    case Screens.Mobile:
      Wrapper = MobileWrapper;
      break;

    case Screens.Desktop:
      Wrapper = DesktopWrapper;
      break;

    default:
      throw new Error('Unhandled screen state');
  }

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
      <Wrapper>
        <RegisterForm
          handleGoogleClick={handleGoogleClick}
          handleSubmit={handleSubmit}
          error={registerError}
          loginFormPath={`/Account/Login${searchParams}`}
        />
      </Wrapper>
    </div>
  );
};
