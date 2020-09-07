import styled from 'styled-components';

export const SquareButton = styled.button`
  padding: 10px;
  border: none;
  color: ${(props): string => props.theme.font.btnFontColor};
  background: ${(props): string => props.theme.colors.main};
  box-shadow: 3px 3px ${(props): string => props.theme.colors.secondary};
  transition: .2s all ease;
  font-size: ${(props): string => props.theme.font.btnFontSize};
  
  &:active {
    box-shadow: none;
    transform: translate(3px, 3px);
  }
  
  &:hover {
    cursor: pointer;
  }
`;
