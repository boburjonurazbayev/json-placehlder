// Get elements
const elLogOutBtn = document.querySelector(".log-out__btn");
const elPrevBtn = document.querySelector(".prev__btn");
const elCommentsList = document.querySelector(".comments__list");
const elCommentsTemplate = document.querySelector(
  "#comments__list-template"
).content;
const elCommentsHeading = document.querySelector(".comments__heading");

// Get tokens from localStorage
const token = window.localStorage.getItem("token");
const userIdToken = window.localStorage.getItem("userId");
const postIdToken = window.localStorage.getItem("postId");

// Verify authentication
if (!token) {
  window.location.replace("login.html");
}

// Verify userIdToken
if (!userIdToken) {
  window.location.replace("index.html");
}

// Verify postIdToken
if (!postIdToken) {
  window.location.replace("posts.html");
}

// Log Out logic
elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("postId");

  window.location.replace("posts.html");
});

// Prev Page logic
elPrevBtn.addEventListener("click", () => {
  window.localStorage.removeItem("postId");

  window.location.replace("comments.html");
});

// Normalize post number
const normalizePost = (number) => {
  let userNumber = 10;
  let normalizedPostNumber = number % userNumber;

  if (normalizedPostNumber === 0) {
    normalizedPostNumber = userNumber;
  }

  return normalizedPostNumber;
};

//   Render Comments
const renderComments = (array, node) => {
  node.innerHTML = null;

  const commentsFragment = document.createDocumentFragment();
  const postIdToken = window.localStorage.getItem("postId");

  array.forEach((row) => {
    const commentsTemplate = elCommentsTemplate.cloneNode(true);

    commentsTemplate.querySelector(".comments__name").textContent = row.name;
    commentsTemplate.querySelector(".comments__body").textContent = row.body;
    commentsTemplate.querySelector(".comments__email-link").textContent =
      row.email;
    commentsTemplate.querySelector(".comments__email-link").href =
      "https://www." + row.email;

    commentsFragment.appendChild(commentsTemplate);
  });

  elCommentsHeading.textContent =
    normalizePost(postIdToken) + "-post`s comments";

  node.appendChild(commentsFragment);
};

// Get posts information
fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    const commentsArray = [];

    data?.forEach((row) => {
      const postIdToken = window.localStorage.getItem("postId");

      if (postIdToken == row.postId) {
        commentsArray.push(row);

        renderComments(commentsArray, elCommentsList);
      }
    });
  });
