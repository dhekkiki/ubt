let soalData = [];
let jawabanUser = {};

function loadSoal() {
  fetch("soal/tryout1.json")
    .then(res => res.json())
    .then(data => {
      soalData = data;
      tampilkanSoal(1);
      buatNavigasi();
    })
    .catch(err => {
      document.getElementById("soal-container").innerHTML = "<p>❌ Soal tidak ditemukan.</p>";
    });
}

function tampilkanSoal(nomor) {
  const soal = soalData.find(s => s.nomor === nomor);
  if (!soal) return;

  let opsiHTML = "";
  soal.opsi.forEach((opsi, i) => {
    const checked = jawabanUser[nomor] === i ? "checked" : "";
    opsiHTML += `
      <label>
        <input type="radio" name="soal${nomor}" value="${i}" ${checked}
          onclick="simpanJawaban(${nomor}, ${i})" />
        ${opsi}
      </label><br>`;
  });

  document.getElementById("soal-container").innerHTML = `
    <h2>문제 ${soal.nomor}</h2>
    <p>${soal.teks}</p>
    <div>${opsiHTML}</div>
  `;
}

function simpanJawaban(nomor, jawaban) {
  jawabanUser[nomor] = jawaban;
  const btn = document.getElementById(`btn-${nomor}`);
  if (btn) btn.classList.add("answered");
}

function buatNavigasi() {
  const nav = document.getElementById("nav-buttons");
  nav.innerHTML = "";
  soalData.forEach((soal) => {
    const btn = document.createElement("button");
    btn.innerText = soal.nomor;
    btn.id = `btn-${soal.nomor}`;
    btn.onclick = () => tampilkanSoal(soal.nomor);
    if (jawabanUser[soal.nomor] !== undefined) {
      btn.classList.add("answered");
    }
    nav.appendChild(btn);
  });
}

// Panggil saat halaman dimuat
window.onload = loadSoal;
