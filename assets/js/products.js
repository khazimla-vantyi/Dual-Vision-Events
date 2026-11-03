// Catalogue page: search, category filter, sorting, image lightbox and FAQ accordion.
var searchBox = document.getElementById("search-box");
var categoryFilter = document.getElementById("category-filter");
var sortSelect = document.getElementById("sort-select");
var productGrid = document.getElementById("product-grid");

if (searchBox && categoryFilter && sortSelect && productGrid) {
  var cards = Array.from(productGrid.querySelectorAll(".product-card"));
  var resultCount = document.getElementById("result-count");
  var noResults = document.getElementById("no-results");

  function filterProducts() {
    var searchText = searchBox.value.toLowerCase().trim();
    var category = categoryFilter.value;
    var visibleCount = 0;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var matchesSearch = card.textContent.toLowerCase().includes(searchText);
      var matchesCategory = category === "all" || card.dataset.category === category;
      card.hidden = !(matchesSearch && matchesCategory);
      if (!card.hidden) visibleCount++;
    }

    resultCount.textContent = "Showing " + visibleCount + " of " + cards.length + " items";
    noResults.hidden = visibleCount !== 0;
  }

  function sortProducts() {
    var sortType = sortSelect.value;
    cards.sort(function (a, b) {
      if (sortType === "name") return a.dataset.name.localeCompare(b.dataset.name);
      if (sortType === "price-low") return Number(a.dataset.price) - Number(b.dataset.price);
      if (sortType === "price-high") return Number(b.dataset.price) - Number(a.dataset.price);
      return Number(a.dataset.order) - Number(b.dataset.order);
    });
    for (var i = 0; i < cards.length; i++) productGrid.appendChild(cards[i]);
    filterProducts();
  }

  searchBox.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  sortSelect.addEventListener("change", sortProducts);
  filterProducts();
}

// Image lightbox
var lightbox = document.getElementById("lightbox");
if (lightbox) {
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var zoomImages = document.querySelectorAll(".zoomable");
  var previousImage = null;

  function openLightbox(image) {
    previousImage = image;
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightbox.hidden = false;
    lightbox.classList.add("open");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.hidden = true;
    if (previousImage) previousImage.focus();
  }

  for (var i = 0; i < zoomImages.length; i++) {
    zoomImages[i].addEventListener("click", function () { openLightbox(this); });
    zoomImages[i].addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(this);
      }
    });
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}

// FAQ accordion
var faqQuestions = document.querySelectorAll(".faq-question");
for (var j = 0; j < faqQuestions.length; j++) {
  faqQuestions[j].addEventListener("click", function () {
    var answer = this.nextElementSibling;
    var isOpen = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!isOpen));
    answer.hidden = isOpen;
    answer.classList.toggle("open", !isOpen);
  });
}
