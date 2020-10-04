import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
  
  & svg {
    width: 100px;
    height: 100px;
    margin: 20px;
    display:inline-block;
  }
`;

type PropTypes = {
  children?: never;
}

export const SimpleLoader: FC<PropTypes> = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <svg
        version="1.1"
        id="L9"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
      >
        <path
          fill={theme.colors.background.contrast}
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </Wrapper>
  );
};
