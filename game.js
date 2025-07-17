let camera, scene, renderer;
let weapon, enemies;
function initGame() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.6;
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x444444 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("game").appendChild(renderer.domElement);
  weapon = new Weapon(camera, scene);
  enemies = new EnemyManager();
  enemies.init(scene, camera);
  const canvas = renderer.domElement;
  canvas.addEventListener("click", () => canvas.requestPointerLock());
  document.addEventListener("pointerlockchange", () => {
    controlsEnabled = document.pointerLockElement === canvas;
  });
  const keys = {};
  document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
  document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);
  function animate() {
    requestAnimationFrame(animate);
    if (controlsEnabled) {
      const dir = new THREE.Vector3();
      if (keys["w"]) camera.translateZ(-0.1);
      if (keys["s"]) camera.translateZ(0.1);
      if (keys["a"]) camera.translateX(-0.1);
      if (keys["d"]) camera.translateX(0.1);
    }
    weapon.update();
    enemies.update();
    renderer.render(scene, camera);
  }
  animate();
}