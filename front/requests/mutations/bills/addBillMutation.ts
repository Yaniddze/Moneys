import { gql } from '@apollo/client';

export const addBillMutation = gql`
  mutation AddBill($request: NewBillRequestInput!) {
    createBill(request: $request) {
      data {
        id,
        title
      },
      errors,
      success
    } 
  }
`;
