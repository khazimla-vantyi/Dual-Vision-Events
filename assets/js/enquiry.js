// Enquiry page: show the correct fields, validate input and calculate hire estimates.
var enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
  var responseBox = document.getElementById("enquiry-response");
  var hireFields = document.getElementById("hire-fields");
  var enquiryRadios = document.querySelectorAll('input[name="enquiry-type"]');
  var dateInput = document.getElementById("eventdate");
  var hireInputs = [
    document.getElementById("item"),
    document.getElementById("quantity"),
    document.getElementById("days"),
    dateInput
  ];

  // Use the visitor's local date, rather than UTC.
  var now = new Date();
  var today = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") +
    "-" + String(now.getDate()).padStart(2, "0");
  dateInput.min = today;

  function getEnquiryType() {
    var selected = document.querySelector('input[name="enquiry-type"]:checked');
    return selected ? selected.value : "";
  }

  function updateEnquiryFields() {
    var isProducts = getEnquiryType() === "products";
    hireFields.hidden = !isProducts;
    for (var i = 0; i < hireInputs.length; i++) {
      hireInputs[i].required = isProducts;
    }
  }

  for (var i = 0; i < enquiryRadios.length; i++) {
    enquiryRadios[i].addEventListener("change", updateEnquiryFields);
  }
  updateEnquiryFields();

  function showEnquiryError(fieldId, message) {
    var error = document.getElementById(fieldId + "-error");
    if (error) error.textContent = message;
  }

  function clearEnquiryErrors() {
    var errors = enquiryForm.querySelectorAll(".error-msg");
    for (var i = 0; i < errors.length; i++) errors[i].textContent = "";
  }

  function addResponseLine(tag, text) {
    var element = document.createElement(tag);
    element.textContent = text;
    responseBox.appendChild(element);
  }

  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearEnquiryErrors();
    responseBox.style.display = "none";
    responseBox.textContent = "";

    var type = getEnquiryType();
    var name = document.getElementById("full-name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var message = document.getElementById("message").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^0[0-9]{9}$/;
    var valid = true;

    if (type === "") {
      showEnquiryError("enquiry-type", "Please select an enquiry type.");
      valid = false;
    }
    if (name.length < 2) {
      showEnquiryError("full-name", "Please enter your full name (at least 2 characters).");
      valid = false;
    }
    if (!emailPattern.test(email)) {
      showEnquiryError("email", "Please enter a valid email address.");
      valid = false;
    }
    if (!phonePattern.test(phone)) {
      showEnquiryError("phone", "Enter a 10-digit South African number starting with 0.");
      valid = false;
    }
    if (message.length < 10 || message.length > 500) {
      showEnquiryError("message", "Your message must be between 10 and 500 characters.");
      valid = false;
    }

    var itemSelect = document.getElementById("item");
    var quantity = Number(document.getElementById("quantity").value);
    var days = Number(document.getElementById("days").value);
    var eventDate = dateInput.value;

    if (type === "products") {
      if (itemSelect.value === "") {
        showEnquiryError("item", "Please choose the equipment you want to hire.");
        valid = false;
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
        showEnquiryError("quantity", "Enter a whole number between 1 and 500.");
        valid = false;
      }
      if (!Number.isInteger(days) || days < 1 || days > 14) {
        showEnquiryError("days", "Enter between 1 and 14 hire days.");
        valid = false;
      }
      if (eventDate === "" || eventDate < today) {
        showEnquiryError("eventdate", "Choose today or a future event date.");
        valid = false;
      }
    }

    if (!valid) return;

    var emailBody = "Enquiry type: " + type + "\nName: " + name + "\nEmail: " + email +
      "\nPhone: " + phone + "\n";

    addResponseLine("h2", "Thank you, " + name + "!");

    if (type === "products") {
      var pricePerDay = Number(itemSelect.value);
      var itemName = itemSelect.options[itemSelect.selectedIndex].text;
      var total = pricePerDay * quantity * days;
      var totalText = "R" + total.toLocaleString("en-ZA");

      addResponseLine("p", "Estimated hire cost: " + totalText + ".");
      addResponseLine("p", "We will confirm availability for " + eventDate + " by email or phone.");
      addResponseLine("p", "Delivery and collection, if needed, are quoted separately.");
      emailBody += "Equipment: " + itemName + "\nQuantity: " + quantity + "\nDays: " + days +
        "\nEvent date: " + eventDate + "\nEstimated cost: " + totalText + "\n";
    } else if (type === "services") {
      addResponseLine("p", "We will reply within one working day about our event services.");
    } else if (type === "sponsorship") {
      addResponseLine("p", "Thank you for your interest in partnering with us. We will contact you about sponsorship.");
    } else {
      addResponseLine("p", "Thank you for offering to help. We will contact you if a suitable opportunity becomes available.");
    }

    emailBody += "\nMessage: " + message;
    var mailLink = document.createElement("a");
    mailLink.className = "btn";
    mailLink.textContent = "Email This Enquiry To Us";
    mailLink.href = "mailto:dualvision.events@gmail.com?subject=" +
      encodeURIComponent("Website enquiry: " + type) + "&body=" + encodeURIComponent(emailBody);
    responseBox.appendChild(mailLink);
    responseBox.style.display = "block";
    responseBox.scrollIntoView({ behavior: "smooth" });
  });
}
