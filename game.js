let camera, scene, renderer;
let controlsEnabled = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let pointerLocked = false;

function initGame() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.y = 1.6; // eye height

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Player box (to represent shooting target)
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 0.5, -5);
  scene.add(box);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("game").appendChild(renderer.domElement);

  // Pointer Lock
  const canvas = renderer.domElement;
  canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
  });

  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === canvas;
    controlsEnabled = pointerLocked;
  });

  // Mouse look
  document.addEventListener("mousemove", (e) => {
    if (!controlsEnabled) return;
    camera.rotation.y -= e.movementX * 0.002;
    camera.rotation.x -= e.movementY * 0.002;
    camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
  });

  // Movement
  const keys = {};
  document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
  document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

  function animate() {
    requestAnimationFrame(animate);

    if (controlsEnabled) {
      direction.set(0, 0, 0);
      if (keys["w"]) direction.z -= 1;
      if (keys["s"]) direction.z += 1;
      if (keys["a"]) direction.x -= 1;
      if (keys["d"]) direction.x += 1;
      direction.normalize();

      const speed = 0.1;
      const forward = new THREE.Vector3(
        Math.sin(camera.rotation.y),
        0,
        Math.cos(camera.rotation.y)
      );
      const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0));

      camera.position.add(forward.multiplyScalar(direction.z * speed));
      camera.position.add(right.multiplyScalar(direction.x * speed));
    }

    renderer.render(scene, camera);
  }

  animate();
}
