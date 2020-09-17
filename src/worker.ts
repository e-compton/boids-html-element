import act from './act';
import { BufferedBoids } from './create';

const ctx: Worker = self as any;

type Event = {
  data: {
    boids: BufferedBoids,
    dt: number,
    width: number,
    height: number
  }
}

ctx.addEventListener("message", (event: Event) => {
  const { boids, dt, width, height } = event.data;

  const newBoids = act(boids, dt, width, height);

  ctx.postMessage({ boids: newBoids });
});