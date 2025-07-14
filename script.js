let currentSoal = 0;
let skor = 0;
let waktu = 50 * 60; // 50 menit
let soalList = [];

fetch('soal.json')
  .then(res => res.json())
  .then(data => {
    soalList = data;
    tampilkanSoal();
    mulaiTimer();
  });

function tampilkanSoal() {
  const soal = soalList[currentSoal];
  document.getElementById('soal-container').innerText = `${currentSoal + 1}. ${soal.pertanyaan}`;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  soal.pilihan.forEach((opsi, i) => {
    const btn = document.createElement('button');
    btn.innerText = opsi;
    btn.onclick = () => cekJawaban(i);
    optionsDiv.appendChild(btn);
  });
}

function cekJawaban(index) {
  const benar = soalList[currentSoal].jawaban;
  if (index === benar) skor++;
  document.getElementById('next-btn').disabled = false;
}

function nextSoal() {
  currentSoal++;
  if (currentSoal < soalList.length) {
    tampilkanSoal();
    document.getElementById('next-btn').disabled = true;
  } else {
    selesaiUjian();
  }
}

function selesaiUjian() {
  document.getElementById('app').innerHTML = `<h2>Skor Anda: ${skor} dari ${soalList.length}</h2>`;
}

function mulaiTimer() {
  const timerEl = document.getElementById('timer');
  const interval = setInterval(() => {
    waktu--;
    const menit = Math.floor(waktu / 60);
    const detik = waktu % 60;
    timerEl.innerText = `${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`;
    if (waktu <= 0) {
      clearInterval(interval);
      selesaiUjian();
    }
  }, 1000);
}