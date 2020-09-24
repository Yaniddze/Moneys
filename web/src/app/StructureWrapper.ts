import styled from 'styled-components';

export const StructureWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 80px auto 120px;
  
  & > header {
    grid-row-start: 1;
  }
  
  & > main {
    grid-row-start: 2;
  }
  
  & > footer {
    grid-row-start: 3;
  }
`;
