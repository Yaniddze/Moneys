import styled from 'styled-components';
import { Screens } from '../../../../hooks/useScreens/types';
import { VerticalWrapper } from './VerticalWrapper';

export const NavsWrapper = styled(VerticalWrapper)`
  width: 100%;
  
  @media(min-width: ${Screens.PC}px) {
    width: ${Screens.PC - 180}px;
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
