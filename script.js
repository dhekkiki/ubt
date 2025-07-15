let currentQuestion = 0;
let data = [];
let answers = {};

fetch('soal/tryout1.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderQuestionNumbers();
    loadQuestion(currentQuestion);
    startTimer();
  });

function renderQuestionNumbers() {
  const container = document.getElementById('questionNumbers');
  data.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.textContent = q.number;
    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion(i);
    };
    btn.id = 'qbtn-' + i;
    container.appendChild(btn);
  });
}

function loadQuestion(index) {
  const q = data[index];
  document.getElementById('questionText').innerText = q.question;
  const list = document.getElementById('optionsList');
  list.innerHTML = '';
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      answers[q.number] = i + 1;
      document.getElementById('qbtn-' + index).classList.add('answered');
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

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
    b.style.display = !b.classList.contains('answered') ? 'inline-block' : 'none';
  });
}

function startTimer() {
  let time = 50 * 60;
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    timerEl.textContent = `${min}:${sec}`;
    if (--time < 0) clearInterval(interval);
  }, 1000);
}

document.getElementById('submitBtn').onclick = () => {
  alert('Jawaban berhasil disubmit!');
};
