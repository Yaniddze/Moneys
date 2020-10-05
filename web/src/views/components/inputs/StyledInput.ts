import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  width: 100%;
  
  color:${(props): string => props.theme.colors.background.contrast};
  background:${(props): string => props.theme.colors.background.color};
  
  &:focus {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
