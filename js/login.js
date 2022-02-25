const elLoginForm = document.querySelector(".login__form");
const elLoginEmail = document.querySelector(".login__email");
const elLoginPassword = document.querySelector(".login__password");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const loginEmail = elLoginEmail.value.trim();
  const loginPassword = elLoginPassword.value.trim();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("index.html");
      }
    });
});
