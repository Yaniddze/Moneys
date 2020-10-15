import styled from 'styled-components';

export const Title = styled.div`
  font-size: 42px;
  color: ${(props): string => props.theme.colors.background.contrast};
  font-weight: bold;
`;
