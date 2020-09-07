import React, {
  FC,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { ParticlesHolder } from './ParticlesHolder';
import { Mouse } from './types';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(#A6F16C, #62E200);
`;

type PropTypes = {
  children?: never;
}

export const Particles: FC<PropTypes> = () => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = ref.current!!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const calcMouseRadius = (height: number, width: number): number => (
      (height / 100) * (width / 100)
    );

    const mouse: Mouse = {
      x: -1000000,
      y: -1000000,
      radius: calcMouseRadius(canvas.height, canvas.width),
    };

    const particles = new ParticlesHolder(canvas, mouse);

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.radius = calcMouseRadius(canvas.height, canvas.width);
      particles.fillParticlesArray();
    };

    const handleMouseMove = (e: MouseEvent): void => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = (): void => {
      mouse.x = -1000000;
      mouse.y = -1000000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousemove', handleMouseMove);

    particles.fillParticlesArray();
    particles.animate();

    return (): void => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return (<Canvas ref={ref} />);
};
