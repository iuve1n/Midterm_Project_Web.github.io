const bookSearchForm = document.querySelector("#book-search-form");
const bookSearchInput = document.querySelector("#book-search-query");
const bookSearchButton = document.querySelector("#book-search-button");
const bookSearchMessage = document.querySelector("#book-search-message");
const bookSearchResults = document.querySelector("#book-search-results");

function createSearchCover(book, size) {
  const image = document.createElement("img");
  image.className = "book-cover-image";
  image.src = "assets/images/open-book.svg";
  image.alt = "Open book illustration";
  image.loading = "lazy";

  if (Number.isInteger(book.cover_i) && book.cover_i > 0) {
    image.src = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-" + size + ".jpg?default=false";
    image.alt = "Cover of " + book.title;
  }

  image.addEventListener("error", function () {
    image.src = "assets/images/open-book.svg";
    image.alt = "Open book illustration";
  }, { once: true });

  return image;
}

function createSearchCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  const image = createSearchCover(book, "M");

  const title = document.createElement("h3");
  title.textContent = book.title || "Untitled book";

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = Array.isArray(book.author_name) && book.author_name.length > 0
    ? book.author_name.join(", ")
    : "Unknown author";

  const year = document.createElement("p");
  year.textContent = book.first_publish_year
    ? "First published in " + book.first_publish_year
    : "Publication year unavailable";

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.className = "button btn";
  detailsButton.textContent = "View details";
  detailsButton.addEventListener("click", function () {
    openBookDetails(book);
  });

  const actions = document.createElement("div");
  actions.className = "book-actions";
  actions.append(detailsButton);
  card.append(image, title, author, year, actions);
  return card;
}

function displaySearchResults(searchResults) {
  for (const book of searchResults) {
    bookSearchResults.append(createSearchCard(book));
  }

  bookSearchResults.hidden = searchResults.length === 0;

  if (searchResults.length === 0) {
    bookSearchMessage.textContent = "No books found. Try another title or author.";
  } else {
    bookSearchMessage.textContent = "Showing " + searchResults.length
      + (searchResults.length === 1 ? " book." : " books.");
  }
}

async function searchBooks(event) {
  event.preventDefault();

  if (bookSearchButton.disabled) {
    return;
  }

  const query = bookSearchInput.value.trim();

  if (query === "") {
    bookSearchInput.setAttribute("aria-invalid", "true");
    bookSearchMessage.textContent = "Enter a book title or author.";
    bookSearchInput.focus();
    return;
  }

  bookSearchInput.setAttribute("aria-invalid", "false");
  bookSearchResults.replaceChildren();
  bookSearchResults.hidden = true;
  bookSearchResults.setAttribute("aria-busy", "true");
  bookSearchMessage.textContent = "Searching for books...";
  bookSearchButton.disabled = true;
  bookSearchButton.textContent = "Searching...";

  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, 15000);

  const parameters = new URLSearchParams({
    q: query,
    limit: "9",
    fields: "key,title,author_name,first_publish_year,cover_i"
  });

  try {
    const response = await fetch("https://openlibrary.org/search.json?" + parameters, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Book search failed");
    }

    const data = await response.json();

    if (!Array.isArray(data.docs)) {
      throw new Error("Book results are unavailable");
    }

    const searchResults = data.docs.filter(function (book) {
      return book && /^\/works\/OL\d+W$/.test(book.key);
    });

    displaySearchResults(searchResults.slice(0, 9));
  } catch (error) {
    bookSearchResults.replaceChildren();
    bookSearchResults.hidden = true;
    bookSearchMessage.textContent = error.name === "AbortError"
      ? "The search took too long. Please try again."
      : "Books could not be loaded. Check your connection and try again.";
  } finally {
    clearTimeout(timeout);
    bookSearchButton.disabled = false;
    bookSearchButton.textContent = "Search books";
    bookSearchResults.setAttribute("aria-busy", "false");
  }
}

bookSearchForm.addEventListener("submit", searchBooks);

bookSearchInput.addEventListener("input", function () {
  if (bookSearchInput.getAttribute("aria-invalid") === "true") {
    bookSearchInput.setAttribute("aria-invalid", "false");
    bookSearchMessage.textContent = "";
  }
});
