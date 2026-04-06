const menuToggle = document.querySelector(".menu-toggle");
const navMobile = document.querySelector(".nav-mobile");
const backToTop = document.querySelector(".back-to-top");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("#hero, #about, #process, #portfolio, #blog, #services, #contact");
const header = document.querySelector('.site-header');

if (menuToggle && navMobile) {
  menuToggle.addEventListener("click", () => {
    navMobile.classList.toggle("show");
  });
}

function removeActiveClasses() {
  navLinks.forEach((link) => link.classList.remove("active"));
}

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${targetId}`) {
      link.classList.add("active");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");
    if (!target || !target.startsWith("#")) return;

    const targetId = target.substring(1);
    removeActiveClasses();
    setActiveLink(targetId);

    if (navMobile && navMobile.classList.contains("show")) {
      navMobile.classList.remove("show");
    }
  });
});

function handleScrollActive() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  if (currentSection) {
    removeActiveClasses();
    setActiveLink(currentSection);
  }
}

function toggleBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
    backToTop.style.pointerEvents = "auto";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
    backToTop.style.pointerEvents = "none";
  }
}

if (backToTop) {
  backToTop.style.opacity = "0";
  backToTop.style.visibility = "hidden";
  backToTop.style.pointerEvents = "none";
  backToTop.style.transition = "all 0.3s ease";

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("scroll", () => {
  handleScrollActive();
  toggleBackToTop();

  if (window.scrollY > 80) {
  header.style.background = 'rgba(245, 247, 250, 0.95)';
  header.style.borderBottom = '1px solid rgba(19, 34, 56, 0.1)';
} else {
  header.style.background = '#ffffff';
  header.style.borderBottom = '1px solid transparent';
}
});

window.addEventListener("load", () => {
  handleScrollActive();
  toggleBackToTop();
});

$(document).ready(function () {
  if ($(".blog-slider").length) {
$('.blog-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  infinite: false,
  speed: 500,
  adaptiveHeight: false,
  rows: 0,
  respondTo: 'window',
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false
      }
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
      }
    }
  ]
});
  }

if ($(".testimonial-slider").length) {
    $(".testimonial-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      infinite: true,
      adaptiveHeight: true,
      speed: 500,
    });
  }
});

// ── Happy Clients Carousel (rAF, pause on hover) ──
(function () {
  
  const track = document.getElementById('clientsTrack');
  if (!track) return;
  function makeItems(list) {
    return list.map(function (b) {
      var div = document.createElement('div');
      div.className = 'client-logo';
      var img = document.createElement('img');
      img.src = b.src; img.alt = b.alt; img.loading = 'lazy';
      div.appendChild(img);
      return div;
    });
  }
  makeItems(logos).concat(makeItems(logos)).concat(makeItems(logos))
    .forEach(function (el) { track.appendChild(el); });
  var SPEED = 0.6, x = 0, paused = false;
  function step() {
    if (!paused) {
      x += SPEED;
      if (x >= track.scrollWidth / 3) x -= track.scrollWidth / 3;
      track.style.transform = 'translateX(' + (-x) + 'px)';
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  var wrapper = document.getElementById('clientsCarousel');
  wrapper.addEventListener('mouseenter', function () { paused = true; });
  wrapper.addEventListener('mouseleave', function () { paused = false; });
  wrapper.addEventListener('touchstart', function () { paused = true; }, { passive: true });
  wrapper.addEventListener('touchend',   function () { paused = false; }, { passive: true });
})();