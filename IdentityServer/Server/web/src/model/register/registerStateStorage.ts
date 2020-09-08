import { observable } from 'mobx';
import { FetchingRegisterResponse } from './types';

export const registerStateStorage = observable<FetchingRegisterResponse>({
  isFetching: false,
  data: {
    success: false,
    errors: [''],
  },
});
