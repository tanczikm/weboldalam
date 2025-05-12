const player = document.getElementById('player');
const volumeControl = document.getElementById('volumeControl');
const nowPlaying = document.getElementById('nowPlaying');
const volumeValue = document.getElementById('volumeValue');
const radioControls = document.getElementById('radioControls');
const radioSelector = document.getElementById('radioSelector');
const radioLogo = document.getElementById('radioLogo'); // A rádió logója

// Rádió elindítása
function playRadio(url, name, logoUrl) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  player.src = url;
  player.play();
  nowPlaying.textContent = "Most hallgatod: " + name;
  radioControls.style.display = 'block'; // Megjeleníti a vezérlő divet
  radioSelector.style.display = 'none'; // Elrejti a rádióválasztó divet
  radioLogo.style.display = 'block'; // Megjeleníti a rádió logót
  radioLogo.src = logoUrl; // Beállítja a rádió logóját
}

// Rádió leállítása
function stopRadio() {
  player.pause();
  player.currentTime = 0;
  nowPlaying.textContent = "Nem hallgatsz semmit";
  radioControls.style.display = 'none'; // Elrejti a vezérlő divet
  radioSelector.style.display = 'block'; // Visszaállítja a rádióválasztót
  radioLogo.style.display = 'none'; // Elrejti a rádió logót
}

// Hangerő módosítása
volumeControl.addEventListener('input', () => {
  const volume = volumeControl.value;
  player.volume = volume; // A lejátszó hangerőjének beállítása
  volumeValue.textContent = `🔊 ${Math.round(volume * 100)}%`;
});
