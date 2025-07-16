function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "vvip" && p === "000") {
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau Password salah!");
  }
}
