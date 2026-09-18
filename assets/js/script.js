const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
  });
}