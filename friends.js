let friends = JSON.parse(localStorage.getItem("friends") || "[]");
function loadFriends() {
  const list = document.getElementById("friend-list");
  list.innerHTML = "";
  friends.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}
function addFriend() {
  const input = document.getElementById("add-friend-name");
  const name = input.value.trim();
  if (name && !friends.includes(name)) {
    friends.push(name);
    localStorage.setItem("friends", JSON.stringify(friends));
    input.value = "";
    loadFriends();
  }
}