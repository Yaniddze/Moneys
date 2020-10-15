import { gql } from '@apollo/client';

import { Bill } from '../../domain/types';

export type Variables = {
  command: {
    userId: string;
  };
}

export type QueryAnswer = {
  bills: {
    data: Bill[];
    errors: string[];
    success: boolean;
  };
}

export const getBillsQuery = gql`
  query GetBills($command: GetBillsCommandInput!) {
    bills(command: $command) {
      data {
        id,
        title
      },
      errors,
      success
    } 
  }
`;
