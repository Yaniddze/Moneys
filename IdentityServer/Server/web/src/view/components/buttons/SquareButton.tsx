import styled from 'styled-components';

export const SquareButton = styled.button`
  padding: 10px;
  border: none;
  background: #62E200;
  box-shadow: 3px 3px #62AA2A;
  transition: .2s all ease;
  font-size: 15px;
  
  &:active {
    box-shadow: none;
    transform: translate(3px, 3px);
  }
  
  &:hover {
    cursor: pointer;
  }
`;
