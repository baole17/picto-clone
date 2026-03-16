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
    $(".blog-slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if ($(".clients-slider").length) {
    $(".clients-slider").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: "linear",
      pauseOnHover: true,
      pauseOnFocus: false,
      draggable: false,
      swipe: false,
      touchMove: false,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
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