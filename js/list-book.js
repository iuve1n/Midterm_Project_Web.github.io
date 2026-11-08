const listingForm = document.querySelector("#listing-form");
const listingMessage = document.querySelector("#listing-message");
const submittedSection = document.querySelector("#submitted-section");
const submittedListings = document.querySelector("#submitted-listings");

const listingFields = [
  {
    input: document.querySelector("#title"),
    error: document.querySelector("#title-error"),
    label: "Book title",
    minimumLength: 2
  },
  {
    input: document.querySelector("#author"),
    error: document.querySelector("#author-error"),
    label: "Author",
    minimumLength: 2
  },
  {
    input: document.querySelector("#book-condition"),
    error: document.querySelector("#book-condition-error"),
    label: "Condition",
    minimumLength: 0
  },
  {
    input: document.querySelector("#wanted"),
    error: document.querySelector("#wanted-error"),
    label: "Swap request",
    minimumLength: 3
  }
];

function validateField(field) {
  const value = field.input.value.trim();
  let message = "";

  if (value === "") {
    message = field.label + " is required.";
  } else if (field.minimumLength > 0 && value.length < field.minimumLength) {
    message = field.label + " must be at least " + field.minimumLength + " characters.";
  }

  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", message === "" ? "false" : "true");
  return message === "";
}

function validateListing() {
  let isValid = true;

  for (const field of listingFields) {
    if (!validateField(field)) {
      isValid = false;
    }
  }

  return isValid;
}

function createListingCard() {
  const card = document.createElement("article");
  card.className = "book-card";

  const title = document.createElement("h3");
  title.textContent = listingFields[0].input.value.trim();

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = listingFields[1].input.value.trim();

  const condition = document.createElement("p");
  condition.textContent = "Condition: " + listingFields[2].input.options[listingFields[2].input.selectedIndex].textContent;

  const wanted = document.createElement("p");
  wanted.textContent = "Would like: " + listingFields[3].input.value.trim();

  const noteValue = document.querySelector("#note").value.trim();
  if (noteValue !== "") {
    const note = document.createElement("p");
    note.textContent = noteValue;
    card.append(note);
  }

  card.prepend(title, author, condition, wanted);
  return card;
}

function publishListing() {
  submittedListings.append(createListingCard());
  submittedSection.hidden = false;
  listingMessage.textContent = "Your book has been added to the list below.";
  listingForm.reset();

  for (const field of listingFields) {
    field.input.setAttribute("aria-invalid", "false");
  }
}

listingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  listingMessage.textContent = "";

  if (validateListing()) {
    publishListing();
  } else {
    const firstInvalidField = listingFields.find(function (field) {
      return field.input.getAttribute("aria-invalid") === "true";
    });
    firstInvalidField.input.focus();
  }
});

for (const field of listingFields) {
  field.input.addEventListener("input", function () {
    validateField(field);
    listingMessage.textContent = "";
  });

  field.input.addEventListener("change", function () {
    validateField(field);
    listingMessage.textContent = "";
  });
}
