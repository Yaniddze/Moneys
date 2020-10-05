import React, { FC, ReactElement, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';

const EnterAnim = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 0.2;
  }
`;

type BackgroundProps = {
  hidden: boolean;
}

const BackgroundWrapper = styled.div<BackgroundProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.2 !important;
  background: black;
  z-index: 12;
  
  animation: ${EnterAnim} 0.2s linear normal;
  
  ${(props): string => (props.hidden && 'display: none;') || ''}
`;

const ContentWrapper = styled.div`
  position: fixed;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22); 
  border-radius: 10px;
  opacity: 1.0 !important;
  color: ${(props): string => props.theme.colors.background.contrast};
  background: ${(props): string => props.theme.colors.background.color};
  z-index: 13;
  width: auto;
  height: auto;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    <div>
      <BackgroundWrapper
        className={(hidden && 'hide') || ''}
        onClick={handleClick}
        hidden={hidden}
      />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </div>
  );
};
