let allUsers = []; // store all users globally

document.addEventListener("DOMContentLoaded", async function() {
  const tableBody = document.querySelector("#users-table tbody");
  const searchInput = document.getElementById("search");

  try {
    const response = await fetch("https://n34x3ldi0l.execute-api.ap-southeast-1.amazonaws.com/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      tableBody.innerHTML = "<tr><td colspan='2'>ユーザー取得に失敗しました。</td></tr>";
      return;
    }

    const data = await response.json();
    allUsers = data.users || [];

    displayUsers(allUsers);

  } catch (error) {
    console.error(error);
    tableBody.innerHTML = "<tr><td colspan='2'>ネットワークエラーが発生しました。</td></tr>";
  }

  // Event listener for search
  searchInput.addEventListener("input", function() {
    const keyword = this.value.toLowerCase();
    const filtered = allUsers.filter(user => user.user_id.toLowerCase().includes(keyword));
    displayUsers(filtered);
  });

  function displayUsers(users) {
    tableBody.innerHTML = "";

    if (users.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='2'>該当するユーザーがいません。</td></tr>";
      return;
    }

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.user_id}</td><td>${user.last_login_date}</td><td>${user.add_date}</td>`;
      tableBody.appendChild(row);
    });
  }
});
