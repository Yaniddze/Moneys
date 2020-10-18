import { gql } from '@apollo/client';

export const addTransactionMutation = gql`
  mutation AddBill($request: NewTransactionRequestInput!) {
    createTransaction(request: $request) {
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
