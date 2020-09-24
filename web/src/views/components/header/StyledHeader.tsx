import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding: 10px;
  background: ${(props): string => props.theme.colors.primary.color};
  color: ${(props): string => props.theme.colors.primary.contrast}
`;
