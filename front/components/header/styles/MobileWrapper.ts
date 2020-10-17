import styled from 'styled-components';

type MobileWrapperProps = {
  offset: number;
}

export const MobileWrapper = styled.div<MobileWrapperProps>`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: ${(props): string => props.theme.colors.background.color};
  z-index: 10;
  transition: 0.2s all ease;
  left: 0;
  top: 0;
  font-size: 42px;
  margin-left: ${(props): string => `${props.offset}px`};
  padding-top: 80px;
  
  & > div {
    padding: 10px;
  }
  
  & > div > div {
    width: 100%;
    height: 100%;
    margin: 10px 0;
  }
  
  & button {
    font-size: 38px;
    width: 100%;
  }
`;
