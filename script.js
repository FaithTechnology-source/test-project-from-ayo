// ------------------ PRO ACCESS BANNER (SMART TRIGGERS) ------------------
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("pro-access-banner");
  const characters = document.getElementById("characters");
  const details = document.getElementById("details");
  const closeBtn = document.getElementById("pro-banner-close");

  if (!banner || !characters || !details) return;

  let isClosed = false;

  const showBanner = () => {
    if (isClosed) return;
    banner.classList.add("banner-show");
    banner.classList.remove("banner-hide");
  };

  const hideBanner = () => {
    banner.classList.add("banner-hide");
    banner.classList.remove("banner-show");
  };

  // Show banner when Characters section appears
  const charactersObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) showBanner();
    },
    { threshold: 0.3 }
  );

  // Hide banner when Details section appears
  const detailsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) hideBanner();
    },
    { threshold: 0.2 }
  );

  charactersObserver.observe(characters);
  detailsObserver.observe(details);

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hideBanner();
      isClosed = true;
      charactersObserver.disconnect();
      detailsObserver.disconnect();
    });
  }
});


// ------------------ SMOOTH SCROLL FOR INTERNAL LINKS ------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});


const horizontalSection = document.querySelector(".horizontal-scroll-wrapper");
const scrollTrack = document.getElementById("scrollTrack");
const contentBoxes = document.querySelectorAll(".content-box");

window.addEventListener("scroll", () => {
  const sectionTop = horizontalSection.offsetTop;
  const sectionHeight = horizontalSection.offsetHeight;
  const scrollY = window.scrollY;

  // Total horizontal scrollable distance
  const maxScroll = scrollTrack.scrollWidth - window.innerWidth;

  // When section is in view → horizontal scroll
  if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
    const progress = (scrollY - sectionTop) / sectionHeight;
    scrollTrack.style.transform = `translateX(-${progress * maxScroll}px)`;

    // Reveal boxes as they come into viewport horizontally
    contentBoxes.forEach((box, index) => {
      const boxProgress = index / (contentBoxes.length - 1); // 0 to 1
      if (progress >= boxProgress * 0.9) {
        box.classList.add("visible");
      }
    });
  }
});





// ------------------ DYNAMIC KEYFRAMES ------------------
const style = document.createElement("style");
style.textContent = `
@keyframes cardBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;
document.head.appendChild(style);
