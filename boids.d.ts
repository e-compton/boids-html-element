import "./styles.css";
import { Boid } from "./lib/types";
export declare class Boids extends HTMLElement {
    constructor();
    static run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, boids: Boid[], lastRender: number): void;
}
