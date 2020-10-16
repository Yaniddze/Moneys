import { useQuery } from '@apollo/client';

import {
  Variables,
  QueryAnswer,
  getTransactionsQuery,
} from '../../requests/queries/getTransactionsQuery';

import { Transaction } from '../../domain/types';
import { useUserStorage } from '../storage/useUserStorage';

type FetchingAnswer = {
  fetching: boolean;
  data: {
    success: boolean;
    errors: string[];
    data: Transaction[];
  };
}

type ReturnType = {
  state: FetchingAnswer;
}

const initState: FetchingAnswer = {
  fetching: false,
  data: {
    success: false,
    errors: [],
    data: [],
  },
};

export const useTransactions = (): ReturnType => {
  const { user } = useUserStorage();
  const { loading, data, client } = useQuery<QueryAnswer, Variables>(getTransactionsQuery, {
    variables: {
      command: {
        userId: user?.profile['user.id'],
      },
    },
  });

  if (user === null) {
    client.stop();
  }

  const transactions: FetchingAnswer = {
    fetching: loading,
    data: {
      success: data?.transactions.success || initState.data.success,
      errors: data?.transactions.errors || initState.data.errors,
      data: data?.transactions.data || initState.data.data,
    },
  };

  return {
    state: transactions,
  };
};
