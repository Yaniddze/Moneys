import { FC, useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  position: relative;
  width: 60px;
  height: 30px;
  -webkit-appearance: none;
  background: #bbb;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,0,0,.2);
  outline: none;
  transition: all .2s ease;
  
  &:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    transform: scale(1.2);
    background: white;
    left: 0;
    transition: all .2s ease;
  }
  
  &:checked:before {
    left: 30px;
  }
`;

const Wrapper = styled.div`
  margin: 10px;
`;

type PropTypes = {
  children?: never;
  value: boolean;
  handleChange: () => void;
}

export const ToggleSwitch: FC<PropTypes> = ({
  value, handleChange,
}: PropTypes) => (
  <Wrapper>
    <StyledInput
      checked={value}
      type="checkbox"
      onChange={handleChange}
    />
  </Wrapper>
);
