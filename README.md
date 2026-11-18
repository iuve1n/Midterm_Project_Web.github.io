# LeafLoop

LeafLoop is a responsive book exchange demo for readers in Astana. For the final project, we built on the same five pages from the midterm and endterm projects. The pages are Home, Browse, List a book, My swaps, and Profile.

## Group

Olzhas Assemgazy and Amirlan Kuan, SE-2528.

## What we added for the final project

- On Browse, search Open Library by title or author. Results show the cover, author, and publication year when available. **View details** opens the description and subjects in LeafLoop.
- Sort the community catalogue by title or author. Sorting works with the existing search, genre, and condition filters.
- Publish, edit, and delete listings on **List a book**. Saved listings stay on that page after a refresh.
- Change the display name on **Profile**. The saved name also appears in the shelf heading.

## Features we kept

The community catalogue still supports search and filters. You can save a book on Browse and remove it from favorites on Profile. The listing form still checks required fields, shows a live preview, and has a condition guide you can show or hide. **My swaps** shows sample requests and their statuses.

The project uses HTML, CSS, Bootstrap, JavaScript, and jQuery. The `Book` class is shared by the community catalogue and listing form. Listings, favorites, and the profile name are saved in the browser using `localStorage`.

## API

Book search uses `https://openlibrary.org/search.json` and shows up to nine results. When you open the details, LeafLoop requests `https://openlibrary.org/works/{work-id}.json`. Covers load from the Covers API, with a local illustration for missing images. All three requests work without an API key and require an internet connection. Search and details show loading and error messages, and search also tells you when there are no matches. [Open Library API docs](https://openlibrary.org/developers/api)

## Run and check the site

Open the project folder in VS Code and start Live Server on `index.html`. Open each page from the site navigation so the pages share the same browser storage.

1. On Browse, look up `The Hobbit` under **Find more books**. Open **View details**, then close it to return to the results.
2. In the community catalogue, select a genre or condition and change **Sort by**. Save a favorite and check it on Profile.
3. On **List a book**, submit an empty form to see the validation messages. Fill it in to see the preview. Publish the listing, refresh the page, then edit or delete it below the form. Try hiding and showing the condition guide.
4. On Profile, enter a name and click **Save name**. Refresh the page to check that the name stays saved.

## Image credits

The sample book covers come from [Open Library](https://openlibrary.org). The open book illustration used for new listings and missing search covers is by [MajinCline on OpenClipart](https://openclipart.org/detail/29190).

## Repository and published site

- Repository: [iuve1n/Midterm_Project_Web.github.io](https://github.com/iuve1n/Midterm_Project_Web.github.io)
- Published site: [LeafLoop on GitHub Pages](https://iuve1n.github.io/Midterm_Project_Web.github.io/)
