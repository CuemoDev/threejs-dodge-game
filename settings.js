const vol = document.getElementById("volume");
const sens = document.getElementById("sensitivity");
vol.value = localStorage.getItem("volume") || 50;
sens.value = localStorage.getItem("sensitivity") || 5;
vol.addEventListener("input", () => localStorage.setItem("volume", vol.value));
sens.addEventListener("input", () => localStorage.setItem("sensitivity", sens.value));