import { useQuery } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

import { getBillsQuery, Variables } from '../../requests/queries/getBillsQuery';

type Bill = {
  id: string;
  title: string;
}

type Answer = {
  success: boolean;
  errors: string[];
  bills: Bill[];
}

type FetchingBills = {
  fetching: boolean;
  data: Answer;
}

type ReturnType = {
  state: FetchingBills;
}

const initState: FetchingBills = {
  fetching: false,
  data: {
    success: false,
    errors: [],
    bills: [],
  },
};

export const useBills = (): ReturnType => {
  const { oidcUser } = useReactOidc();

  const { loading, data } = useQuery<Answer, Variables>(getBillsQuery, {
    variables: {
      command: {
        userId: oidcUser.profile['user.id'],
      },
    },
  });

  const bills = {
    fetching: loading,
    data: {
      success: data?.success || initState.data.success,
      errors: data?.errors || initState.data.errors,
      bills: data?.bills || initState.data.bills,
    },
  };

  return {
    state: bills,
  };
};
