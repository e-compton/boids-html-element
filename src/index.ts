// import act from "./act";
// import create from "./create";

// const boids = create(200, 500, 500);


// const times = [];

// for (let i = 0; i < 200; i++) {
//   const t0 = new Date().getTime();
//   act(boids, 16, 500, 500);
//   const t1 = new Date().getTime();
//   const dt = t1 - t0;
//   console.log('tick', dt, i);
//   times.push(dt);
// }
// console.log('Average:', times.reduce((total, time) => total + time, 0) / times.length);