const books = [
  {
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Fiction",
    condition: "Good",
    offer: "Swap for contemporary fiction",
    image: "assets/images/cover-leaf.svg",
    imageDescription: "Abstract green cover for Normal People"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    condition: "Like new",
    offer: "Swap for a travel book",
    image: "assets/images/cover-orange.svg",
    imageDescription: "Abstract orange cover for The Alchemist"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-fiction",
    condition: "Well read",
    offer: "Open to any non-fiction",
    image: "assets/images/cover-ink.svg",
    imageDescription: "Abstract dark green cover for Sapiens"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    condition: "Good",
    offer: "Looking for another fantasy book",
    image: "assets/images/cover-leaf.svg",
    imageDescription: "Abstract green cover for The Hobbit"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Non-fiction",
    condition: "Like new",
    offer: "Open to offers",
    image: "assets/images/cover-orange.svg",
    imageDescription: "Abstract orange cover for Educated"
  },
  {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    condition: "Well read",
    offer: "Swap for fiction",
    image: "assets/images/cover-ink.svg",
    imageDescription: "Abstract dark green cover for The Night Circus"
  }
];

const favoriteBooks = [];

function getFilteredBooks(bookList, searchText, selectedGenre, selectedCondition) {
  const searchValue = searchText.toLowerCase().trim();

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
  image.src = book.image;
  image.alt = book.imageDescription;

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
  favoriteButton.className = "favorite-button";
  favoriteButton.setAttribute("aria-pressed", isFavorite ? "true" : "false");
  favoriteButton.textContent = isFavorite ? "Remove from favorites" : "Add to favorites";
  favoriteButton.addEventListener("click", function () {
    toggleFavorite(book);
  });

  card.append(image, title, author, details, requestLink, favoriteButton);
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

  updateBooks();
  renderFavorites();
}

function updateBooks() {
  const searchText = document.querySelector("#search").value;
  const selectedGenre = document.querySelector("#genre").value;
  const selectedCondition = document.querySelector("#condition").value;
  const filteredBooks = getFilteredBooks(books, searchText, selectedGenre, selectedCondition);

  renderBooks(filteredBooks);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#search").addEventListener("input", updateBooks);
  document.querySelector("#genre").addEventListener("change", updateBooks);
  document.querySelector("#condition").addEventListener("change", updateBooks);

  renderBooks(books);
  renderFavorites();
});
