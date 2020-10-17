// Core
import { useState } from 'react';
import Header from 'next/head';

// Components
import { Title } from '../../components/Title';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../../hooks/usePageWrapper';
import { useBills } from '../../hooks/bills';
import { AdditionModal } from './AdditonModal';

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

  const modal = modalOpened && (
    <AdditionModal
      handleClose={handleModalClose}
    />
  );

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
        
        { modal }
        { loader }
        <Title>
          Счета
        </Title>
        <div>
          { items }
        </div>
        <button
          type="button"
          onClick={handleModalOpen}
        >
          Click
        </button>

      </div>
    </Wrapper>
  );
}
