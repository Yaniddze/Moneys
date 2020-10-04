import { gql } from '@apollo/client';

export type Variables = {
  command: {
    userId: string;
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
