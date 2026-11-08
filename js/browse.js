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

  card.append(image, title, author, details, requestLink);
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
});
