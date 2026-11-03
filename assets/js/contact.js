// Contact page: interactive map and simple form validation.

// 1. Interactive map (Leaflet)
var mapElement = document.getElementById("map");
if (mapElement && typeof L !== "undefined") {
  // These are approximate Gqeberha coordinates. Confirm the exact pin before publishing.
  var shopLat = -33.9611;
  var shopLng = 25.6149;

  var map = L.map("map").setView([shopLat, shopLng], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([shopLat, shopLng]).addTo(map)
    .bindPopup("<strong>Dual Vision Events</strong><br>8 Willowmore Road, Bridgemead, Gqeberha");
}

// 2. Contact form validation
var contactForm = document.getElementById("contact-form");
if (contactForm) {
  var successBox = document.getElementById("form-success");

  function showContactError(fieldId, message) {
    var error = document.getElementById(fieldId + "-error");
    if (error) error.textContent = message;
  }

  function clearContactErrors() {
    var errors = contactForm.querySelectorAll(".error-msg");
    for (var i = 0; i < errors.length; i++) errors[i].textContent = "";
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearContactErrors();
    successBox.style.display = "none";

    var name = document.getElementById("fullname").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var type = document.getElementById("msgtype").value;
    var message = document.getElementById("message").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^0[0-9]{9}$/;
    var valid = true;

    if (name.length < 2) {
      showContactError("fullname", "Please enter your full name (at least 2 characters).");
      valid = false;
    }
    if (!emailPattern.test(email)) {
      showContactError("email", "Please enter a valid email address.");
      valid = false;
    }
    if (!phonePattern.test(phone)) {
      showContactError("phone", "Enter a 10-digit South African number starting with 0.");
      valid = false;
    }
    if (type === "") {
      showContactError("msgtype", "Please choose a message type.");
      valid = false;
    }
    if (message.length < 10 || message.length > 500) {
      showContactError("message", "Your message must be between 10 and 500 characters.");
      valid = false;
    }

    if (!valid) return;

    var recipient = "dualvision.events@gmail.com";
    var subject = "Website message: " + type;
    var body = "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone +
      "\nMessage type: " + type + "\n\n" + message;

    successBox.textContent = "Thank you, " + name + ". Your email application should open with your message ready to send. If it does not open, email " + recipient + ".";
    successBox.style.display = "block";
    window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    contactForm.reset();
  });
}
