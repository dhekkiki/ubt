let currentQuestion = 0;
let soal = [];
let jawabanUser = Array(40).fill(null);
let timerDuration = 50 * 60;

// Ambil tryout set dari query string
const urlParams = new URLSearchParams(window.location.search);
const set = urlParams.get("set") || "1";

// Ambil soal dari file JSON
fetch(`soal/tryout${set}.json`)
  .then(res => res.json())
  .then(data => {
    soal = data;
    renderQuestionNumbers();
    renderQuestion(currentQuestion);
    startTimer();
  })
  .catch(err => {
    document.getElementById("questionText").textContent = "Gagal memuat soal.";
    console.error(err);
  });

function renderQuestion(index) {
  const q = soal[index];
  document.getElementById("questionText").textContent = `${index + 1}. ${q.pertanyaan}`;
  const list = document.getElementById("optionsList");
  list.innerHTML = "";
  ["A", "B", "C", "D"].forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = `${opt}. ${q.pilihan[i]}`;
    li.onclick = () => selectAnswer(index, opt);
    if (jawabanUser[index] === opt) li.classList.add("selected");
    list.appendChild(li);
  });
}

function selectAnswer(index, opt) {
  jawabanUser[index] = opt;
  updateQuestionBox(index);
  renderQuestion(index);
}

function renderQuestionNumbers() {
  const box = document.getElementById("questionNumbers");
  box.innerHTML = "";
  for (let i = 0; i < soal.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.id = `qnum${i}`;
    btn.onclick = () => {
      currentQuestion = i;
      renderQuestion(i);
    };
    if (jawabanUser[i]) btn.classList.add("answered");
    box.appendChild(btn);
  }
}

function updateQuestionBox(index) {
  const btn = document.getElementById(`qnum${index}`);
  if (jawabanUser[index]) {
    btn.classList.add("answered");
  } else {
    btn.classList.remove("answered");
  }
}

function nextQuestion() {
  if (currentQuestion < soal.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

document.getElementById("submitBtn").onclick = function () {
  const hasil = jawabanUser.map((j, i) => `${i + 1}. ${j || "-"}`).join("\n");
  alert("Jawaban Anda:\n\n" + hasil);
};

function startTimer() {
  const timer = document.getElementById("timer");
  let interval = setInterval(() => {
    let m = Math.floor(timerDuration / 60);
    let s = timerDuration % 60;
    timer.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    if (timerDuration <= 0) {
      clearInterval(interval);
      alert("Waktu habis! Jawaban akan dikumpulkan.");
      document.getElementById("submitBtn").click();
    }
    timerDuration--;
  }, 1000);
}

function showAll() {
  renderQuestionNumbers();
}

function showSolved() {
  const box = document.getElementById("questionNumbers");
  box.innerHTML = "";
  for (let i = 0; i < soal.length; i++) {
    if (jawabanUser[i]) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.id = `qnum${i}`;
      btn.classList.add("answered");
      btn.onclick = () => {
        currentQuestion = i;
        renderQuestion(i);
      };
      box.appendChild(btn);
    }
  }
}

function showUnsolved() {
  const box = document.getElementById("questionNumbers");
  box.innerHTML = "";
  for (let i = 0; i < soal.length; i++) {
    if (!jawabanUser[i]) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.id = `qnum${i}`;
      btn.onclick = () => {
        currentQuestion = i;
        renderQuestion(i);
      };
      box.appendChild(btn);
    }
  }
}
