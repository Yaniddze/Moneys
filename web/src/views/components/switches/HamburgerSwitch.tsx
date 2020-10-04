import React, { FC, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

type Props = {
  active: boolean;
}

const Wrapper = createGlobalStyle`
  .burger {
    width: 64px;
    height: 45px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
  }
  
  .burger span {
    display: block;
    position: absolute;
    height: 9px;
    width: 100%;
    background: ${(props): string => props.theme.colors.primary.contrast};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  }
  
  .burger span:nth-child(1) {
    top: 0px;
  }
  
  .burger span:nth-child(2) {
    top: 18px;
  }
  
  .burger span:nth-child(3) {
    top: 36px;
  }
  
  .burger.active span:nth-child(1) {
    top: 18px;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  
  .burger.active span:nth-child(2) {
    opacity: 0;
    left: -60px;
  }
  
  .burger.active span:nth-child(3) {
    top: 18px;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
`;

type PropTypes = {
  children?: never;
  handleClick: () => void;
}

export const HamburgerSwitch: FC<PropTypes> = (
  { handleClick }: PropTypes,
) => {
  const [active, setActive] = useState(false);

  const onClick = (): void => {
    handleClick();
    setActive((old) => !old);
  };

  return (
    <div
      onClick={onClick}
      className={`burger ${active && 'active'}`}
    >
      <Wrapper />
      <span />
      <span />
      <span />
    </div>
  );
};
