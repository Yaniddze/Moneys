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
