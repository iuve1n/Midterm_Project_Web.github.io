# LeafLoop

LeafLoop is a responsive book exchange website for readers in Astana. It continues the group's midterm project and has pages for browsing books, offering a book, reviewing swaps, and viewing a profile.

## Group

Olzhas Assemgazy and Amirlan Kuan, SE-2528.

## Pages

- `index.html` introduces LeafLoop and shows recently listed books.
- `browse.html` displays the book catalogue, search and filter controls, and favorites.
- `list-book.html` contains the book listing form and condition guide.
- `swaps.html` shows sample swap requests and their status.
- `profile.html` displays a reader profile and available books.

## Features

- The browse page builds book cards from a JavaScript array.
- Search books by title or author, then filter by genre and condition.
- Add books to or remove them from the favorites list. Favorites stay on the page until it is refreshed.
- The listing form checks required fields and text length, shows a message by each field, and adds a valid listing to the page. Listings are temporary and clear when the page is refreshed.
- Book covers are provided by [Open Library](https://openlibrary.org). New listings use an open-book image from [OpenClipart](https://openclipart.org/detail/29190).

## Technologies

The project uses HTML, CSS, Bootstrap, and JavaScript. The layout uses CSS Grid and Flexbox, and Bootstrap handles the responsive navigation and form styling.

## Run and check the site

Open `index.html` in a browser. The Bootstrap files are included in the project.

To check the interactive features:

1. Open **Browse**. Search by a book title or author, then choose a genre or condition.
2. Add a book to favorites, remove it, and check that the saved count changes.
3. Open **List a book**. Submit the empty form to see field messages. Then enter a valid title, author, condition, and swap request to add a listing card.
4. Resize the browser to check the navigation and page layout on a narrow screen.

The listing form does not save data to a server.

## Published site

[LeafLoop on GitHub Pages](https://iuve1n.github.io/Midterm_Project_Web.github.io/)
