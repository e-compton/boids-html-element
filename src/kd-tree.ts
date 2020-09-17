import { Vector, vmagnitude2, vsub } from "./algebra";

export interface Node<V> {
  location: Vector;
  value: V;
  leftChild: Node<V>;
  rightChild: Node<V>;
}

export function create<V>(
  pointsList: V[],
  getLocation: (item: V) => Vector,
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

export function iterativeCreate<V>(
  pointsList: V[],
  getLocation: (item: V) => Vector,
): Node<V> {
  const depthStack: number[] = [0];
  const pointsListStack: V[][] = [pointsList];
  const isLeftStack: boolean[] = [];
  const parentStack: Node<V>[] = [];
  let rootNode;

  while (pointsListStack.length > 0) {
    const currentPointsList = pointsListStack.pop();
    const currentDepth = depthStack.pop();
    const currentlyLeft = isLeftStack.pop();
    const currentParent = parentStack.pop();
    const axis = currentDepth % 2;

    const median = medianOfMedians<V>(
      currentPointsList,
      (value) => getLocation(value)[axis]
    );

    const medianLocation = getLocation(median);

    const newNode = <Node<V>>{
      location: medianLocation,
      value: median,
      leftChild: null,
      rightChild: null
    };

    if (currentDepth === 0) {
      rootNode = newNode;
    } else if (currentlyLeft) {
      currentParent.leftChild = newNode;
    } else {
      currentParent.rightChild = newNode;
    }

    const leftPoints = currentPointsList.filter(
      (point) => getLocation(point)[axis] < medianLocation[axis]
    );
    if (leftPoints.length > 0) {
      pointsListStack.push(leftPoints);
      depthStack.push(currentDepth + 1);
      isLeftStack.push(true);
      parentStack.push(newNode);
    }
    const rightPoints = currentPointsList.filter(
      (point) => getLocation(point)[axis] > medianLocation[axis]
    );
    if (rightPoints.length > 0) {
      pointsListStack.push(rightPoints);
      depthStack.push(currentDepth + 1);
      isLeftStack.push(false);
      parentStack.push(newNode);
    }
  }

  return rootNode;
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

export function iterativeNeighbourhood<V>(root: Node<V>, target: Vector, epsilon: number): V[] {
  const depthStack = [0];
  const stack = [root];
  const neighbours: V[] = [];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    const currentDepth = depthStack.pop();
    const currentLocation = currentNode.location;
    const axis = currentDepth % 2;
    const axisDelta = target[axis] - currentLocation[axis];

    if (Math.abs(axisDelta) <= epsilon) {
      if (currentNode.leftChild) {
        stack.push(currentNode.leftChild);
        depthStack.push(currentDepth + 1);
      }
      if (currentNode.rightChild) {
        stack.push(currentNode.rightChild);
        depthStack.push(currentDepth + 1);
      }

      if (isNeighbour(currentLocation, target, epsilon)) {
        neighbours.push(currentNode.value);
      }
    } else if (axisDelta <= 0) {
      if (currentNode.leftChild) {
        stack.push(currentNode.leftChild);
        depthStack.push(currentDepth + 1);
      }
    } else {
      if (currentNode.rightChild) {
        stack.push(currentNode.rightChild);
        depthStack.push(currentDepth + 1);
      }
    }
  }

  return neighbours;
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
