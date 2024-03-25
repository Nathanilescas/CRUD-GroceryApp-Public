const elements = {
  // Login
  loginButton: document.getElementById("loginButton"),
  loginTitle: document.getElementById("loginTitle"),
  loginForm: document.getElementById("loginForm"),
  // SignUp
  signupButton: document.getElementById("signupButton"),
  signupTitle: document.getElementById("signupTitle"),
  signupForm: document.getElementById("signupForm"),
};

document.getElementById("loginButton").addEventListener("click", LoginToggle);

document.getElementById("signupButton").addEventListener("click", SignupToggle);

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    const invalidComment = document.querySelectorAll(".signupInvalid");
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;

    let elementValues = {
      selector: ["signupFirst", "signupLast", "signupEmail", "signupPassword"],
      charLimit: [30, 30, 50, 20],
    };

    for (let i = 0; elementValues.selector.length > i; i++) {
      let element = document.getElementById(elementValues.selector[i]);

      if (element.value.length > elementValues.charLimit[i]) {
        invalidComment[i].style.display = "block";
        event.preventDefault();
      } else {
        invalidComment[i].style.display = "none";
      }
      if (password !== confirmPassword) {
        invalidComment[4].style.display = "block";
        event.preventDefault();
      }
    }
  });

function invalidComment() {}

function LoginToggle() {
  // Switching Button Color
  elements.loginButton.classList.add("active");
  elements.signupButton.classList.remove("active");

  // Adding/Removing Title
  elements.signupTitle.style.setProperty("display", "none");
  elements.loginTitle.style.removeProperty("display");

  // Adding/Removing Form
  elements.signupForm.style.setProperty("display", "none");
  elements.loginForm.style.removeProperty("display");
}

function SignupToggle() {
  // Switches Button Color
  elements.signupButton.classList.add("active");
  elements.loginButton.classList.remove("active");

  // Adding/Removing Title
  elements.loginTitle.style.setProperty("display", "none");
  elements.signupTitle.style.removeProperty("display");

  // Adding/Removing Form
  elements.loginForm.style.setProperty("display", "none");
  elements.signupForm.style.removeProperty("display");
}

// CREATE AN INVALID METHOD THAT YOU WILL CREATE RED COMMENT ON THE SIGNUP SIDE AND YOU TELL IT WHAT IS WRONG
