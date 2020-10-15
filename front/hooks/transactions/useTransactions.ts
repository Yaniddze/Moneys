import { useQuery } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

import {
  Variables,
  QueryAnswer,
  getTransactionsQuery,
} from '../../requests/queries/getTransactionsQuery';

import { Transaction } from '../../domain/types';

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
  const { oidcUser } = useReactOidc();
  const { loading, data } = useQuery<QueryAnswer, Variables>(getTransactionsQuery, {
    variables: {
      command: {
        userId: oidcUser.profile['user.id'],
      },
    },
  });

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
