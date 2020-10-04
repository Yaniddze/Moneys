import { gql } from '@apollo/client';

export type Variables = {
  request: {
    userId: string;
    title: string;
  };
}

export const addBillMutation = gql`
  mutation AddBill($request: NewBillRequestInput!) {
    createBill(request: $request) {
      data,
      errors,
      success
    } 
  }
`;