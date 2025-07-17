class Enemy {
  constructor(mesh, scene, camera) {
    this.mesh = mesh;
    this.scene = scene;
    this.camera = camera;
    this.health = 20;
    this.speed = 0.03;
    this.alive = true;
  }

  update() {
    if (!this.alive) return;
    const direction = new THREE.Vector3();
    direction.subVectors(this.camera.position, this.mesh.position).normalize();
    this.mesh.lookAt(this.camera.position.x, this.mesh.position.y, this.camera.position.z);
    this.mesh.position.add(direction.multiplyScalar(this.speed));
    // Check distance to player for damage
    if (this.mesh.position.distanceTo(this.camera.position) < 1.5) {
      updateHealth(-0.3);
    }
  }

  onHit() {
    this.health -= 10;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.alive = false;
    this.scene.remove(this.mesh);
  }
}

class EnemyManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.enemies = [];
    this.wave = 1;
    this.spawnInterval = 2000;
    this.spawnTimer = null;
  }

  start() {
    this.spawnTimer = setInterval(() => {
      this.spawnWave(this.wave);
      this.wave++;
      if (this.wave > 10) clearInterval(this.spawnTimer);
    }, this.spawnInterval * 10);
  }

  spawnWave(count) {
    for (let i = 0; i < count * 3; i++) {
      this.spawnEnemy();
    }
  }

  spawnEnemy() {
    const geo = new THREE.BoxGeometry(1, 1.5, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 40,
      0.75,
      this.camera.position.z + 30 + Math.random() * 20
    );
    this.scene.add(mesh);
    const enemy = new Enemy(mesh, this.scene, this.camera);
    mesh.userData = { isEnemy: true, enemy };
    this.enemies.push(enemy);
  }

  update() {
    this.enemies = this.enemies.filter(e => e.alive);
    this.enemies.forEach(e => e.update());
  }
}

window.EnemyManager = EnemyManager;
