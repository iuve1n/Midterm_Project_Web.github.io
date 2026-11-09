const books = [
  {
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Fiction",
    condition: "Good",
    offer: "Swap for contemporary fiction",
    image: "assets/images/covers/normal-people.jpg",
    imageDescription: "Cover of Normal People by Sally Rooney"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    condition: "Like new",
    offer: "Swap for a travel book",
    image: "assets/images/covers/the-alchemist.jpg",
    imageDescription: "Cover of The Alchemist by Paulo Coelho"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-fiction",
    condition: "Well read",
    offer: "Open to any non-fiction",
    image: "assets/images/covers/sapiens.jpg",
    imageDescription: "Cover of Sapiens by Yuval Noah Harari"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    condition: "Good",
    offer: "Looking for another fantasy book",
    image: "assets/images/covers/the-hobbit.jpg",
    imageDescription: "Cover of The Hobbit by J.R.R. Tolkien"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Non-fiction",
    condition: "Like new",
    offer: "Open to offers",
    image: "assets/images/covers/educated.jpg",
    imageDescription: "Cover of Educated by Tara Westover"
  },
  {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    condition: "Well read",
    offer: "Swap for fiction",
    image: "assets/images/covers/the-night-circus.jpg",
    imageDescription: "Cover of The Night Circus by Erin Morgenstern"
  }
];

const favoriteBooks = loadFavorites();
const defaultBookImage = "assets/images/open-book.svg";

function loadFavorites() {
  try {
    const savedTitles = JSON.parse(localStorage.getItem("leafloop-favorites") || "[]");

    if (!Array.isArray(savedTitles)) {
      return [];
    }

    return books.filter(function (book) {
      return savedTitles.includes(book.title);
    });
  } catch {
    return [];
  }
}

function saveFavorites() {
  const savedTitles = favoriteBooks.map(function (book) {
    return book.title;
  });

  try {
    localStorage.setItem("leafloop-favorites", JSON.stringify(savedTitles));
    return true;
  } catch {
    return false;
  }
}

function getFilteredBooks(bookList, searchText, selectedGenre, selectedCondition) {
  const searchValue = searchText.toLowerCase().trim();

  // Apply every active filter together so one control does not reset another.
  return bookList.filter(function (book) {
    const matchesSearch = book.title.toLowerCase().includes(searchValue)
      || book.author.toLowerCase().includes(searchValue);
    const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
    const matchesCondition = selectedCondition === "all" || book.condition === selectedCondition;

    return matchesSearch && matchesGenre && matchesCondition;
  });
}

function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";

  const image = document.createElement("img");
  image.className = "book-cover-image";
  image.src = book.image || defaultBookImage;
  image.alt = book.imageDescription || "Open book illustration";
  image.loading = "lazy";
  image.addEventListener("error", function () {
    image.src = "assets/images/book-stack.svg";
    image.alt = "Book illustration";
  }, { once: true });

  const title = document.createElement("h2");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = book.author;

  const details = document.createElement("p");
  const condition = document.createElement("span");
  condition.className = "tag";
  condition.textContent = book.condition + " condition";
  details.append(condition, document.createElement("br"), book.offer);

  const requestLink = document.createElement("a");
  requestLink.className = "button btn";
  requestLink.href = "swaps.html";
  requestLink.textContent = "Request swap";

  const favoriteButton = document.createElement("button");
  const isFavorite = favoriteBooks.some(function (favoriteBook) {
    return favoriteBook.title === book.title;
  });
  favoriteButton.type = "button";
  favoriteButton.className = "button button-outline favorite-button";
  favoriteButton.setAttribute("aria-pressed", isFavorite ? "true" : "false");
  favoriteButton.textContent = isFavorite ? "Remove from favorites" : "Add to favorites";
  favoriteButton.addEventListener("click", function () {
    toggleFavorite(book);
  });

  const actions = document.createElement("div");
  actions.className = "book-actions";
  actions.append(requestLink, favoriteButton);

  card.append(image, title, author, details, actions);
  return card;
}

function renderBooks(bookList) {
  const bookListElement = document.querySelector("#book-list");
  const resultsMessage = document.querySelector("#book-results");
  bookListElement.replaceChildren();

  for (const book of bookList) {
    bookListElement.append(createBookCard(book));
  }

  if (bookList.length === 0) {
    resultsMessage.textContent = "No books match those filters.";
  } else {
    resultsMessage.textContent = bookList.length + " books found.";
  }
}

function renderFavorites() {
  const favoriteList = document.querySelector("#favorite-list");
  const favoriteCount = document.querySelector("#favorite-count");
  const emptyMessage = document.querySelector("#favorite-empty");
  favoriteList.replaceChildren();

  for (const book of favoriteBooks) {
    favoriteList.append(createBookCard(book));
  }

  const savedCount = favoriteBooks.length;
  favoriteCount.textContent = savedCount + (savedCount === 1 ? " book saved" : " books saved");
  emptyMessage.hidden = savedCount > 0;
}

function toggleFavorite(book) {
  const favoriteIndex = favoriteBooks.findIndex(function (favoriteBook) {
    return favoriteBook.title === book.title;
  });

  if (favoriteIndex === -1) {
    favoriteBooks.push(book);
  } else {
    favoriteBooks.splice(favoriteIndex, 1);
  }

  const saved = saveFavorites();
  const message = document.querySelector("#favorite-message");
  message.textContent = saved ? "" : "Favorites could not be saved in this browser.";

  if (document.querySelector("#book-list")) {
    updateBooks();
  }

  if (document.querySelector("#favorite-list")) {
    renderFavorites();
  }
}

function updateBooks() {
  const searchText = document.querySelector("#search").value;
  const selectedGenre = document.querySelector("#genre").value;
  const selectedCondition = document.querySelector("#condition").value;
  const filteredBooks = getFilteredBooks(books, searchText, selectedGenre, selectedCondition);

  renderBooks(filteredBooks);
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#book-list")) {
    document.querySelector("#search").addEventListener("input", updateBooks);
    document.querySelector("#genre").addEventListener("change", updateBooks);
    document.querySelector("#condition").addEventListener("change", updateBooks);

    renderBooks(books);
  }

  if (document.querySelector("#favorite-list")) {
    renderFavorites();
  }
});
