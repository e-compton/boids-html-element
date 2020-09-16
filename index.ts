import './boids';

main();

function main() {
  const appDiv: HTMLElement = document.querySelector("body");
  const boids = document.createElement('flocking-boids');
  boids.style.cssText = 'border-radius: 5px; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);';
  appDiv.appendChild(boids);
}
