let friends = ["Player123", "GamerGirl", "NoobSlayer"];

function loadFriends() {
  const list = document.getElementById("friend-list");
  list.innerHTML = '';
  friends.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

function addFriend() {
  const name = document.getElementById("add-friend-name").value;
  if (name && !friends.includes(name)) {
    friends.push(name);
    loadFriends();
    document.getElementById("add-friend-name").value = '';
  }
}
