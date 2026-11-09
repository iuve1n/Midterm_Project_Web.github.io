# LeafLoop

LeafLoop is a responsive book exchange website for readers in Astana. It continues the group's midterm project and has pages for browsing books, offering a book, reviewing swaps, and viewing a profile.

## Group

Olzhas Assemgazy and Amirlan Kuan, SE-2528.

## Pages

- `index.html` introduces LeafLoop and shows recently listed books.
- `browse.html` displays the book catalogue, search and filter controls, and buttons for saving favorites.
- `list-book.html` contains the book listing form and condition guide.
- `swaps.html` shows sample swap requests and their status.
- `profile.html` displays a reader profile, available books, and saved favorites.

## Endterm features

- The browse page builds book cards from a JavaScript array.
- Search books by title or author, then filter by genre and condition.
- Save books from Browse and view or remove them in Profile. Favorites are stored in the browser and stay saved when you change pages or refresh.
- The listing form checks required fields and text length, shows a message by each field, and adds a valid listing to the page. Listings are temporary and clear when the page is refreshed.
- A live preview shows the book details while the user fills in the listing form. It fades away when the form is cleared after publishing.
- The condition guide can be shown or hidden with a sliding effect.

## Technologies

The project uses HTML, CSS, Bootstrap, JavaScript, and jQuery 3.7.1. CSS Grid and Flexbox handle the layout, while Bootstrap provides the responsive navigation and form styles. jQuery handles the listing preview and condition guide effects.

## Run and check the site

Use Live Server in VS Code and open `index.html`. This lets Browse and Profile share browser storage for favorites. Bootstrap, jQuery, and the images are included in the project.

To check the interactive features:

1. Open **Browse**. Search for a title or author. Try the genre and condition filters together, then search for something that has no matches to see the empty result message.
2. Add a book to favorites on **Browse**, then open **Profile**. Check the saved book and count. Refresh to check that it stays saved, then remove it. Return to **Browse** and check that its button says **Add to favorites** again.
3. Open **List a book** and submit the empty form. Each required field should show its own message, and the first invalid field should receive focus. Try a one-letter title or author and a swap request shorter than three characters.
4. Enter a title and author with at least two characters, choose a condition, and enter a swap request with at least three characters. Watch the preview update as you type. Publish the listing to see the success message and new book card. The form and preview should clear.
5. Click **Hide condition guide**, then **Show condition guide**, to check the jQuery sliding effect.
6. Visit all five pages and check the book covers. Resize the browser to a phone width and use the navigation menu. Open the browser console while trying the features and check for errors.

The listing form does not save data to a server.

## Images

The book covers come from [Open Library](https://openlibrary.org) and are stored in `assets/images/covers`. New listings use an open-book illustration from [OpenClipart](https://openclipart.org/detail/29190). The local book-stack illustration is also used if a cover cannot load.

## Published site

[LeafLoop on GitHub Pages](https://iuve1n.github.io/Midterm_Project_Web.github.io/)
