import { gql } from '@apollo/client';

export const addTransactionMutation = gql`
  mutation AddBill($request: NewTransactionRequestInput!) {
    createTransaction(request: $request) {
      data {
        bill,
        id,
        info,
        type
      },
      errors,
      success
    } 
  }
`;
