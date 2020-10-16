import { useQuery } from '@apollo/client';

import { getBillsQuery, Variables, QueryAnswer } from '../../requests/queries/getBillsQuery';

import { Bill } from '../../domain/types';

import { useUserStorage } from '../storage/useUserStorage';

type FetchingBills = {
  fetching: boolean;
  data: {
    success: boolean;
    errors: string[];
    data: Bill[];
  };
}

type ReturnType = {
  state: FetchingBills;
}

const initState: FetchingBills = {
  fetching: false,
  data: {
    success: false,
    errors: [],
    data: [],
  },
};

export const useBills = (): ReturnType => {
  const { user } = useUserStorage();

  const { loading, data, client } = useQuery<QueryAnswer, Variables>(getBillsQuery, {
    variables: {
      command: {
        userId: user?.profile['user.id'] || '123',
      },
    },
  });

  if (user === null) {
    client.stop();
  }

  const bills = {
    fetching: loading,
    data: {
      success: data?.bills.success || initState.data.success,
      errors: data?.bills.errors || initState.data.errors,
      data: data?.bills.data || initState.data.data,
    },
  };

  return {
    state: bills,
  };
};
