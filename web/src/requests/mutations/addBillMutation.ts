import { gql } from '@apollo/client';

import { Bill } from '../../domain/types';

export type Variables = {
  request: {
    userId: string;
    title: string;
  };
}

type Answer = {
  success: boolean;
  errors: string[];
  data: Bill;
}

export type MutationAnswer = {
  createBill: Answer;
}

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
