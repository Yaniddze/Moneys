import styled from 'styled-components';

export const SquareButtonWithShadow = styled.button`
  padding: 10px;
  border: none;
  color: ${(props): string => props.theme.colors.button.contrast};
  background: ${(props): string => props.theme.colors.button.color};
  box-shadow: 3px 3px ${(props): string => props.theme.colors.secondary.contrast};
  transition: .2s all ease;
  font-size: ${(props): string => props.theme.font.btnFontSize};
  width: 100%;
  margin: 10px;
  
  &:active {
    box-shadow: none;
    transform: translate(3px, 3px);
  }
  
  &:hover {
    cursor: pointer;
  }
`;
