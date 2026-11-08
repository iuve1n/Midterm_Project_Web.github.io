$(function () {
  const $listingForm = $("#listing-form");
  const $conditionToggle = $(".condition-toggle");
  const $conditionTable = $("#condition-table");

  $conditionToggle.prop("hidden", false);

  $conditionToggle.on("click", function () {
    const $button = $(this);
    const isExpanded = $button.attr("aria-expanded") === "true";

    $button.attr("aria-expanded", String(!isExpanded));
    $button.text(isExpanded ? "Show condition guide" : "Hide condition guide");
    $conditionTable.stop(true, true).slideToggle(220);
  });

  $listingForm.on("reset", function () {
    const $preview = $(this).closest(".list-form").find("#listing-preview");

    $preview.stop(true, true).fadeOut(180, function () {
      $preview.prop("hidden", true);
    });
  });

  $listingForm.on("input change", "input, textarea, select", function () {
    const $form = $(this).closest("form");
    const $panel = $form.closest(".list-form");
    const $preview = $panel.find("#listing-preview");
    const title = $form.find("#title").val().trim();
    const author = $form.find("#author").val().trim();
    const condition = $form.find("#book-condition option:selected").text();
    const wanted = $form.find("#wanted").val().trim();
    const note = $form.find("#note").val().trim();
    const hasDetails = title || author || wanted || note || $form.find("#book-condition").val();

    $preview.find('[data-preview="title"]').text(title || "Your book title");
    $preview.find('[data-preview="author"]').text(author || "Author name");
    $preview.find('[data-preview="condition"]').text(condition || "Choose a condition");
    $preview.find('[data-preview="wanted"]').text(wanted || "Add your swap request");
    $preview.find('[data-preview="note"]').text(note).prop("hidden", !note);

    if (hasDetails) {
      $preview.stop(true, true).prop("hidden", false).fadeIn(180);
    } else {
      $preview.stop(true, true).fadeOut(180, function () {
        $preview.prop("hidden", true);
      });
    }
  });
});
