// Shared JavaScript: mobile navigation on all pages.
var navToggle = document.getElementById("nav-toggle");
var mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  var navLinks = mainNav.querySelectorAll("a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
