import "./styles.css";
import { createBoidBuffer, BufferedBoids } from "./src/create";
import render from "./src/render";
import BoidWorker from "worker-loader!./src/worker";

export class Boids extends HTMLElement {
    worker: Worker
    _isRunning = true;
    startStop: HTMLButtonElement;

  constructor() {
    super();
    this.worker = new BoidWorker();

    const shadow = this.attachShadow({ mode: 'open' });

    this.startStop = document.createElement('button');
    this.startStop.innerHTML = 'pause';
    this.startStop.addEventListener('click', () => this.isRunning = !this.isRunning, false);
    shadow.appendChild(this.startStop);

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

  set isRunning(value: boolean) {
    this._isRunning = value;
    if (value) {
      this.startStop.innerHTML = 'pause';
    } else {
      this.startStop.innerHTML = 'play';
    }
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  private run(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    boids: BufferedBoids,
    lastRender: number
  ): void {
    const now = new Date().getTime();
    const dt = Math.min(now - lastRender, 60);

    if (!this.isRunning) {
      requestAnimationFrame(() => this.run(canvas, ctx, boids, now));
      return;
    }

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
