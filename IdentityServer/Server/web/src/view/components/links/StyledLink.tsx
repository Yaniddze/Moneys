import styled from 'styled-components';

export const StyledLink = styled.span`
  margin: 5px;
  color: ${(props): string => props.theme.colors.linkColor}
`;
