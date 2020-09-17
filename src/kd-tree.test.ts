import { Vector, vmagnitude2, vsub } from './algebra';
import { create, medianOfMedians, neighbourhood, printSelected } from './kd-tree';
import createBoids from './create';
import { Boid } from './types';

type Item = {
  location: Vector
}

describe('kd-tree', () => {
  it('test 1', () => {
    const boids = createBoids(500, 200, 200);

    const getLocation = (item: Boid) => item.position;
    const t0 = process.hrtime();
    const tree = create<Boid>(boids, getLocation);
    const delta = process.hrtime(t0);
    console.log('Duration: %fms', delta[0] * 1000 + delta[1] / 1000000.0);
  });

  it('test 1', () => {
    const items: Item[] = [
      { location: [67,2] },
      { location: [45,4] },
      { location: [29,6] },
      { location: [55,7] },
      { location: [88,1] },
      { location: [91,6] },
      { location: [34,7] },
      { location: [78,1] },
      { location: [69,6] },
      { location: [54,7] },
      { location: [58,1] },
      { location: [12,3] }
    ];

    const result = medianOfMedians<Item>(items, item => item.location[0]);
    expect(result).toEqual({ location: [55,7] });
  });

  it('search test', () => {
    const boids = createBoids(500, 200, 200);

    const currentBoid = boids[0];
    const epsilon = 30;

    const boidTree = create(boids, boid => boid.position);

    const t0 = process.hrtime()[1];

    const naiveNeighbours = boids
      .filter((boid) => vmagnitude2(vsub(currentBoid.position, boid.position)) <= epsilon * epsilon)
      .map(boid => boid.id)
      .sort();

      const t1 = process.hrtime()[1];

    const neighbours = neighbourhood(boidTree, currentBoid.position, epsilon)
      .map(boid => boid.id)
      .sort();

    const t2 = process.hrtime()[1];
    console.log('Greedy:', (t1 - t0)/1000, 'Tree:', (t2 - t1)/1000);
    expect(neighbours).toEqual(naiveNeighbours);
  });
});
