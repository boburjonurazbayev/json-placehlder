// Get elements
const elLogOutBtn = document.querySelector(".log-out__btn");
const elPrevBtn = document.querySelector(".prev__btn");
const elPostsList = document.querySelector(".posts__list");
const elPostsTemplate = document.querySelector("#posts__list-template").content;
const elPostsHeading = document.querySelector(".posts__heading");

// Get tokens from localStorage
const token = window.localStorage.getItem("token");
const userIdToken = window.localStorage.getItem("userId");

// Verify authentication
if (!token) {
  window.location.replace("login.html");
}

// Log Out logic
elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");

  window.location.replace("posts.html");
});

// Verify userIdToken
if (!userIdToken) {
  window.location.replace("index.html");
}

// Prev Page logic
elPrevBtn.addEventListener("click", () => {
  window.localStorage.removeItem("userId");

  window.location.replace("posts.html");
});

function normalizePostId(number) {
  const usersNumber = 10;

  let normalizedId = number % usersNumber;

  if (normalizedId === 0) {
    normalizedId = usersNumber;
  }

  return normalizedId;
}

// Render Posts
const renderPosts = (array, node) => {
  node.innerHTML = null;

  const postsFragment = document.createDocumentFragment();

  array.forEach((row) => {
    const postsTemplate = elPostsTemplate.cloneNode(true);

    postsTemplate.querySelector(".posts__title").textContent = row.title;
    postsTemplate.querySelector(".posts__body").textContent = row.body;
    postsTemplate.querySelector(".posts__comments-btn").dataset.id = row.id;
    postsTemplate.querySelector(".posts__comments-btn").textContent =
      normalizePostId(row.id) + "-post`s comments";

    elPostsHeading.textContent =
      window.localStorage.getItem("userId") + "-user`s posts";
    postsFragment.appendChild(postsTemplate);
  });

  node.appendChild(postsFragment);
};

// Get posts information
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsArray = [];

    data?.forEach((row) => {
      const userIdToken = window.localStorage.getItem("userId");

      if (userIdToken == row.userId) {
        postsArray.push(row);

        renderPosts(postsArray, elPostsList);
      }
    });
  });

// Listen post comments` button
elPostsList.addEventListener("click", (evt) => {
  if (evt.target.matches(".posts__comments-btn")) {
    const postId = evt.target.dataset.id;

    window.localStorage.setItem("postId", postId);

    window.location.replace("comments.html");
  }
});
