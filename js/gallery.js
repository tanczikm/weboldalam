// galeria script - kepek megnyilnak nagyban a teljes weboldalon
// a kepeknek a .gallery-image osztalyazonositot kell adni!
// a kepek NEM zoomolhatok gorgovel!

// Oldal aljara bemasolni:
//<div id="imgOverlay">
//  <span id="closeBtn">&times;</span>
//  <span id="prevBtn">&#10094;</span>
//  <img id="overlayImg" src="">
//  <span id="nextBtn">&#10095;</span>
//</div>


const overlay = document.getElementById("imgOverlay");
const overlayImg = document.getElementById("overlayImg");
const zoomableImages = document.querySelectorAll(".gallery-image");

let currentIndex = 0;

// Kép megnyitása
zoomableImages.forEach((img, index) => {
  img.addEventListener("click", function() {
    currentIndex = index;
    showImage();
  });
});

function showImage() {
  overlayImg.src = zoomableImages[currentIndex].src;
  overlay.style.display = "flex";
}

// Bezárás
document.getElementById("closeBtn").addEventListener("click", () => {
  overlay.style.display = "none";
});

// Lapozás
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
  showImage();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % zoomableImages.length;
  showImage();
});

// ESC bezárás + nyíl gombok
document.addEventListener("keydown", (e) => {
  if (overlay.style.display === "flex") {
    if (e.key === "Escape") overlay.style.display = "none";
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
      showImage();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % zoomableImages.length;
      showImage();
    }
  }
});