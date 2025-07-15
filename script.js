let currentQuestion = 0;
let data = [];
let answers = {};

// Ambil nomor tryout dari localStorage, default 1
const tryoutNo = localStorage.getItem("tryoutNo") || "1";

// Fetch soal dari file JSON
fetch(`soal/tryout${tryoutNo}.json`)
  .then(res => res.json())
  .then(json => {
    data = json;
    renderQuestionNumbers();
    loadQuestion(currentQuestion);
    startTimer();
  });

// Tampilkan nomor-nomor soal
function renderQuestionNumbers() {
  const container = document.getElementById('questionNumbers');
  container.innerHTML = '';
  data.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.textContent = q.number;
    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion(i);
    };
    btn.id = 'qbtn-' + i;
    if (answers[q.number]) {
      btn.classList.add('answered');
    }
    container.appendChild(btn);
  });
}

// Tampilkan soal ke layar
function loadQuestion(index) {
  const q = data[index];
  document.getElementById('questionText').innerText = `${q.number}. ${q.question}`;
  const list = document.getElementById('optionsList');
  list.innerHTML = '';
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      answers[q.number] = i + 1;
      document.getElementById('qbtn-' + index).classList.add('answered');
      renderQuestionNumbers();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Navigasi
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function nextQuestion() {
  if (currentQuestion < data.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

// Tab: All / Solved / Unsolved
function showAll() {
  document.querySelectorAll('.question-numbers button').forEach(b => b.style.display = 'inline-block');
}
function showSolved() {
  document.querySelectorAll('.question-numbers button').forEach(b => {
    b.style.display = b.classList.contains('answered') ? 'inline-block' : 'none';
  });
}
function showUnsolved() {
  document.querySelectorAll('.question-numbers button').forEach(b => {
    b.style.display = b.classList.contains('answered') ? 'none' : 'inline-block';
  });
}

// Timer 50 menit
function startTimer() {
  let time = 50 * 60;
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    timerEl.textContent = `${min}:${sec}`;
    if (--time < 0) {
      clearInterval(interval);
      alert("Waktu habis! Jawaban akan disubmit.");
      submitAnswers();
    }
  }, 1000);
}

// Tombol submit
document.getElementById('submitBtn').onclick = () => {
  const confirmSubmit = confirm("Apakah kamu yakin ingin submit jawaban?");
  if (confirmSubmit) submitAnswers();
};

function submitAnswers() {
  let total = data.length;
  let answered = Object.keys(answers).length;
  alert(`Jawaban disimpan.\nSoal dijawab: ${answered}/${total}`);
  // Di sini kamu bisa kirim ke server kalau perlu
}
