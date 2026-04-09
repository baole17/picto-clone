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

let isScrollingToSection = false;

$('.nav-link').on('click', function(e) {
  $(this).addClass('nav-clicking');
  setTimeout(() => $(this).removeClass('nav-clicking'), 150);

  const href = $(this).attr('href');
  if (!href || !href.startsWith('#')) return;
  e.preventDefault();

  removeActiveClasses();
  isScrollingToSection = false;

  if (navMobile && navMobile.classList.contains('show')) {
    navMobile.classList.remove('show');
  }

  const offset = href === '#about' ? -60 : 110;
  const targetEl = document.querySelector(href);
  const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: targetPos,
    behavior: 'smooth'
  });
});

function handleScrollActive() {
  let currentSection = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const threshold = section.id === 'contact' ? 250 : 110;
     console.log(section.id, rect.top, threshold);
    if (rect.top <= threshold && rect.bottom > 0) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

// Reload: scroll về top, không highlight gì
window.addEventListener("load", () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  removeActiveClasses();
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
        { breakpoint: 1199, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: false } },
        { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: false } },
        { breakpoint: 767,  settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false } },
        { breakpoint: 576,  settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false } }
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
      adaptiveHeight: false,
      speed: 500,
    });
  }
});

// Happy Clients Carousel
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
  wrapper.addEventListener('touchend', function () { paused = false; }, { passive: true });
})();
document.addEventListener('click', function(e) {
  if (navMobile && navMobile.classList.contains('show')) {
    const isClickInsideNav = navMobile.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    if (!isClickInsideNav && !isClickOnToggle) {
      navMobile.classList.remove('show');
    }
  }
});