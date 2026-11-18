const bookDetailsDialog = document.querySelector("#book-details");
const bookDetailsContent = document.querySelector("#book-details-content");
const bookDetailsMessage = document.querySelector("#book-details-message");
const bookDetailsRetry = document.querySelector("#book-details-retry");
let selectedSearchBook = null;
let detailsRequest = null;

function showBookDetails(book, details) {
  const title = details.title || book.title || "Untitled book";
  document.querySelector("#book-details-title").textContent = title;
  document.querySelector("#book-details-author").textContent = Array.isArray(book.author_name)
    && book.author_name.length > 0 ? book.author_name.join(", ") : "Unknown author";

  const publication = book.first_publish_year || details.first_publish_date;
  document.querySelector("#book-details-year").textContent = publication
    ? "First published " + publication
    : "Publication date unavailable";

  let description = details.description;

  if (description && typeof description === "object") {
    description = description.value;
  }

  document.querySelector("#book-details-description").textContent = typeof description === "string"
    && description.trim() !== "" ? description.trim() : "No description is available for this book.";

  const subjects = Array.isArray(details.subjects) ? details.subjects.slice(0, 10) : [];
  document.querySelector("#book-details-subjects").textContent = subjects.length > 0
    ? subjects.join(", ")
    : "No subjects are listed.";

  let coverId = book.cover_i;

  if (!Number.isInteger(coverId) || coverId <= 0) {
    coverId = Array.isArray(details.covers) ? details.covers.find(function (cover) {
      return Number.isInteger(cover) && cover > 0;
    }) : null;
  }

  const image = createSearchCover({ title: title, cover_i: coverId }, "L");
  document.querySelector("#book-details-cover").replaceChildren(image);
  document.querySelector("#book-details-link").href = "https://openlibrary.org" + book.key;
  bookDetailsContent.hidden = false;
}

async function loadBookDetails(book) {
  if (detailsRequest) {
    detailsRequest.abort();
  }

  const controller = new AbortController();
  detailsRequest = controller;
  bookDetailsContent.hidden = true;
  bookDetailsContent.setAttribute("aria-busy", "true");
  bookDetailsRetry.hidden = true;
  document.querySelector("#book-details-title").textContent = book.title || "Book details";
  bookDetailsMessage.textContent = "Loading book details...";

  const timeout = setTimeout(function () {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch("https://openlibrary.org" + book.key + ".json", {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Book details could not be loaded");
    }

    const details = await response.json();

    if (!details || typeof details.title !== "string") {
      throw new Error("Book details are unavailable");
    }

    if (detailsRequest !== controller) {
      return;
    }

    showBookDetails(book, details);
    bookDetailsMessage.textContent = "";
  } catch (error) {
    if (detailsRequest !== controller) {
      return;
    }

    bookDetailsMessage.textContent = error.name === "AbortError"
      ? "The book details took too long to load. Please try again."
      : "Book details could not be loaded. Please try again.";
    bookDetailsRetry.hidden = false;
  } finally {
    clearTimeout(timeout);

    if (detailsRequest === controller) {
      detailsRequest = null;
      bookDetailsContent.setAttribute("aria-busy", "false");
    }
  }
}

function openBookDetails(book) {
  selectedSearchBook = book;
  bookDetailsDialog.showModal();
  loadBookDetails(book);
}

document.querySelector("#book-details-close").addEventListener("click", function () {
  bookDetailsDialog.close();
});

bookDetailsDialog.addEventListener("close", function () {
  if (bookDetailsDialog.open) {
    return;
  }

  if (detailsRequest) {
    detailsRequest.abort();
    detailsRequest = null;
  }

  bookDetailsContent.setAttribute("aria-busy", "false");
});

bookDetailsRetry.addEventListener("click", function () {
  loadBookDetails(selectedSearchBook);
});
