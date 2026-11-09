document.querySelectorAll(".book-cover-image").forEach(function (image) {
  function showFallback() {
    image.src = "assets/images/book-stack.svg";
    image.alt = "Book illustration";
  }

  image.addEventListener("error", showFallback, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    showFallback();
  }
});
