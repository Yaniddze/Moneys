import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding: 10px;
  background: ${(props): string => props.theme.colors.primary.color};
  color: ${(props): string => props.theme.colors.primary.contrast};
  
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
  display: flex;
  flex-direction: row;
  
  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }
`;
