let soal = [];
let jawaban = {};
let timer;

window.onload = async function() {
  const params = new URLSearchParams(window.location.search);
  const set = params.get("set") || "1";
  document.getElementById("tryout-id").textContent = set;

  try {
    const res = await fetch(`soal/tryout${set}.json`);
    soal = await res.json();
    tampilSoal();
    mulaiTimer(50 * 60); // 50 menit
  } catch (err) {
    document.getElementById("soal-container").innerHTML = "Gagal memuat soal.";
  }
};

function tampilSoal() {
  const container = document.getElementById("soal-container");
  container.innerHTML = "";

  soal.forEach((item, i) => {
    const nomor = i + 1;
    const pilihan = item.pilihan.map((p, j) => {
      const abjad = ["A", "B", "C", "D"][j];
      const checked = jawaban[nomor] === abjad ? "class='terpilih'" : "";
      return `<button onclick="pilih(${nomor}, '${abjad}', this)" ${checked}>${abjad}. ${p}</button>`;
    }).join("<br>");

    container.innerHTML += `
      <div class="soal-box">
        <h3>${nomor}. ${item.pertanyaan}</h3>
        ${pilihan}
      </div>
    `;
  });
}

function pilih(nomor, abjad, btn) {
  jawaban[nomor] = abjad;
  const buttons = btn.parentElement.querySelectorAll("button");
  buttons.forEach(b => b.classList.remove("terpilih"));
  btn.classList.add("terpilih");
}

function mulaiTimer(detik) {
  const display = document.getElementById("timer");
  timer = setInterval(() => {
    let m = Math.floor(detik / 60);
    let s = detik % 60;
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (--detik < 0) {
      clearInterval(timer);
      submitJawaban();
    }
  }, 1000);
}

function submitJawaban() {
  clearInterval(timer);
  localStorage.setItem("hasilTryout", JSON.stringify(jawaban));
  window.location.href = "result.html";
}
