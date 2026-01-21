document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("pro-access-banner");
  const characters = document.getElementById("characters");
  const details = document.getElementById("details");
  const closeBtn = document.getElementById("pro-banner-close");

  if (!banner || !characters || !details) return;

  let isClosed = false;

  // Show the banner
  const showBanner = () => {
    if (isClosed) return;
    banner.classList.add("opacity-100", "pointer-events-auto");
    banner.classList.remove("opacity-0", "pointer-events-none");
  };

  // Hide the banner
  const hideBanner = () => {
    banner.classList.remove("opacity-100", "pointer-events-auto");
    banner.classList.add("opacity-0", "pointer-events-none");
  };

  // IntersectionObserver to detect #characters entering viewport
  const charactersObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isClosed) {
        showBanner();
      }
    },
    { threshold: 0.1 } // trigger when 10% visible
  );

  // IntersectionObserver to detect #details entering viewport
  const detailsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hideBanner();
      }
    },
    { threshold: 0.1 }
  );

  charactersObserver.observe(characters);
  detailsObserver.observe(details);

  // Close button functionality
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hideBanner();
      isClosed = true;
      charactersObserver.disconnect();
      detailsObserver.disconnect();
    });
  }
});



//Smooth scroll for internal links
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


 
const posesSection = document.querySelector(".poses-scroll");
const posesTrack = document.querySelector(".poses"); // your translate3d container

// Total scrollable width of images
const trackWidth = posesTrack.scrollWidth;
const windowHeight = window.innerHeight;

// Calculate start and end vertical scroll positions
const sectionOffsetTop = posesSection.offsetTop;
const startScroll = sectionOffsetTop - windowHeight / 2; // when section hits middle
const endScroll = startScroll + trackWidth; // vertical scroll needed to move all images

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY >= startScroll && scrollY <= endScroll) {
    // Freeze section in viewport
    posesSection.style.position = "fixed";
    posesSection.style.top = "0";

    // Compute horizontal translation
    const progress = (scrollY - startScroll) / (endScroll - startScroll);
    const translateX = -progress * trackWidth;

    // Update only translate3d(x,0,0), preserve other transforms
    let currentTransform = posesTrack.style.transform || posesTrack.getAttribute("style");
    if (!currentTransform.includes("translate3d")) {
      currentTransform = `translate3d(0px,0,0)` + currentTransform;
    }
    posesTrack.style.transform = currentTransform.replace(
      /translate3d\([^)]+\)/,
      `translate3d(${translateX}px,0,0)`
    );

  } else if (scrollY > endScroll) {
    // After horizontal scroll completes
    posesSection.style.position = "relative";
    posesTrack.style.transform = posesTrack.style.transform.replace(
      /translate3d\([^)]+\)/,
      `translate3d(${-trackWidth}px,0,0)`
    );
  } else {
    // Before horizontal scroll starts
    posesSection.style.position = "relative";
    posesTrack.style.transform = posesTrack.style.transform.replace(
      /translate3d\([^)]+\)/,
      `translate3d(0,0,0)`
    );
  }
});




//dynamic key frame
const style = document.createElement("style");
style.textContent = `
@keyframes cardBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;
document.head.appendChild(style);
