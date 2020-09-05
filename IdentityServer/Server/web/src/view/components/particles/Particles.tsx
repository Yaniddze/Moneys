import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ParticlesHolder } from './ParticlesHolder';
import { Mouse } from './types';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(#ffc38c, #ff9b40);
`;

export const Particles: FC = () => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = ref.current!!;

    const mouse: Mouse = {
      x: -1,
      y: -1,
      radius: (canvas.height / 80) * (canvas.width / 80),
    };

    const particles = new ParticlesHolder(canvas, mouse);

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
      particles.init();
    };

    const handleMouseMove = (e: MouseEvent): void => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = (): void => {
      mouse.x = -1000000;
      mouse.y = -1000000;
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', handleResize);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousemove', handleMouseMove);

    particles.init();
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
