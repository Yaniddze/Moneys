import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(#ffc38c, #ff9b40);
`;

type Mouse = {
  x: number;
  y: number;
  radius: number;
}

class Particle {
  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: Mouse,
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
    this.canvas = canvas;
    this.mouse = mouse;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = '#8c5523';
    this.ctx.fill();
  }

  update(): void {
    if (this.x > this.canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    const dx = this.mouse.x - this.x;
    const dy = this.mouse.y - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.mouse.radius + this.size) {
      if (this.mouse.x < this.x && this.x < this.canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (this.mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (this.mouse.y < this.y && this.y < this.canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (this.mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }

  x: number;

  y: number;

  directionX: number;

  directionY: number;

  size: number;

  color: string;

  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  mouse: Mouse;
}

export const Particles: FC = () => {
  const ref = useRef<HTMLCanvasElement>();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');

    let handleResize: () => void;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleMouseOut: () => void;

    if (canvas !== undefined && context !== undefined && context !== null) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particlesArray: Particle[] = [];
      const mouse = {
        x: -1,
        y: -1,
        radius: (canvas.height / 80) * (canvas.width / 80),
      };

      handleMouseMove = (e): void => {
        mouse.x = e.x;
        mouse.y = e.y;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const init = (): void => {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
          const size = (Math.random() * 5) + 1;
          const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
          const y = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
          const directionX = (Math.random() * 5) - 2.5;
          const directionY = (Math.random() * 5) - 2.5;
          const color = '#8c5523';

          particlesArray.push(new Particle(
            x,
            y,
            directionX,
            directionY,
            size,
            color,
            context,
            canvas,
            mouse,
          ));
        }
      };

      const connect = (): void => {
        for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i; j < particlesArray.length; j++) {
            const distance = ((particlesArray[i].x - particlesArray[j].x)
              * (particlesArray[i].x - particlesArray[j].x))
              + ((particlesArray[i].y - particlesArray[j].y)
              * (particlesArray[i].y - particlesArray[j].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
              const opacity = 1 - (distance / 20000);
              context.strokeStyle = `rgba(140,85,31,${opacity})`;
              context.beginPath();
              context.moveTo(particlesArray[i].x, particlesArray[i].y);
              context.lineTo(particlesArray[j].x, particlesArray[j].y);
              context.stroke();
            }
          }
        }
      };

      const animate = (): void => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
        }

        connect();
      };

      handleResize = (): void => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
      };

      handleMouseOut = (): void => {
        mouse.x = -100;
        mouse.y = -100;
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mouseout', handleMouseOut);

      init();
      animate();
    }
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
