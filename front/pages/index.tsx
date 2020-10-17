// Core
import Header from 'next/head';

// Hooks
import { useBills } from '../hooks/bills';
import { usePageWrapper } from '../hooks/usePageWrapper';

// Styles
import {
  Title,
} from '../components/Title';

export default function HomePage(): JSX.Element {
  const { state } = useBills();
  const { Wrapper } = usePageWrapper();

  const loading = state.fetching && <div>Loading</div>;
  const errors = !state.fetching && !state.data.success && state.data.errors.map((er) => (
    <div>{er}</div>
  ));

  return (
    <Wrapper>
      <div>

        <Header>
          <title>
            Home
          </title>
        </Header>

        <Title>
          Домашняя страница
        </Title>
        {loading}
        {errors}
      </div>
    </Wrapper>
  );
}
