export declare type Vector = [number, number];
declare type AffineMatrix = [
    [
        number,
        number,
        number
    ],
    [
        number,
        number,
        number
    ],
    [
        number,
        number,
        1
    ]
];
export declare function vadd(v1: Vector, v2: Vector): Vector;
export declare function vsub(v1: Vector, v2: Vector): Vector;
export declare function vscale(v: Vector, s: number): Vector;
export declare function vmod(v: Vector, n: Vector): Vector;
export declare function vmagnitude(v: Vector): number;
export declare function vmagnitude2(v: Vector): number;
export declare function vclamp(v: Vector, n: number): Vector;
export declare function angleOfVector(vector: Vector): number;
export declare function composeTransformation(position: Vector, orientation: number): AffineMatrix;
export declare function transform(transformation: AffineMatrix, points: Vector[]): Vector[];
export {};
