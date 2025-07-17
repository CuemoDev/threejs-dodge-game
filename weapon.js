class Weapon {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.crosshair = document.createElement('div');
    this.setupCrosshair();
  }
  setupCrosshair() {
    this.crosshair.style = \`
      position: absolute;
      top: 50%; left: 50%;
      width: 10px; height: 10px;
      margin-left: -5px; margin-top: -5px;
      background: white;
      border-radius: 50%;
      z-index: 20;
    \`;
    document.body.appendChild(this.crosshair);
    window.addEventListener('mousedown', () => this.shoot());
  }
  shoot() {
    const raycaster = new THREE.Raycaster();
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    raycaster.set(this.camera.position, dir);
    const hits = raycaster.intersectObjects(this.scene.children, true);
    for (let hit of hits) {
      if (hit.object.userData.isEnemy) {
        hit.object.userData.enemy.onHit();
        break;
      }
    }
  }
  update() {}
}
window.Weapon = Weapon;