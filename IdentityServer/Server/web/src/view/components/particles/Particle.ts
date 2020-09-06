import { Mouse } from './types';

export class Particle {
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

  private checkBorderCollision = (coordinate: number, border: number): boolean => (
    coordinate > border || coordinate < 0
  );

  private checkPositiveCollision = (
    coordinate: number,
    collisionCoordinate: number,
    border: number,
    size: number,
  ): boolean => (
    collisionCoordinate < coordinate && coordinate < border - size * 10
  );

  private checkNegativeCollision = (
    coordinate: number,
    collisionCoordinate: number,
    size: number,
  ): boolean => (
    collisionCoordinate > coordinate && coordinate > size * 10
  );

  update(): void {
    if (this.checkBorderCollision(this.x, this.canvas.width)) {
      this.directionX = -this.directionX;
    }
    if (this.checkBorderCollision(this.y, this.canvas.height)) {
      this.directionY = -this.directionY;
    }

    const dx = this.mouse.x - this.x;
    const dy = this.mouse.y - this.y;

    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    const collisionOffset = 1;

    // Collision check
    if (distance < this.mouse.radius + this.size) {
      if (this.checkPositiveCollision(this.x, this.mouse.x, this.canvas.width, this.size)) {
        this.x += collisionOffset;
      }
      if (this.checkNegativeCollision(this.x, this.mouse.x, this.size)) {
        this.x -= collisionOffset;
      }
      if (this.checkPositiveCollision(this.y, this.mouse.y, this.canvas.height, this.size)) {
        this.y += collisionOffset;
      }
      if (this.checkNegativeCollision(this.y, this.mouse.y, this.size)) {
        this.y -= collisionOffset;
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
