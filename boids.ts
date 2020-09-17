import "./styles.css";
import { Boid } from "./src/types";
import create from "./src/create";
import render from "./src/render";
import act from "./src/act";

export class Boids extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '750');
    canvas.setAttribute('height', '600');
    shadow.appendChild(canvas);

    requestAnimationFrame(() => {
      const { width, height } = canvas.getBoundingClientRect();
      const boids = create(500, width, height);
      const ctx = canvas.getContext("2d");
      const t0 = new Date().getTime();
      Boids.run(canvas, ctx, boids, t0);
    });
  }

  static run(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    boids: Boid[],
    lastRender: number
  ): void {
    const now = new Date().getTime();
    const dt = Math.min(now - lastRender, 60);
    render(canvas, ctx, boids);
    boids = act(boids, dt, canvas.width, canvas.height);
    requestAnimationFrame(() => Boids.run(canvas, ctx, boids, now));
  }
}

customElements.define('flocking-boids', Boids);
