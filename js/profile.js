const profileForm = document.querySelector("#profile-form");
const profileNameInput = document.querySelector("#profile-name");
const profileNameMessage = document.querySelector("#profile-name-message");

function loadReaderName() {
  try {
    const savedName = localStorage.getItem("leafloop-reader-name") || "";
    const name = savedName.trim().replace(/\s+/g, " ");
    return name.length <= 60 ? name : "";
  } catch {
    return "";
  }
}

function showReaderName(name) {
  document.querySelector("#reader-name").textContent = name || "Reader";
  document.querySelector("#profile-heading").textContent = name
    ? name + "'s shelf."
    : "Your bookshelf.";
  profileNameInput.value = name;
}

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = profileNameInput.value.trim().replace(/\s+/g, " ");

  if (name === "" || name.length > 60) {
    profileNameInput.setAttribute("aria-invalid", "true");
    profileNameMessage.textContent = "Enter your name using up to 60 characters.";
    profileNameInput.focus();
    return;
  }

  profileNameInput.setAttribute("aria-invalid", "false");

  try {
    localStorage.setItem("leafloop-reader-name", name);
  } catch {
    profileNameMessage.textContent = "Your name could not be saved in this browser. Please try again.";
    return;
  }

  showReaderName(name);
  profileNameMessage.textContent = "Your name has been saved.";
});

profileNameInput.addEventListener("input", function () {
  profileNameInput.setAttribute("aria-invalid", "false");
  profileNameMessage.textContent = "";
});

showReaderName(loadReaderName());
