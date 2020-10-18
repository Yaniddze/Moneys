// Core
import { useState } from 'react';
import Header from 'next/head';
import { Button } from '@material-ui/core';

// Components
import { Title } from '../components/Title';
import { Loader } from '../components/Loader';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useBills } from '../hooks/bills';

export default function Bills(): JSX.Element {
  const [modalOpened, setModalOpened] = useState(false);
  const { state } = useBills();
  const { Wrapper } = usePageWrapper();

  const handleModalClose = (): void => {
    setModalOpened(false);
  };

  const handleModalOpen = (): void => {
    setModalOpened(true);
  };

  const loading = state.fetching;
  const items = !state.fetching
    && state.data.success
    && state.data.data.map((bill) => (
      <div key={bill.id}>
        { bill.title }
      </div>
    ));

  return (
    <Wrapper>
      <div>

        <Loader
          visible={loading}
        />

        <Header>
          <title>
            Bills
          </title>
        </Header>
        
        <Title>
          Счета
        </Title>
        <div>
          { items }
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleModalOpen}
        >
          Click
        </Button>

      </div>
    </Wrapper>
  );
}
