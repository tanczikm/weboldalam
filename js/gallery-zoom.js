// galeria script - kepek megnyilnak nagyban a teljes weboldalon
// a kepeknek a .gallery-image osztalyazonositot kell adni!
// a kepek zoomolhatok gorgovel!

const overlay = document.getElementById("imgOverlay");
const overlayImg = document.getElementById("overlayImg");
const zoomableImages = document.querySelectorAll(".gallery-image");

let currentIndex = 0;
let scale = 1;
let translateX = 0, translateY = 0;
let startX, startY, isDragging = false;

// Tiltjuk jobb klikket és drag-et
zoomableImages.forEach(img => {
  img.addEventListener("contextmenu", e => e.preventDefault());
  img.addEventListener("dragstart", e => e.preventDefault());
});

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
  resetZoom();
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

// ESC + nyilak
document.addEventListener("keydown", (e) => {
  if (overlay.style.display === "flex") {
    if (e.key === "Escape") overlay.style.display = "none";
    if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length; showImage(); }
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % zoomableImages.length; showImage(); }
  }
});

// Reset zoom
function resetZoom() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function applyTransform() {
  overlayImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Desktop húzás
overlayImg.addEventListener("mousedown", (e) => {
  if (scale > 1 && e.button === 0) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    constrainPan();
    applyTransform();
  }
});
document.addEventListener("mouseup", () => { isDragging = false; });

// Desktop görgős zoom az egérpozícióhoz
overlay.addEventListener("wheel", (e) => {
  e.preventDefault();
  const rect = overlayImg.getBoundingClientRect();

  // az egérpozíció a képhez viszonyítva
  const offsetX = e.clientX - rect.left - rect.width/2;
  const offsetY = e.clientY - rect.top - rect.height/2;

  let prevScale = scale;
  scale *= e.deltaY < 0 ? 1.1 : 1/1.1;
  if (scale < 1) scale = 1;

  if (scale > 1) {
    // zoom az egérhez: pozíciót korrigáljuk
    translateX -= offsetX * (scale/prevScale - 1);
    translateY -= offsetY * (scale/prevScale - 1);
    constrainPan();
  } else {
    translateX = 0; translateY = 0;
  }
  applyTransform();
});

// Mobil pinch-zoom és drag
let lastDistance = 0;
overlayImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    lastDistance = getDistance(e.touches[0], e.touches[1]);
  } else if (e.touches.length === 1 && scale > 1) {
    isDragging = true;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  }
});

overlayImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dist = getDistance(e.touches[0], e.touches[1]);
    const delta = dist / lastDistance;
    lastDistance = dist;

    let prevScale = scale;
    scale *= delta;
    if (scale < 1) scale = 1;
    if (scale > 1) {
      translateX *= scale / prevScale;
      translateY *= scale / prevScale;
      constrainPan();
    } else {
      translateX = 0; translateY = 0;
    }
    applyTransform();
  } else if (e.touches.length === 1 && isDragging) {
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    constrainPan();
    applyTransform();
  }
});

overlayImg.addEventListener("touchend", (e) => {
  if (e.touches.length < 2) lastDistance = 0;
  if (e.touches.length === 0) isDragging = false;
});

function getDistance(t1, t2) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

// Pan korlátozás
function constrainPan() {
  const rect = overlay.getBoundingClientRect();
  const imgWidth = overlayImg.naturalWidth * scale;
  const imgHeight = overlayImg.naturalHeight * scale;

  const maxX = Math.max(0, (imgWidth - rect.width)/2);
  const maxY = Math.max(0, (imgHeight - rect.height)/2);

  if (translateX > maxX) translateX = maxX;
  if (translateX < -maxX) translateX = -maxX;
  if (translateY > maxY) translateY = maxY;
  if (translateY < -maxY) translateY = -maxY;
}
