import { Boid } from './types';

export default function createBoids(count: number, width: number, height: number): Boid[] {
  return new Array(count).fill(0).map(() => ({
    position: [randomCoordinate(0, width), randomCoordinate(0, height)],
    velocity: [Math.random() - 0.5, Math.random() - 0.5]
  }));
}

function randomCoordinate(min: number, max: number): number {
  return (max - min) * Math.random() + min;
}

export type BufferedBoids = {
  positionsX: Float32Array,
  positionsY: Float32Array,
  velocitiesX: Float32Array
  velocitiesY: Float32Array
}

export function createBoidBuffer(count: number, width: number, height: number): BufferedBoids {
  const positionsX = new Float32Array(count);
  const positionsY = new Float32Array(count);
  const velocitiesX = new Float32Array(count);
  const velocitiesY = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positionsX[i] = randomCoordinate(0, width);
    positionsY[i] = randomCoordinate(0, height);
    velocitiesX[i] = Math.random() - 0.5;
    velocitiesY[i] = Math.random() - 0.5;
  }

  return {
    positionsX,
    positionsY,
    velocitiesX,
    velocitiesY
  };
}

export function toBoidsArray(buffer: BufferedBoids): Boid[] {
  const boids = [];
  for (let i = 0; i < buffer.positionsX.length; i++) {
    boids.push({
      position: [buffer.positionsX[i], buffer.positionsY[i]],
      velocity: [buffer.velocitiesX[i], buffer.velocitiesY[i]]
    });
  }
  return boids;
}

export function toBoid(buffer: BufferedBoids, i: number): Boid {
  return {
    position: [buffer.positionsX[i], buffer.positionsY[i]],
    velocity: [buffer.velocitiesX[i], buffer.velocitiesY[i]]
  };
}

export function updateBuffer(buffer: BufferedBoids, boids: Boid[]): BufferedBoids {
  boids.forEach((boid, i) => {
    buffer.positionsX[i] = boid.position[0];
    buffer.positionsY[i] = boid.position[1];
    buffer.velocitiesX[i] = boid.velocity[0];
    buffer.velocitiesY[i] = boid.velocity[1];
  });
  return buffer;
}