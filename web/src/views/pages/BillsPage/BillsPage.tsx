// Core
import React, { FC } from 'react';

// Components
import { Title } from '../styles';
import { SimpleLoader } from '../../components/loaders';

// Hooks
import { usePageWrapper } from '../hooks/usePageWrapper';
import { useBills } from '../../../hooks/useBills';

type PropTypes = {
  children?: never;
}

export const BillsPage: FC<PropTypes> = () => {
  const { state } = useBills();
  const { Wrapper } = usePageWrapper();

  const loader = state.fetching && <SimpleLoader />;
  const items = !state.fetching
    && state.data.success
    && state.data.bills.map((bill) => (
      <div key={bill.id}>
        { bill.title }
      </div>
    ));

  return (
    <Wrapper>
      <div>
        { loader }
        <Title>
          124
        </Title>
        <div>
          { items }
        </div>
      </div>
    </Wrapper>
  );
};
