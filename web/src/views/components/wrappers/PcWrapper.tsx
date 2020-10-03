import React, { FC } from 'react';
import styled from 'styled-components';

import { Screens } from '../../../hooks/useScreens/types';
import { WrapperProps } from './types';

const Wrapper = styled.div`
  width: ${Screens.PC - 10}px;
  height: 100%;
  
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22); 
`;

const StructWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const PaddingWrapper = styled.div`
  padding: 20px 0;
  
  margin-left: auto;
  margin-right: auto;
`;

export const PcWrapper: FC<WrapperProps> = ({
  children,
}: WrapperProps) => (
  <StructWrapper>
    <PaddingWrapper>
      <Wrapper>
        <div style={{ padding: '10px' }}>
          {children}
        </div>
      </Wrapper>
    </PaddingWrapper>
  </StructWrapper>
);
