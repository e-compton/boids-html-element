import { vadd, vscale, vsub, vclamp, vmagnitude2, Vector } from "./algebra";
import { Boid } from "./types";
import { iterativeCreate, iterativeNeighbourhood, Node } from './kd-tree';
import { BufferedBoids, toBoidsArray, updateBuffer, toBoid } from "./create";

export default function act(
  bufferedBoids: BufferedBoids,
  delta: number,
  width: number,
  height: number
): BufferedBoids {
  const boids = toBoidsArray(bufferedBoids);
  const boidIndexes = [...Array(boids.length).keys()];
  const kdtree = iterativeCreate<number>(boidIndexes, getLocation);
  const newBoids = boids.map((currentBoid) => updateBoid(bufferedBoids, kdtree, currentBoid, delta, width, height));
  updateBuffer(bufferedBoids, newBoids);
  return bufferedBoids;

  function getLocation(index: number) {
    return <Vector>[bufferedBoids.positionsX[index], bufferedBoids.positionsY[index]];
  }
}

const NEIGHBOUGH_DISTANCE = 30;
const COLLISION_DISTANCE_SQUARED = 10 ** 2;

function updateBoid(buffer: BufferedBoids, boidTree: Node<number>, currentBoid: Boid, delta, width, height) {
  const neighbourIndexes = iterativeNeighbourhood(boidTree, currentBoid.position, NEIGHBOUGH_DISTANCE);
  const neighbours = neighbourIndexes.map(index => toBoid(buffer, index));
  
  return {
    position: vadd(currentBoid.position, vscale(currentBoid.velocity, delta / 4)),
    velocity: vclamp(
      vadd(
        vadd(
          currentBoid.velocity,
          vscale(rule1(neighbours, currentBoid), 0.001)
        ),
        vadd(
          vscale(rule2(neighbours, currentBoid, [width, height]), 0.005),
          vscale(rule3(neighbours, currentBoid), 0.12)
        )
      ),
      1
    ),
  };
}

function rule1(neighbours: Boid[], currentBoid: Boid): Vector {
  // Boids try to fly towards the centre of mass of neighbouring boids.
  if (neighbours.length === 0) {
    return [0, 0];
  }

  const totalPosition = neighbours
    .map((boid) => boid.position)
    .reduce((total, current) => vadd(total, current), [0, 0]);

  const perceivedCentre = vscale(totalPosition, 1 / neighbours.length);

  const centreDirection = vsub(perceivedCentre, currentBoid.position);

  return centreDirection;
}

function rule2(neighbours: Boid[], currentBoid: Boid, limits: Vector): Vector {
  // Boids try to keep a small distance away from other boids and obstacles.
  const boidAvoidance = neighbours
    .map((boid) => vsub(currentBoid.position, boid.position))
    .filter((direction) => vmagnitude2(direction) < COLLISION_DISTANCE_SQUARED)
    .map((direction) => vscale(direction, 2))
    .reduce((total, current) => vadd(total, current), [0, 0]);

  const eps2 = 200;
  const edgeAvoidance = <Vector>[
    currentBoid.position[0] < eps2
      ? eps2
      : 0 + limits[0] - currentBoid.position[0] < eps2
      ? -eps2
      : 0,
    currentBoid.position[1] < eps2
      ? eps2
      : 0 + limits[1] - currentBoid.position[1] < eps2
      ? -eps2
      : 0,
  ];

  return vadd(boidAvoidance, vscale(edgeAvoidance, 0.1));
}

function rule3(neighbours: Boid[], currentBoid: Boid): Vector {
  // Boids try to match velocity with near boids.
  if (neighbours.length === 0) {
    return [0, 0];
  }

  const totalVelocity = neighbours
    .map((boid) => boid.velocity)
    .reduce((total, current) => vadd(total, current), [0, 0]);

  const perceivedVelocity = vscale(totalVelocity, 1 / neighbours.length);

  return perceivedVelocity;
}
