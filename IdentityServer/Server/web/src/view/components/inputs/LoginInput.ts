import styled from 'styled-components';

type PropTypes = {
  width?: string;
}

export const LoginInput = styled.input<PropTypes>`
  ${(props): string => (props.width ? `width: ${props.width};` : '')}
  padding: 10px;
  margin: 10px;
  border: 1px solid #D77A61;
  border-radius: 10px;
  background-color: #D8B4A0;
  color: black;
`;
