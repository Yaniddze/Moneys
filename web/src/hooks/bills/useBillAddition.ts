// Core
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';
import { useMutation } from '@apollo/client';

// Queries
import { addBillMutation, Variables } from '../../requests/mutations/addBillMutation';
import {
  getBillsQuery,
  Variables as QueryVariables,
} from '../../requests/queries/getBillsQuery';

type Bill = {
  id: string;
  title: string;
}

type FetchingAnswer = {
  fetching: boolean;
  answer: Answer;
}

type Answer = {
  success: boolean;
  errors: string[];
  data: Bill;
}

type QueryAnswer = {
  success: boolean;
  errors: string[];
  bills: Bill[];
}

type AnswerFromServer = {
  createBill: Answer;
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
  const [addBill, { loading }] = useMutation<AnswerFromServer, Variables>(addBillMutation,
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

            if (existingBills.bills.length > 0) {
              bills = [
                ...existingBills.bills,
                newBill,
              ];
            } else {
              bills = [
                newBill,
              ];
            }

            cache.writeQuery({
              query: getBillsQuery,
              variables: {
                command: {
                  userId: oidcUser.profile['user.id'],
                },
              },
              data: {
                bills,
                errors: existingBills.errors,
                success: existingBills.success,
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
    fetching: loading,
    answer: {
      success: initialState.answer.success,
      errors: initialState.answer.errors,
      data: initialState.answer.data,
    },
  };

  return {
    state: answer,
    fetch,
  };
};
