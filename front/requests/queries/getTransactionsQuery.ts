import { gql } from '@apollo/client';

import { Transaction } from '../../domain/types';

export type Variables = {
  command: {
    userId: string;
  };
}

export type QueryAnswer = {
  transactions: {
    data: Transaction[];
    success: boolean;
    errors: string[];
  };
}

export const getTransactionsQuery = gql`
  query GetTransactions($command: GetTransactionsCommandInput!) {
    transactions(command: $command) {
      data {
        bill {
          id,
          title,
        },
        id,
        info {
          date,
          description,
          value,
        },
        type {
          id,
          title,
        },
      },
      errors,
      success
    }
  }
`;
