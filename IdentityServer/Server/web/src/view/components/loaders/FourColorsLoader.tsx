import React, { FC } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position:absolute;
  top:20%;
  left:50%;
  transform:translate(-50%, -50%);
  /*change these sizes to fit into your project*/
  width:100px;
  height:100px;
  
  & hr {
    border:0;
    margin:0;
    width:40%;
    height:40%;
    position:absolute;
    border-radius:50%;
    animation:spin 2s ease infinite;
  }
  
  & :first-child {
    background:#19A68C;animation-delay:-1.5s;
  }
  
  & :nth-child(2) {
    background:#F63D3A;animation-delay:-1s;
  }
  
  & :nth-child(3) {
    background:#FDA543;
    animation-delay:-0.5s;
  }
  
  & :last-child {
    background:#193B48;
  }
  
  @keyframes spin {
    0%,100%{transform:translate(0)}
    25%{transform:translate(160%)}
    50%{transform:translate(160%, 160%)}
    75%{transform:translate(0, 160%)}
  }
`;

export const FourColorsLoader: FC = () => (
  <StyledDiv>
    <hr />
    <hr />
    <hr />
    <hr />
  </StyledDiv>
);
