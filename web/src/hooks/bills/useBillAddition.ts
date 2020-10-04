// Core
import { useReactOidc } from '@axa-fr/react-oidc-context/dist';
import { useMutation } from '@apollo/client';

// Queries
import { addBillMutation, Variables } from '../../requests/mutations/addBillMutation';

type FetchingAnswer = {
  fetching: boolean;
  answer: Answer;
}

type Answer = {
  success: boolean;
  errors: string[];
  data: string;
}

type ReturnType = {
  state: FetchingAnswer;
  fetch: (title: string) => void;
}

const initialState: FetchingAnswer = {
  fetching: false,
  answer: {
    success: false,
    errors: [],
    data: '',
  },
};

export const useBillAddition = (): ReturnType => {
  const { oidcUser } = useReactOidc();
  const [addBill, { data, loading }] = useMutation<Answer, Variables>(addBillMutation);

  const fetch = (title: string): void => {
    addBill({
      variables: {
        request: {
          userId: oidcUser.profile['user.id'],
          title,
        },
      },
    });
  };

  const answer: FetchingAnswer = {
    fetching: loading,
    answer: {
      success: data?.success || initialState.answer.success,
      errors: data?.errors || initialState.answer.errors,
      data: data?.data || initialState.answer.data,
    },
  };

  return {
    state: answer,
    fetch,
  };
};
