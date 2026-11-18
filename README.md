# LeafLoop

LeafLoop is a responsive book exchange website for readers in Astana. It continues the group's midterm and endterm project across five connected pages: Home, Browse, List a book, My swaps, and Profile.

## Group

Olzhas Assemgazy and Amirlan Kuan, SE-2528.

## Final-stage features

- Search Open Library for books and open a detail panel with publication information, description, subjects, and a link to the book record.
- Use the `Book` class for catalogue and reader-submitted book records.
- Save favorites, the profile name, and book listings in browser `localStorage`. Saved listings can be created, viewed, edited, and deleted.
- Sort the community catalogue by title or author while keeping the search, genre, and condition filters active.
- Show loading, empty-result, timeout, and error messages for API requests.

Earlier features remain available: form validation, a live listing preview, a condition guide, favorites, and the five-page navigation.

## API

The Browse page uses the public [Open Library Search API](https://openlibrary.org/developers/api) at `https://openlibrary.org/search.json` and requests book records at `https://openlibrary.org/works/{work-id}.json`. The API does not require a key. An internet connection is needed for remote searches and book details; the community catalogue and saved browser data remain available without the API.

## Run and check the site

Open the project folder in VS Code, start Live Server, and open `index.html`. Use one browser and site address while checking `localStorage` features so all pages share the same saved data. Bootstrap, jQuery, and the book images are included in the project.

To check the main features:

1. On **Browse**, search the Open Library catalogue, open a result's details, then try the community search, genre and condition filters, and each sort option.
2. Save a community book as a favorite, open **Profile**, refresh, and remove the favorite.
3. On **List a book**, submit an empty form to see validation messages. Then publish a valid listing, edit it, refresh the page, and delete it.
4. Change the profile name and refresh the page to check that it is saved.
5. Visit all five pages, resize the browser to a phone width, and check the browser console while using the forms and controls.

## Repository and published site

- Repository: [iuve1n/Midterm_Project_Web.github.io](https://github.com/iuve1n/Midterm_Project_Web.github.io)
- Published site: [LeafLoop on GitHub Pages](https://iuve1n.github.io/Midterm_Project_Web.github.io/)
