import act from './act';
import create from './create';

describe('act', () => {
  it.skip('test 1', () => {
    const boids = create(200, 500, 500);

    for (let i = 0; i < 200; i++) {
      act(boids, 16, 500, 500);
    }
  });
});