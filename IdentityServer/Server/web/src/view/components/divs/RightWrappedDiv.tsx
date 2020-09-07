import styled from 'styled-components';

export const RightWrappedDiv = styled.div`
  display: flex;
  & > * {
    margin-left: auto;
  }
`;
