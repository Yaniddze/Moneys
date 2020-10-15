import styled from 'styled-components';
import { MinWidths } from '../../../hooks/useScreens/types';
import { VerticalWrapper } from './VerticalWrapper';

export const NavsWrapper = styled(VerticalWrapper)`
  width: 100%;
  
  @media(min-width: ${MinWidths.PC}px) {
    width: ${MinWidths.PC - 180}px;
    margin-left: auto;
    margin-right-auto;
  }
  
  & > div {
    display: flex;
  }
  
  & > div > div {
    margin-left: auto;
    margin-right: auto;
  }
`;
