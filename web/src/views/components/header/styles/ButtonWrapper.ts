import styled from 'styled-components';
import { VerticalWrapper } from './VerticalWrapper';

export const ButtonWrapper = styled(VerticalWrapper)`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-right: 10px;
  
  & button {
    width: 80px;
  }
`;
