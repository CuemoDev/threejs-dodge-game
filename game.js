// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("game").appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Player (Cube)
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
cube.position.y = -2;

// Obstacles
let obstacles = [];

function createObstacle() {
  const geo = new THREE.SphereGeometry(0.3, 16, 16);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const ball = new THREE.Mesh(geo, mat);
  ball.position.x = (Math.random() - 0.5) * 8;
  ball.position.y = 5;
  scene.add(ball);
  obstacles.push(ball);
}

// Camera
camera.position.z = 5;
camera.position.y = 0;

// Controls
let moveLeft = false;
let moveRight = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "a") moveLeft = true;
  if (e.key === "d") moveRight = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "a") moveLeft = false;
  if (e.key === "d") moveRight = false;
});

let score = 0;

function animate() {
  requestAnimationFrame(animate);

  // Move player
  if (moveLeft && cube.position.x > -4) cube.position.x -= 0.1;
  if (moveRight && cube.position.x < 4) cube.position.x += 0.1;

  // Spawn new obstacles
  if (Math.random() < 0.02) createObstacle();

  // Move obstacles
  obstacles.forEach((obs, index) => {
    obs.position.y -= 0.05;

    // Collision check
    const dist = cube.position.distanceTo(obs.position);
    if (dist < 0.5) {
      alert(`Game Over! Score: ${score}`);
      window.location.reload();
    }

    // Remove if below screen
    if (obs.position.y < -5) {
      scene.remove(obs);
      obstacles.splice(index, 1);
      score++;
    }
  });

  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
