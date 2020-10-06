import { useQuery } from '@apollo/client';

import { getTransactionTypeQuery, QueryAnswer } from '../requests/queries/getTransactionTypesQuery';
import { TransactionType } from '../domain/types';

type ReturnType = {
  state: FetchingAnswer;
}

type FetchingAnswer = {
  fetching: boolean;
  data: {
    errors: string[];
    success: boolean;
    types: TransactionType[];
  };
}

const initialState: FetchingAnswer = {
  fetching: false,
  data: {
    errors: [],
    success: false,
    types: [],
  },
};

export const useTransactionTypes = (): ReturnType => {
  const { data, loading } = useQuery<QueryAnswer>(getTransactionTypeQuery);

  const state: FetchingAnswer = {
    fetching: loading,
    data: {
      errors: data?.transactionTypes.errors || initialState.data.errors,
      success: data?.transactionTypes.success || initialState.data.success,
      types: data?.transactionTypes.data || initialState.data.types,
    },
  };

  return {
    state,
  };
};
