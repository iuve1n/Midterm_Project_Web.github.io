const listingStorageKey = "leafloop-listings";

function loadListings() {
  try {
    const savedListings = JSON.parse(localStorage.getItem(listingStorageKey) || "[]");

    if (!Array.isArray(savedListings)) {
      return [];
    }

    return savedListings.filter(function (listing) {
      return listing
        && typeof listing.id === "string"
        && typeof listing.title === "string"
        && typeof listing.author === "string"
        && typeof listing.condition === "string"
        && typeof listing.offer === "string";
    });
  } catch (error) {
    return [];
  }
}

function saveListings(listings) {
  try {
    localStorage.setItem(listingStorageKey, JSON.stringify(listings));
    return true;
  } catch (error) {
    return false;
  }
}

function createListingId() {
  return "listing-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}
