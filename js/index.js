// Get elements
const elLogOutBtn = document.querySelector(".log-out__btn");
const elUsersList = document.querySelector(".users__list");
const elUsersTemplate = document.querySelector("#users__list-template").content;

// Get tokens from localStorage
const token = window.localStorage.getItem("token");

// Verify authentication
if (!token) {
  window.location.replace("login.html");
}

// Log Out logic
elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.replace("index.html");
});

// Render Users
const renderUsers = (array, node) => {
  node.innerHTML = null;

  const userFragment = document.createDocumentFragment();

  array.forEach((row) => {
    const userTemplate = elUsersTemplate.cloneNode(true);

    // Give values HTMLElements
    userTemplate.querySelector(".users__avatar").alt =
      row.username + "`s avatar";
    userTemplate.querySelector(".users__email-link").textContent = row.email;
    userTemplate.querySelector(".users__email-link").href =
      "https://www." + row.email;
    userTemplate.querySelector(".users__website-link").textContent =
      row.website;
    userTemplate.querySelector(".users__website-link").href =
      "https://www." + row.website;
    userTemplate.querySelector(".users__location-link").href =
      "https://www.google.com/maps/place/" +
      row.address.geo.lat +
      "," +
      row.address.geo.lng;
    userTemplate.querySelector(".users__name").textContent =
      row.name + " (" + row.username + ")";
    userTemplate.querySelector(".users__address").textContent =
      "Address: " +
      row.address.street +
      " street " +
      row.address.suite +
      " " +
      row.address.city +
      " city";
    userTemplate.querySelector(".users__zipcode").textContent =
      "Zipcode: " + row.address.zipcode;
    userTemplate.querySelector(".users__phone").textContent =
      "Phone: " + row.phone;
    userTemplate.querySelector(".users__company-name").textContent =
      "Company: " + row.company.name;
    userTemplate.querySelector(".users__company-info").textContent =
      row.company.catchPhrase + " , " + row.company.bs;
    userTemplate.querySelector(".users__posts-btn").dataset.id = row.id;
    userTemplate.querySelector(".users__posts-btn").textContent =
      row.username + "`s posts";

    userFragment.appendChild(userTemplate);
  });

  node.appendChild(userFragment);
};

// Get users information
fetch("https://jsonplaceholder.typicode.com/users")
  .then((respomse) => respomse.json())
  .then((data) => {
    if (data?.length > 0) {
      renderUsers(data, elUsersList);
    }
  });

// Listen user posts` button
elUsersList.addEventListener("click", (evt) => {
  if (evt.target.matches(".users__posts-btn")) {
    const userId = evt.target.dataset.id;

    window.localStorage.setItem("userId", userId);

    window.location.replace("posts.html");
  }
});
