import React, { FC, ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';

type BackgroundProps = {
  hidden: boolean;
}

const BackgroundWrapper = styled.div<BackgroundProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.2;
  background: black;
  z-index: 12;
  
  transition: 0.2s all ease;
  
  ${(props): string => (props.hidden && 'display: none;') || ''}
`;

const ContentWrapper = styled.div`
  position: fixed;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22); 
  border-radius: 10px;
  
  width: auto;
  height: auto;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background: white;
`;

type PropTypes = {
  children: ReactElement;
  handleClose: () => void;
  hidden: boolean;
}

export const ModalContainer: FC<PropTypes> = (
  { children, handleClose, hidden }: PropTypes,
) => {
  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <BackgroundWrapper
      className={(hidden && 'hide') || ''}
      onClick={handleClick}
      hidden={hidden}
    >
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </BackgroundWrapper>
  );
};
