// Close Promo Banner
const closeBanner = document.getElementById("closeBanner");
const promoBanner = document.getElementById("promoBanner");
const videos = document.querySelectorAll(".alien");

if (closeBanner && promoBanner) {
  closeBanner.addEventListener("click", () => {
    promoBanner.style.transform = "translateY(-100%)";
    promoBanner.style.opacity = "0";
    setTimeout(() => {
      promoBanner.style.display = "none";
    }, 300);
  });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play();
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

// HORIZONTAL SCROLL SECTION - Combined with Parallax
let wrapper, track, maxScroll;

// Initialize Horizontal Scroll on Load
window.addEventListener("load", () => {
  wrapper = document.getElementById("wrapper");
  track = document.getElementById("scrollTrack");

  console.log("Wrapper:", wrapper);
  console.log("Track:", track);

  if (wrapper && track) {
    // Calculate the total width of all boxes
    const boxes = track.children;
    let totalWidth = 0;

    for (let box of boxes) {
      totalWidth += box.offsetWidth;
    }
    totalWidth += (boxes.length - 1) * 32; // Add gap spacing (2rem = 32px)

    maxScroll = totalWidth - window.innerWidth;
    wrapper.style.height = ${maxScroll + window.innerHeight}px;

    console.log("Total Width:", totalWidth);
    console.log("Max Scroll:", maxScroll);
    console.log("Wrapper Height Set:", wrapper.style.height);
  } else {
    console.error("Horizontal scroll elements not found!");
  }

  console.log("Page loaded successfully!");
});

// Character Card Click Animation
const characterCards = document.querySelectorAll(".character-card");

characterCards.forEach((card) => {
  card.addEventListener("click", function () {
    characterCards.forEach((c) =>
      c.classList.remove("ring-4", "ring-purple-400")
    );
    this.classList.add("ring-4", "ring-purple-400");
    this.style.animation = "bounce 0.5s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });
});

// Add bounce keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);