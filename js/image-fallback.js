document.querySelectorAll(".book-cover-image").forEach(function (image) {
  image.addEventListener("error", function () {
    image.src = "assets/images/book-stack.svg";
  }, { once: true });
});
