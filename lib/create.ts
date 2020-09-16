import { Boid } from './types';

export default function createBoids(count: number, width: number, height: number): Boid[] {
  return new Array(count).fill(0).map(() => ({
    id: randomId(),
    position: [randomCoordinate(0, width), randomCoordinate(0, height)],
    velocity: [Math.random() - 0.5, Math.random() - 0.5]
  }));
}

function randomId() {
  return Math.random().toString(36).substring(2, 15);
}

function randomCoordinate(min: number, max: number): number {
  return (max - min) * Math.random() + min;
}
