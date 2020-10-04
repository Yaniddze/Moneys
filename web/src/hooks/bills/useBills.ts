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
  data: Bill[];
}

type AnswerFromServer = {
  bills: Answer;
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
    data: [],
  },
};

export const useBills = (): ReturnType => {
  const { oidcUser } = useReactOidc();

  const { loading, data } = useQuery<AnswerFromServer, Variables>(getBillsQuery, {
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
