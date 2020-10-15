import { gql } from '@apollo/client';
import { TransactionType } from '../../domain/types';

export type QueryAnswer = {
  transactionTypes: {
    data: TransactionType[];
    errors: string[];
    success: boolean;
  };
}

export const getTransactionTypeQuery = gql`
  query {
    transactionTypes {
      data {
        title,
        id,
      },
      errors,
      success
    }
  }
`;
