// Core
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';
import { useMutation } from '@apollo/client';

// Queries
import {
  addBillMutation,
  Variables,
  MutationAnswer,
} from '../../requests/mutations/addBillMutation';
import {
  getBillsQuery,
  Variables as QueryVariables,
  QueryAnswer,
} from '../../requests/queries/getBillsQuery';

// Types
import { Bill } from '../../domain/types';

type FetchingAnswer = {
  fetching: boolean;
  answer: {
    data: Bill;
    errors: string[];
    success: boolean;
  };
}

type ReturnType = {
  state: FetchingAnswer;
  fetch: (title: string) => void;
}

const initialState: FetchingAnswer = {
  fetching: false,
  answer: {
    success: false,
    errors: [],
    data: {
      id: '',
      title: '',
    },
  },
};

export const useBillAddition = (): ReturnType => {
  const { oidcUser } = useReactOidc();
  const [addBill, options] = useMutation<MutationAnswer, Variables>(addBillMutation,
    {
      update(cache, { data }) {
        if (data !== undefined && data !== null) {
          const newBill: Bill = {
            id: data.createBill.data.id,
            title: data.createBill.data.title,
          };
          const existingBills = cache.readQuery<QueryAnswer, QueryVariables>({
            query: getBillsQuery,
            variables: {
              command: {
                userId: oidcUser.profile['user.id'],
              },
            },
          });

          if (existingBills !== undefined && existingBills !== null) {
            let bills: Bill[];

            if (existingBills.bills.data.length > 0) {
              bills = [
                ...existingBills.bills.data,
                newBill,
              ];
            } else {
              bills = [
                newBill,
              ];
            }

            cache.writeQuery<QueryAnswer, QueryVariables>({
              query: getBillsQuery,
              variables: {
                command: {
                  userId: oidcUser.profile['user.id'],
                },
              },
              data: {
                bills: {
                  data: bills,
                  errors: existingBills.bills.errors,
                  success: existingBills.bills.success,
                },
              },
            });
          }
        }
      },
    });

  const fetch = (title: string): void => {
    addBill({
      variables: {
        request: {
          userId: oidcUser.profile['user.id'],
          title,
        },
      },
    });
  };

  const answer: FetchingAnswer = {
    fetching: options.loading,
    answer: {
      success: options.data?.createBill.success || initialState.answer.success,
      errors: options.data?.createBill.errors || initialState.answer.errors,
      data: options.data?.createBill.data || initialState.answer.data,
    },
  };

  return {
    state: answer,
    fetch,
  };
};
