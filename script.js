let currentQuestion = 0;
let answers = new Array(40).fill(null);

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "vvip" && pass === "000") {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadTryouts();
  } else {
    document.getElementById("login-error").innerText = "Username atau password salah.";
  }
}

function loadTryouts() {
  const container = document.getElementById("tryout-buttons");
  for (let i = 1; i <= 25; i++) {
    const btn = document.createElement("button");
    btn.innerText = "Tryout " + i;
    btn.onclick = () => startTryout(i);
    container.appendChild(btn);
  }
}

function startTryout(id) {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("tryout-page").style.display = "block";
  renderQuestionGrid();
}

function renderQuestionGrid() {
  const read = document.getElementById("reading-questions");
  const listen = document.getElementById("listening-questions");
  read.innerHTML = "";
  listen.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const div1 = document.createElement("div");
    div1.innerText = i;
    div1.onclick = () => showQuestion(i - 1);
    if (answers[i - 1] !== null) div1.classList.add("answered");
    read.appendChild(div1);

    const div2 = document.createElement("div");
    div2.innerText = i + 20;
    div2.onclick = () => showQuestion(i + 19);
    if (answers[i + 19] !== null) div2.classList.add("answered");
    listen.appendChild(div2);
  }
}

function showQuestion(index) {
  currentQuestion = index;
  document.getElementById("tryout-page").style.display = "none";
  document.getElementById("question-view").style.display = "block";
  document.getElementById("question-text").innerText = `Soal nomor ${index + 1}`;
  document.getElementById("choices").innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    const label = document.createElement("label");
    label.innerHTML = `<input type='radio' name='q' value='${i}' ${answers[index] === i ? "checked" : ""}/> Pilihan ${i}`;
    label.onclick = () => {
      answers[index] = i;
    };
    document.getElementById("choices").appendChild(label);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    showQuestion(currentQuestion - 1);
  }
}

function nextQuestion() {
  if (currentQuestion < 39) {
    showQuestion(currentQuestion + 1);
  }
}

function submitAnswer() {
  alert("Jawaban berhasil dikumpulkan!\n" + JSON.stringify(answers));
}

function switchTab(tab) {
  alert("Fitur switch tab ke: " + tab + " belum aktif");
}
