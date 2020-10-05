// Core
import React, { FC, useState } from 'react';

// Components
import { Title } from '../styles';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useBills } from '../../../hooks/bills';
import { AdditionModal } from './AdditonModal';

type PropTypes = {
  children?: never;
}

export const BillsPage: FC<PropTypes> = () => {
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
      hidden={false}
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
};
