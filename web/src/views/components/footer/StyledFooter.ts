import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding: 10px;
  background: ${(props): string => props.theme.colors.footer.color};
  color: ${(props): string => props.theme.colors.footer.contrast};
`;
