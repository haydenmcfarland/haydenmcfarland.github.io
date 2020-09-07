const canvas = document.getElementById("stars");
const container = document.getElementById("container");
const ctx = canvas.getContext("2d");

let mousePos;
let stars;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mousemove", (event) => (mousePos = event));

function init() {
  stars = [];

  const count = canvas.width / 2;
  for (let i = 0; i < count; i++) {
    stars.push(
      new Star(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height),
        Math.random() * 2
      )
    );
  }
}

function update() {
  let updates = {
    mousePosition: mousePos,
    mouseRadius: 100,
    mouseAvoidSpeed: 1,
    opacity: 0.8,
  };
  stars.forEach((p) => p.update(updates));
}

function clearCanvas() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  clearCanvas();
  update();
}

init();
animate();
