// Core
import { useMutation } from '@apollo/client';

// Query
import { addTransactionMutation } from '../../requests/mutations/transactions';
import {
  getTransactionsQuery,
  Variables,
  QueryAnswer,
} from '../../requests/queries/getTransactionsQuery';

// Types
import {
  AddTransactionMutationAnswer,
  AddTransactionVariables,
} from '../../requests/mutations/transactions/types';
import { Transaction } from '../../domain/types';
import { useUserStorage } from '../storage/useUserStorage';

type FetchingType = {
  fetching: boolean;
  data: {
    data: Transaction;
    errors: string[];
    success: boolean;
  };
}

type ReturnType = {
  fetch: (
    billId: string,
    date: Date,
    description: string,
    typeId: string,
    value: number,
  ) => void;
  state: FetchingType;
}

const initState: FetchingType = {
  fetching: false,
  data: {
    success: false,
    errors: [],
    data: {
      bill: {
        id: '',
        title: '',
      },
      type: {
        id: '',
        title: '',
      },
      info: {
        description: '',
        date: new Date(),
        value: -1,
      },
      id: '',
    },
  },
};

export const useTransactionAddition = (): ReturnType => {
  const { user } = useUserStorage();
  const [addTransaction, options] = useMutation<
    AddTransactionMutationAnswer, AddTransactionVariables
  >(
    addTransactionMutation,
    {
      update(cache, { data }) {
        if (data !== undefined && data !== null) {
          const newTransaction: Transaction = {
            id: data.createTransaction.data.id,
            info: data.createTransaction.data.info,
            bill: data.createTransaction.data.bill,
            type: data.createTransaction.data.type,
          };

          const existingTransactions = cache.readQuery<QueryAnswer, Variables>({
            query: getTransactionsQuery,
            variables: {
              command: {
                userId: user.profile['user.id'],
              },
            },
          });

          if (existingTransactions !== undefined && existingTransactions !== null) {
            let transactions: Transaction[];

            if (existingTransactions.transactions.data.length > 0) {
              transactions = [
                ...existingTransactions.transactions.data,
                newTransaction,
              ];
            } else {
              transactions = [newTransaction];
            }

            cache.writeQuery<QueryAnswer, Variables>({
              query: getTransactionsQuery,
              variables: {
                command: {
                  userId: user.profile['user.id'],
                },
              },
              data: {
                transactions: {
                  data: transactions,
                  success: existingTransactions.transactions.success,
                  errors: existingTransactions.transactions.errors,
                },
              },
            });
          }
        }
      },
    },
  );

  const fetch = (
    billId: string,
    date: Date,
    description: string,
    typeId: string,
    value: number,
  ): void => {
    addTransaction({
      variables: {
        billId,
        date,
        description,
        typeId,
        userId: user.profile['user.id'],
        value,
      },
    });
  };

  const state: FetchingType = {
    fetching: options.loading,
    data: {
      data: {
        id: options.data?.createTransaction.data.id || initState.data.data.id,
        info: options.data?.createTransaction.data.info || initState.data.data.info,
        type: options.data?.createTransaction.data.type || initState.data.data.type,
        bill: options.data?.createTransaction.data.bill || initState.data.data.bill,
      },
      errors: options.data?.createTransaction.errors || initState.data.errors,
      success: options.data?.createTransaction.success || initState.data.success,
    },
  };

  return {
    state,
    fetch,
  };
};
