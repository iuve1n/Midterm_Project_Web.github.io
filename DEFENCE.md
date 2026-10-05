# LeafLoop project defence

## Project overview

LeafLoop is a static website concept for readers in Astana who want to exchange books. It has five pages: a home page, a book catalogue, a listing form, a swaps page, and a reader profile. The shared navigation connects the pages, and a common stylesheet gives them the same visual style.

## Design and implementation

The pages use semantic HTML elements such as `header`, `nav`, `main`, `section`, `aside`, and `footer`. CSS Grid lays out the hero, statistics, and book cards. Flexbox is used for the navigation and footer. Bootstrap supplies the collapsible navigation and form styles, while the custom stylesheet handles LeafLoop's colors, typography, spacing, and responsive layouts.

The stylesheet has tablet and mobile breakpoints at 992px and 576px. On smaller screens, the book cards use a single column, the navigation can be opened from its menu button, and the condition table can scroll horizontally inside its wrapper.

## Form and page behavior

The listing form has required fields, so the browser checks them before submission. It is a classroom demo and does not store a listing. The browse controls and example swaps are also sample interface content.

The book condition guide is a table on the listing page. It explains what “Like new,” “Good,” and “Well read” mean for a book's cover and pages.

## Limits and next steps

The pages do not use a server or database, and the browse controls do not filter the sample listings. A next version could save listings and make book search and swap requests work.
