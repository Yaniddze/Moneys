import { gql } from '@apollo/client';

export const getBillsQuery = gql`
  query GetBills($command: GetBillsCommandInput!) {
    bills(command: $command) {
      data {
        id,
        title
      }
    } 
  }
`;
