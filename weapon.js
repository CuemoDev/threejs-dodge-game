class Weapon {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.crosshair = document.createElement("div");
    this.crosshair.classList.add("crosshair");
    document.body.appendChild(this.crosshair);
  }

  shoot() {
    const raycaster = new THREE.Raycaster();
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    raycaster.set(this.camera.position, dir);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.userData.isEnemy) {
        intersects[i].object.userData.enemy.onHit();
        updateScore(10);
        break;
      }
    }
  }
}

window.Weapon = Weapon;
