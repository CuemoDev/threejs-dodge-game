function startGame() {
  document.getElementById("menu").style.display = "none";
  initGame(); // from game.js
}

function showSettings() {
  document.getElementById("settings").style.display = "block";
}

function closeSettings() {
  document.getElementById("settings").style.display = "none";
}

function showFriends() {
  document.getElementById("friends").style.display = "block";
  loadFriends();
}

function closeFriends() {
  document.getElementById("friends").style.display = "none";
}

function quitGame() {
  alert("You quit the game.");
}
