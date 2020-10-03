import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';
import { createClient } from '../configuration/apolloConfig';

type Bill = {
  id: string;
  title: string;
}

type ReturnType = {
  bills: Bill[];
}

export const useBills = (): ReturnType => {
  const [bills, setBills] = useState([]);
  const { oidcUser } = useReactOidc();
  const client = createClient(oidcUser.access_token);

  useEffect(() => {
    client.query({
      query: gql`
      query {
        bills(command: {userId: "${oidcUser.profile['user.id']}"}) {
          data {
            id,
            title
          }
        }
      }
    `,

    })
      .then((res) => {
        console.log(res.data);
        setBills(res.data.bills.data);
      });
  }, []);

  return {
    bills,
  };
};
