import { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import ReactLoader from 'react-loader-spinner';

const Wrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;

  transform: translate(-80%, -50%);
`;

type PropTypes = {
  children?: never;
  visible: boolean;
}

export const Loader: FC<PropTypes> = ({
  visible,
}: PropTypes) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <ReactLoader 
        type="TailSpin"
        color={theme.colors.primary.color}
        height={100}
        width={100}
        visible={visible}
      />
    </Wrapper>
  );
};
