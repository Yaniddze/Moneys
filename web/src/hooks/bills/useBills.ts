import { useQuery } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

import { getBillsQuery, Variables, QueryAnswer } from '../../requests/queries/getBillsQuery';

import { Bill } from '../../domain/types';

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
  const { oidcUser } = useReactOidc();

  const { loading, data } = useQuery<QueryAnswer, Variables>(getBillsQuery, {
    variables: {
      command: {
        userId: oidcUser.profile['user.id'],
      },
    },
  });

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
