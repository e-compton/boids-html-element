import { Vector, vmagnitude2, vsub } from "./algebra";

export interface Node<V> {
  location: Vector;
  value: V;
  leftChild: Node<V>;
  rightChild: Node<V>;
}

export function create<V>(
  pointsList: V[],
  getLocation: (V) => Vector,
  depth = 0
): Node<V> {
  if (pointsList.length === 0) {
    return null;
  }

  const axis = depth % 2;

  const median = medianOfMedians<V>(
    pointsList,
    (value) => getLocation(value)[axis]
  );
  const medianLocation = getLocation(median);

  const leftPoints = pointsList.filter(
    (point) => getLocation(point)[axis] < medianLocation[axis]
  );
  const rightPoints = pointsList.filter(
    (point) => getLocation(point)[axis] > medianLocation[axis]
  );

  return <Node<V>>{
    location: medianLocation,
    value: median,
    leftChild: create<V>(leftPoints, getLocation, depth + 1),
    rightChild: create<V>(rightPoints, getLocation, depth + 1),
  };
}

export function neighbourhood<V>(
  root: Node<V>,
  target: Vector,
  epsilon: number,
  depth = 0
): V[] {
  if (!root) {
    return [];
  }

  const currentLocation = root.location;
  const axis = depth % 2;

  const axisDelta = target[axis] - currentLocation[axis];

  if (Math.abs(axisDelta) <= epsilon) {
    const childNeighbours = neighbourhood(
      root.leftChild,
      target,
      epsilon,
      depth + 1
    ).concat(neighbourhood(root.rightChild, target, epsilon, depth + 1));

    if (isNeighbour(currentLocation, target, epsilon)) {
      childNeighbours.push(root.value);
    }

    return childNeighbours;
  }

  if (axisDelta <= 0) {
    return neighbourhood(root.leftChild, target, epsilon, depth + 1);
  }

  return neighbourhood(root.rightChild, target, epsilon, depth + 1);
}

function isNeighbour(currentLocation: Vector, target: Vector, epsilon: number) {
  return vmagnitude2(vsub(currentLocation, target)) <= epsilon * epsilon;
}

export function printSelected<V>(
  root: Node<V>,
  shouldPrint: (V) => boolean
): void {
  if (shouldPrint(root.value)) {
    console.log(root);
  }
  if (root.leftChild) {
    printSelected(root.leftChild, shouldPrint);
  }
  if (root.rightChild) {
    printSelected(root.rightChild, shouldPrint);
  }
}

export function medianOfMedians<V>(
  pointsList: V[],
  getValue: (V) => number
): V {
  if (pointsList.length <= 6) {
    return median<V>(pointsList, getValue);
  }

  const partitionCount = Math.ceil(pointsList.length / 5);
  const partitions = new Array(partitionCount)
    .fill([])
    .map((_, i) => pointsList.slice(5 * i, 5 * (i + 1)));

  const medians = partitions.map((partition) => median<V>(partition, getValue));
  return median<V>(medians, getValue);
}

function median<V>(points: V[], getValue: (V) => number): V {
  const sortedPoints = points.sort((a: V, b: V) => getValue(b) - getValue(a));
  const medianIndex = Math.floor(sortedPoints.length / 2);
  return sortedPoints[medianIndex];
}
