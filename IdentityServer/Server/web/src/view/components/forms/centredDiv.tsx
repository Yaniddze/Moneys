import styled from 'styled-components';

// type Border = {
//   radius?: string;
//   color: string;
//   thickness: number;
// }
//
// type PropTypes = {
//   padding: number;
//   border?: Border;
// }

export const CentredDiv = styled.div`
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
`;
