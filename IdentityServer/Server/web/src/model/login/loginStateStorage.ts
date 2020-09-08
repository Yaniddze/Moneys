import { observable } from 'mobx';
import { FetchingLoginResponse } from './types';

export const loginResponseStorage = observable<FetchingLoginResponse>({
  isFetching: false,
  data: {
    success: false,
    errors: [],
  },
});
