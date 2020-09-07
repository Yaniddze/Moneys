// Core
import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';

// Components
import { LabelAnimationStyles } from './LabelAnimationStyles';
import { StyledInput } from './StyledInput';

type PropTypes = {
  children?: never;
  labelText: string;
  inputName: string;
  onChange: (e: InputChangeEvent) => void;
};

export type InputChangeEvent = {
  name: string;
  newText: string;
};

const Wrapper = styled.div`
  margin-top: 10px;
`;

export const InputWithAnimatedSpan: FC<PropTypes> = (
  { labelText, inputName, onChange }: PropTypes,
) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const text = e.target.value;

    setInputValue(text);

    onChange({
      name: inputName,
      newText: text,
    });
  };

  return (
    <Wrapper>
      <LabelAnimationStyles />
      <StyledInput
        name={inputName}
        onChange={handleInput}
      />
      <span
        className={`${inputValue.length > 0 ? 'form-label__to-up' : 'form-label__to-down'} form-label`}
      >
        {labelText}
      </span>
    </Wrapper>
  );
};
