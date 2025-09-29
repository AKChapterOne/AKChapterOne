// Confetti Animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
const heroSection = document.getElementById("home");

function resizeCanvas() {
  // Set width to window width
  confettiCanvas.width = window.innerWidth;

  // CRITICAL CHANGE: Set height to the actual height of the hero section
  confettiCanvas.height = heroSection.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confetti = Array.from({ length: 120 }).map(() => ({
  x: Math.random() * confettiCanvas.width,
  // Use the newly calculated height for initial Y position
  y: Math.random() * confettiCanvas.height,
  r: Math.random() * 6 + 4,
  d: Math.random() * 40,
  color: ["#ffeb3b", "#e91e63", "#4caf50"][Math.floor(Math.random() * 3)],
  tilt: Math.random() * 10 - 10,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((p) => {
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);

    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

setInterval(drawConfetti, 20);

const weddingDate = new Date("November 2, 2025 00:00:00").getTime();

function updateCountdown() {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = weddingDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Get elements
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // If the countdown container exists, update the content
  if (daysEl && hoursEl && minutesEl && secondsEl) {
    // Add leading zero if number is less than 10
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }


  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(countdownInterval);
    const timerContainer = document.getElementById("countdown-timer");
    if (timerContainer) {
      timerContainer.innerHTML = "We're Married! 🎉";
      timerContainer.style.fontSize = "2rem";
    }
    const teaserEl = document.querySelector(".hero .teaser");
    if (teaserEl) {
      teaserEl.textContent = "Our Forever Has Begun.";
    }
  }
}

// Update the count down every 1 second
const countdownInterval = setInterval(updateCountdown, 1000);

// Run the function once immediately to avoid a 1-second delay
updateCountdown();

// Video Carousel Logic
(function () {
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const items = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  // Initialize carousel
  updateCarousel();
})();

// Photo Carousel Logic
(function () {
  const photoTrack = document.querySelector(".photo-carousel .carousel-track");
  const photoPrevButton = document.querySelector(".photo-carousel .carousel-control.prev");
  const photoNextButton = document.querySelector(".photo-carousel .carousel-control.next");
  const photoItems = Array.from(photoTrack.children);
  let photoIndex = 0;

  function updatePhotoCarousel() {
    const slideWidth = photoItems[0].getBoundingClientRect().width;
    photoTrack.style.transform = `translateX(-${slideWidth * photoIndex}px)`;
  }

  photoPrevButton.addEventListener("click", () => {
    photoIndex = photoIndex > 0 ? photoIndex - 1 : photoItems.length - 1;
    updatePhotoCarousel();
  });

  photoNextButton.addEventListener("click", () => {
    photoIndex = photoIndex < photoItems.length - 1 ? photoIndex + 1 : 0;
    updatePhotoCarousel();
  });

  window.addEventListener("resize", updatePhotoCarousel);

  // Initialize carousel
  updatePhotoCarousel();
})();

// Photo Modal Lightbox
(function () {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".photo-modal-close");
  const photos = document.querySelectorAll(".photo-carousel img");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = photo.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
})();