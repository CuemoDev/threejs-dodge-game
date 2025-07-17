class EnemyManager {
  constructor() {
    this.enemies = [];
  }
  init(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    setInterval(() => this.spawn(), 2000);
  }
  spawn() {
    const geo = new THREE.BoxGeometry(1, 2, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - 0.5) * 40, 1, this.camera.position.z + 40);
    const enemy = {
      mesh,
      onHit: () => {
        this.scene.remove(mesh);
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      },
      update: () => {
        mesh.lookAt(this.camera.position.x, 1, this.camera.position.z);
        const dir = new THREE.Vector3();
        dir.subVectors(this.camera.position, mesh.position).normalize();
        mesh.position.add(dir.multiplyScalar(0.02));
      }
    };
    mesh.userData = { isEnemy: true, enemy };
    this.scene.add(mesh);
    this.enemies.push(enemy);
  }
  update() {
    for (let e of this.enemies) e.update();
  }
}
window.EnemyManager = EnemyManager;