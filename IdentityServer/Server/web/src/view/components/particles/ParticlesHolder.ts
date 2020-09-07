import { Particle } from './Particle';
import { Mouse } from './types';

export class ParticlesHolder {
  private particlesArray: Particle[] = []

  constructor(
    canvas: HTMLCanvasElement,
    mouse: Mouse,
    particleColor: string,
    connectLineColor: (opacity: number) => string,
  ) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d')!!;
    this.mouse = mouse;
    this.particleColor = particleColor;
    this.connectLineColor = connectLineColor;
    this.animationId = -1;
  }

  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  mouse: Mouse;

  particleColor: string;

  connectLineColor: (opacity: number) => string;

  private animationId: number;

  private randomCoordinate = (size: number, border: number): number => (
    Math.random() * ((border - size * 2) - (size * 2)) + size * 2
  );

  private randomDirection = (): number => (Math.random() * 5) - 2.5;

  fillParticlesArray(): void {
    this.particlesArray.length = 0;
    const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      const size = (Math.random() * 5) + 1;

      const x = this.randomCoordinate(size, window.innerWidth);
      const y = this.randomCoordinate(size, window.innerHeight);

      const directionX = this.randomDirection();
      const directionY = this.randomDirection();

      const color = this.particleColor;

      this.particlesArray.push(new Particle(
        x,
        y,
        directionX,
        directionY,
        size,
        color,
        this.canvasContext,
        this.canvas,
        this.mouse,
      ));
    }
  }

  private connectParticles(): void {
    const array = this.particlesArray;
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j < array.length; j++) {
        const distance = (
          (array[i].x - array[j].x) ** 2 + (array[i].y - array[j].y) ** 2
        );

        if (distance < (this.canvas.width / 7) * (this.canvas.height / 7)) {
          const opacity = 1 - (distance / 20000);
          const context = this.canvasContext;
          context.strokeStyle = this.connectLineColor(opacity);
          context.beginPath();
          context.moveTo(array[i].x, array[i].y);
          context.lineTo(array[j].x, array[j].y);
          context.stroke();
        }
      }
    }
  }

  animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    this.canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].update();
    }

    this.connectParticles();
  }

  stopAnimation = (): void => {
    window.cancelAnimationFrame(this.animationId);
  }
}
