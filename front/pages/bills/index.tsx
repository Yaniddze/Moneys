// Core
import { useState } from 'react';
import Header from 'next/head';
import { Button } from '@material-ui/core';

// Components
import { Title } from '../../components/Title';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../../hooks/usePageWrapper';
import { useBills } from '../../hooks/bills';

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

  const loader = state.fetching && <SimpleLoader />;
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

        <Header>
          <title>
            Bills
          </title>
        </Header>
        
        { loader }
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
