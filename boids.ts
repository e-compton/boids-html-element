import "./styles.css";
import { createBoidBuffer, BufferedBoids } from "./src/create";
import render from "./src/render";
import BoidWorker from "worker-loader!./src/worker";

export class Boids extends HTMLElement {
    worker: Worker

  constructor() {
    super();
    this.worker = new BoidWorker();

    const shadow = this.attachShadow({ mode: 'open' });

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '750');
    canvas.setAttribute('height', '600');
    shadow.appendChild(canvas);

    requestAnimationFrame(() => {
      const { width, height } = canvas.getBoundingClientRect();
      const boids = createBoidBuffer(500, width, height);
      const ctx = canvas.getContext("2d");
      const t0 = new Date().getTime();
      this.run(canvas, ctx, boids, t0);
    });
  }

  private run(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    boids: BufferedBoids,
    lastRender: number
  ): void {
    const now = new Date().getTime();
    const dt = Math.min(now - lastRender, 60);
    this.worker.postMessage({
        boids,
        dt,
        width: canvas.width,
        height: canvas.height
    });
    render(canvas, ctx, boids);
    this.worker.onmessage = event => {
        const newBoids = event.data.boids;
        requestAnimationFrame(() => this.run(canvas, ctx, newBoids, now));
    };
  }
}

customElements.define('flocking-boids', Boids);
