import { Boid } from "./types";
import { BufferedBoids } from './create';
import {
  Vector,
  angleOfVector,
  composeTransformation,
  transform,
} from "./algebra";

const triangle: Vector[] = [
  [-5, 0],
  [-7, 5],
  [5, 0],
  [-7, -5],
];

export default function render(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  boids: BufferedBoids
): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < boids.positionsX.length; i++) {
    drawBoid(ctx, {
      position: [boids.positionsX[i], boids.positionsY[i]],
      velocity: [boids.velocitiesX[i], boids.velocitiesY[i]]
    });
  }
}

function drawBoid(ctx: CanvasRenderingContext2D, boid: Boid) {
  const orientation = angleOfVector(boid.velocity);
  const transformation = composeTransformation(boid.position, orientation);
  const points = transform(transformation, triangle);
  drawShape(ctx, points);
}

function drawShape(ctx, points: Vector[]): void {
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      ctx.moveTo(points[i][0], points[i][1]);
    } else {
      ctx.lineTo(points[i][0], points[i][1]);
    }
  }
  ctx.fill();
}
