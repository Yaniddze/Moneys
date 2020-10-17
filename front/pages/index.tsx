// Core
import Header from 'next/head';

// Hooks
import { useBills } from '../hooks/bills';
import { usePageWrapper } from '../hooks/usePageWrapper';

// Styles
import { Title } from '../components/Title';
import { Loader } from '../components/Loader';

export default function HomePage(): JSX.Element {
  const { state } = useBills();
  const { Wrapper } = usePageWrapper();

  const loading = state.fetching;
  const errors = !state.fetching && !state.data.success && state.data.errors.map((er) => (
    <div>{er}</div>
  ));

  return (
    <Wrapper>
      <div>
        
        <Loader
          visible={loading}
        />

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
