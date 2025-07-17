let camera, scene, renderer;
let weapon, enemyManager;
let controlsEnabled = false;
let keys = {};

function initGame() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 0);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("game").appendChild(renderer.domElement);

  weapon = new Weapon(camera, scene);
  enemyManager = new EnemyManager(scene, camera);
  enemyManager.start();

  const canvas = renderer.domElement;
  canvas.addEventListener("click", () => canvas.requestPointerLock());

  document.addEventListener("pointerlockchange", () => {
    controlsEnabled = document.pointerLockElement === canvas;
  });

  document.addEventListener("mousemove", e => {
    if (!controlsEnabled) return;
    camera.rotation.y -= e.movementX * (localStorage.getItem("sensitivity") || 5) * 0.001;
    camera.rotation.x -= e.movementY * (localStorage.getItem("sensitivity") || 5) * 0.001;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
  });

  document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
  document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);
  document.addEventListener("mousedown", e => {
    if (controlsEnabled) weapon.shoot();
  });

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (controlsEnabled) {
    if (keys["w"]) camera.translateZ(-0.1);
    if (keys["s"]) camera.translateZ(0.1);
    if (keys["a"]) camera.translateX(-0.1);
    if (keys["d"]) camera.translateX(0.1);
  }

  enemyManager.update();
  renderer.render(scene, camera);
}
