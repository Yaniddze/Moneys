// Core
import React, {
  FC,
  useEffect,
} from 'react';

// Hooks
import { useLoginVM } from '../../viewModel/useLoginVM';

// Components
import { LoginInfo } from '../../model/login/types';
import { FourColorsLoader } from '../components/loaders';
import { LoginForm } from '../components/forms';

// Utils
import { getReturnUrl } from '../../model/utils/getReturnUrl';
import { redirect } from '../../model/utils/redirect';

// Types
import { Screens } from '../../hooks/useScreens';

// Wrappers
import {
  DesktopWrapper,
  MobileWrapper,
  ScreenWrapper,
} from './Wrappers';

import { ExternalGoogleAuth } from '../../configuration/ExternalAuthUrls';

type PropTypes = {
  children?: never;
  searchParams: string;
  screen: Screens;
}

export const LoginPage: FC<PropTypes> = ({
  searchParams, screen,
}: PropTypes) => {
  const { fetchLogin, loginState, tryCancelFetch } = useLoginVM();

  const returnUrl = getReturnUrl(searchParams);

  let Wrapper: ScreenWrapper = DesktopWrapper;

  switch (screen) {
    case Screens.Desktop:
      Wrapper = DesktopWrapper;
      break;

    case Screens.Mobile:
      Wrapper = MobileWrapper;
      break;

    default:
      throw new Error('Unhandled screen state');
  }

  const handleSubmit = (e: LoginInfo): void => {
    if (!loginState.isFetching) {
      fetchLogin(e);
    }
  };

  const handleGoogleClick = (): void => {
    redirect(ExternalGoogleAuth(returnUrl));
  };

  useEffect(() => {
    document.title = 'Login';

    return tryCancelFetch;
  }, []);

  const loader = loginState.isFetching && (
    <FourColorsLoader />
  );

  if (loginState.data.success) {
    redirect(returnUrl);
  }
  let loginError = '';

  if (!loginState.isFetching && loginState.data.errors.length > 0) {
    loginError = loginState.data.errors[0];
  }

  return (
    <div>
      {loader}
      <Wrapper>
        <LoginForm
          handleGoogleClick={handleGoogleClick}
          registerFormPath={`/auth/register${searchParams}`}
          error={loginError}
          handleSubmit={handleSubmit}
        />
      </Wrapper>
    </div>
  );
};
