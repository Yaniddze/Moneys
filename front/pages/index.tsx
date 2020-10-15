// Core
import { FC } from 'react';

// Hooks
import { useBills } from '../hooks/bills';
import { usePageWrapper } from '../hooks/usePageWrapper';

// Styles
import {
  Title,
} from '../components/Title';

type PropTypes = {
  children?: never;
}

export const HomePage: FC<PropTypes> = () => {
  const { state } = useBills();
  const { Wrapper } = usePageWrapper();

  const loading = state.fetching && <div>Loading</div>;
  const errors = !state.fetching && !state.data.success && state.data.errors.map((er) => (
    <div>{er}</div>
  ));

  return (
    <Wrapper>
      <div>
        <Title>
          Домашняя страница
        </Title>
        {loading}
        {errors}
      </div>
    </Wrapper>
  );
};
