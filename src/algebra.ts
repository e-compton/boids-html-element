export type Vector = [number, number];

type AffineMatrix = [
  [number, number, number],
  [number, number, number],
  [number, number, 1]
];

export function vadd(v1: Vector, v2: Vector): Vector {
  // const [v2, ...additionalVectors] = vectors;
  const sum = <Vector>[
    v1[0] + v2[0],
    v1[1] + v2[1]
  ];
  return sum;

  // if (additionalVectors.length === 0) {
  //   return sum;
  // }

  // return vadd(sum, ...additionalVectors);
}

export function vsub(v1: Vector, v2: Vector): Vector {
  // return <Vector>v1.map((value, i) => value - v2[i]);
  return <Vector>[
    v1[0] - v2[0],
    v1[1] - v2[1]
  ];
}

export function vscale(v: Vector, s: number): Vector {
  // return <Vector>v.map((value) => value * s);
  return <Vector>[
    v[0] * s,
    v[1] * s
  ];
}

export function vmod(v: Vector, n: Vector): Vector {
  return <Vector>v.map((x, i) => ((x % n[i]) + n[i]) % n[i]);
}

export function vmagnitude(v: Vector): number {
  return Math.sqrt(vmagnitude2(v));
}

export function vmagnitude2(v: Vector): number {
  // return v
  //   .map((value) => value * value)
  //   .reduce((a, b) => a + b, 0);
  return v[0] * v[0] + v[1] * v[1];
}

export function vclamp(v: Vector, n: number): Vector {
  const magnitude = vmagnitude(v);
  return vscale(v, n / magnitude);
}

export function angleOfVector(vector: Vector): number {
  return Math.atan2(vector[1], vector[0]);
}

export function composeTransformation(position: Vector, orientation: number): AffineMatrix {
  return [
    [
      Math.cos(orientation),
      -Math.sin(orientation),
      position[0]
    ],
    [
      Math.sin(orientation),
      Math.cos(orientation),
      position[1]
    ],
    [0, 0, 1]
  ];
}

export function transform(transformation: AffineMatrix, points: Vector[]): Vector[] {
  return points.map(point => [
    transformation[0][0] * point[0] + transformation[0][1] * point[1] + transformation[0][2],
    transformation[1][0] * point[0] + transformation[1][1] * point[1] + transformation[1][2],
  ]);
}
