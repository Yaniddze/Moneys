import { useQuery } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';

import { getBillsQuery } from '../requests/queries/getBillsQuery';

type Bill = {
  id: string;
  title: string;
}

type ReturnType = {
  bills: Bill[];
}

export const useBills = (): ReturnType => {
  const { oidcUser } = useReactOidc();

  const { loading, error, data } = useQuery(getBillsQuery, {
    variables: {
      command: {
        userId: oidcUser.profile['user.id'],
      },
    },
  });

  let bills: Bill[] = [];

  if (!loading && error === undefined && data !== undefined) {
    bills = data.bills.data;
  }

  return {
    bills,
  };
};
