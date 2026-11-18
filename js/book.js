class Book {
  constructor(data) {
    this.id = data.id || ((data.title || "") + "-" + (data.author || ""))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    this.title = data.title || "";
    this.author = data.author || "";
    this.genre = data.genre || "Fiction";
    this.condition = data.condition || "Good";
    this.offer = data.offer || "Open to offers";
    this.image = data.image || "assets/images/open-book.svg";
    this.imageDescription = data.imageDescription || "Book illustration";
    this.note = typeof data.note === "string" ? data.note : "";
  }

  matchesSearch(searchText) {
    const searchValue = searchText.toLowerCase().trim();
    return this.title.toLowerCase().includes(searchValue)
      || this.author.toLowerCase().includes(searchValue);
  }

  toRecord() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      genre: this.genre,
      condition: this.condition,
      offer: this.offer,
      image: this.image,
      imageDescription: this.imageDescription,
      note: this.note
    };
  }
}
