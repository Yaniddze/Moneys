// Core
import React, { FC, useState } from 'react';

// Components
import { Title } from '../styles';
import { SimpleLoader } from '../../components/loaders';
import { ModalContainer } from '../../components/modals';
import { InputWithAnimatedSpan } from '../../components/inputs';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useBills } from '../../../hooks/bills';
import { useBillAddition } from '../../../hooks/bills/useBillAddition';

type PropTypes = {
  children?: never;
}

export const BillsPage: FC<PropTypes> = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { state } = useBills();
  const addition = useBillAddition();
  const { Wrapper } = usePageWrapper();

  const loader = state.fetching && <SimpleLoader />;
  const items = !state.fetching
    && state.data.success
    && state.data.data.map((bill) => (
      <div key={bill.id}>
        { bill.title }
      </div>
    ));

  const modal = modalOpened && (
    <ModalContainer
      handleClose={(): void => {
        setModalOpened(false);
      }}
      hidden={!modalOpened}
    >
      <form>
        <InputWithAnimatedSpan
          labelText="Title"
          inputName="title"
          inputType="text"
          onChange={() => {}}
        />
      </form>
    </ModalContainer>
  );

  return (
    <Wrapper>
      <div>
        { modal }
        { loader }
        <Title>
          124
        </Title>
        <div>
          { items }
        </div>
        <button
          type="button"
          onClick={(): void => {
            setModalOpened((old) => !old);
          }}
        >
          Click
        </button>

      </div>
    </Wrapper>
  );
};
