import styled from 'styled-components';

type PropTypes = {
  width?: string;
}

export const StyledInput = styled.input<PropTypes>`
  ${(props): string => (props.width ? `width: ${props.width};` : '')}
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  width: 100%;
  
  &:focus {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
