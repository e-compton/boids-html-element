import { Vector } from "./algebra";
export interface Node<V> {
    location: Vector;
    value: V;
    leftChild: Node<V>;
    rightChild: Node<V>;
}
export declare function create<V>(pointsList: V[], getLocation: (V: any) => Vector, depth?: number): Node<V>;
export declare function neighbourhood<V>(root: Node<V>, target: Vector, epsilon: number, depth?: number): V[];
export declare function printSelected<V>(root: Node<V>, shouldPrint: (V: any) => boolean): void;
export declare function medianOfMedians<V>(pointsList: V[], getValue: (V: any) => number): V;
