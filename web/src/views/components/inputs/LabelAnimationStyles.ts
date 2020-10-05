import { createGlobalStyle } from 'styled-components';

export const LabelAnimationStyles = createGlobalStyle`
  .form-label__to-up {
    margin-top: -10px;
    font-size: 13px;
  }
  
  .form-label__to-down {
    margin-top: 20px;
  }
  
  .form-label {
    position: absolute;
    left: 0;
    margin-left: 40px;
    transition: .5s all ease
  }
`;
