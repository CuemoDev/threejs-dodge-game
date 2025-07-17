let health = 100;
let score = 0;

function updateHealth(amount) {
  health += amount;
  if (health > 100) health = 100;
  if (health < 0) health = 0;
  document.getElementById("health-fill").style.width = health + "%";
  if (health === 0) gameOver();
}

function updateScore(amount) {
  score += amount;
  document.getElementById("score").textContent = "Score: " + score;
}

function gameOver() {
  alert("Game Over! Your score: " + score);
  window.location.reload();
}
