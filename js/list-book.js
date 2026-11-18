const listingForm = document.querySelector("#listing-form");
const listingMessage = document.querySelector("#listing-message");
const submittedSection = document.querySelector("#submitted-section");
const submittedListings = document.querySelector("#submitted-listings");
const listingSubmitButton = document.querySelector("#listing-submit");
const cancelEditButton = document.querySelector("#cancel-edit");

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

let savedListings = loadListings().map(function (listing) {
  return new Book(listing);
});
let editingListingId = null;

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

function clearFieldErrors() {
  for (const field of listingFields) {
    field.error.textContent = "";
    field.input.setAttribute("aria-invalid", "false");
  }
}

function createListingFromForm(id) {
  const selectedCondition = listingFields[2].input;
  return new Book({
    id: id || createListingId(),
    title: listingFields[0].input.value.trim(),
    author: listingFields[1].input.value.trim(),
    genre: "Community listing",
    condition: selectedCondition.options[selectedCondition.selectedIndex].textContent,
    offer: listingFields[3].input.value.trim(),
    note: document.querySelector("#note").value.trim(),
    image: "assets/images/open-book.svg",
    imageDescription: "Open book illustration"
  });
}

function createListingCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";

  const image = document.createElement("img");
  image.className = "book-cover-image";
  image.src = book.image;
  image.alt = book.imageDescription;
  image.loading = "lazy";

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = book.author;

  const condition = document.createElement("p");
  condition.textContent = "Condition: " + book.condition;

  const wanted = document.createElement("p");
  wanted.textContent = "Would like: " + book.offer;

  card.append(image, title, author, condition, wanted);

  if (book.note) {
    const note = document.createElement("p");
    note.textContent = book.note;
    card.append(note);
  }

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "button button-outline btn me-2";
  editButton.textContent = "Edit listing";
  editButton.addEventListener("click", function () {
    startEditingListing(book.id);
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button btn";
  deleteButton.textContent = "Delete listing";
  deleteButton.addEventListener("click", function () {
    deleteListing(book.id);
  });

  card.append(editButton, deleteButton);
  return card;
}

function renderListings() {
  submittedListings.replaceChildren();
  submittedSection.hidden = savedListings.length === 0;

  for (const book of savedListings) {
    submittedListings.append(createListingCard(book));
  }
}

function storeListings(message) {
  const stored = saveListings(savedListings.map(function (book) {
    return book.toRecord();
  }));

  listingMessage.textContent = stored
    ? message + " Your listings are saved in this browser."
    : message + " This browser could not save the change, so it will last only for this visit.";
}

function publishListing() {
  const listing = createListingFromForm(editingListingId);

  if (editingListingId) {
    savedListings = savedListings.map(function (savedListing) {
      return savedListing.id === editingListingId ? listing : savedListing;
    });
    storeListings("Your listing has been updated.");
  } else {
    savedListings.push(listing);
    storeListings("Your book has been added to the list below.");
  }

  editingListingId = null;
  listingSubmitButton.textContent = "Publish listing";
  cancelEditButton.hidden = true;
  renderListings();
  listingForm.reset();
  clearFieldErrors();
}

function startEditingListing(id) {
  const listing = savedListings.find(function (book) {
    return book.id === id;
  });

  if (!listing) {
    return;
  }

  listingFields[0].input.value = listing.title;
  listingFields[1].input.value = listing.author;
  listingFields[2].input.value = listing.condition.toLowerCase().replaceAll(" ", "-");
  listingFields[3].input.value = listing.offer;
  document.querySelector("#note").value = listing.note;
  editingListingId = listing.id;
  listingSubmitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  listingMessage.textContent = "Edit the fields above, then save your changes.";
  listingFields[0].input.focus();
}

function deleteListing(id) {
  const listing = savedListings.find(function (book) {
    return book.id === id;
  });

  if (!listing || !window.confirm("Delete the listing for \"" + listing.title + "\"?")) {
    return;
  }

  savedListings = savedListings.filter(function (book) {
    return book.id !== id;
  });
  if (editingListingId === id) {
    cancelEditing();
  }
  storeListings("The listing has been deleted.");
  renderListings();
}

function cancelEditing() {
  editingListingId = null;
  listingSubmitButton.textContent = "Publish listing";
  cancelEditButton.hidden = true;
  listingForm.reset();
  clearFieldErrors();
  listingMessage.textContent = "Editing cancelled.";
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
    if (firstInvalidField) {
      firstInvalidField.input.focus();
    }
  }
});

cancelEditButton.addEventListener("click", cancelEditing);

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

renderListings();
