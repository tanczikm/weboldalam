const player = document.getElementById('player');
const volumeControl = document.getElementById('volumeControl');
const nowPlaying = document.getElementById('nowPlaying');
const volumeValue = document.getElementById('volumeValue');
const radioControls = document.getElementById('radioControls');
const radioSelector = document.getElementById('radioSelector');
const radioLogoImg = document.getElementById('radioLogoImg'); // A rádió logója


const radioValaszto = document.getElementById('radioValaszto')
const radioStopButton = document.getElementById('radioStopButton')

// Rádió elindítása
function playRadio(url, name, logoUrl) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  player.src = url;
  player.play();
  nowPlaying.textContent = name;
  radioControls.style.display = 'inline-block'; // Megjeleníti a vezérlő divet
  radioSelector.style.display = 'none'; // Elrejti a rádióválasztó divet
  radioLogoImg.style.display = 'inline-block'; // Megjeleníti a rádió logót
  radioLogoImg.src = logoUrl; // Beállítja a rádió logóját


  
  radioStopButton.style.display = 'block'
}

// Rádió leállítása
function stopRadio() {
  player.pause();
  player.currentTime = 0;
  nowPlaying.textContent = "Rádió választó";
  radioControls.style.display = 'none'; // Elrejti a vezérlő divet
  radioSelector.style.display = 'block'; // Visszaállítja a rádióválasztót
  radioLogoImg.style.display = 'none'; // Elrejti a rádió logót

  
  radioStopButton.style.display = 'none'
}

// Hangerő módosítása
volumeControl.addEventListener('input', () => {
  const volume = volumeControl.value;
  player.volume = volume; // A lejátszó hangerőjének beállítása
  volumeValue.textContent = `${Math.round(volume * 100)}%`;
});