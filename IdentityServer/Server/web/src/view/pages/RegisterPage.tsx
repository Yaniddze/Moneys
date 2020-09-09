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

type PropTypes = {
  children?: never;
}

export const RegisterPage: FC<PropTypes> = () => {
  const { registerState, fetchRegister, tryCancelFetch } = useRegisterVM();
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(registerState.isFetching);

  useEffect(() => autorun(() => {
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

  const loader = isFetching && (
    <FourColorsLoader />
  );

  return (
    <div>
      {loader}
      <CentredDiv>
        <RegisterForm
          handleSubmit={handleSubmit}
          error={error}
          loginFormPath="/auth/login"
        />
      </CentredDiv>
    </div>
  );
};
