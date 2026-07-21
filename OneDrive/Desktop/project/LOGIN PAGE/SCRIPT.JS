const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
const successMessage = document.getElementById("successMessage");

function isEmailValid(value) {
  return value.length > 3 && value.includes("@") && value.includes(".");
}

function isPasswordValid(value) {
  return value.length > 8;
}

function validateEmail() {
  const emailValue = emailInput.value.trim();

  emailInput.classList.remove("valid", "invalid");
  emailMessage.classList.remove("good", "error");

  if (emailValue === "") {
    emailMessage.textContent = "";
  } else if (isEmailValid(emailValue)) {
    emailInput.classList.add("valid");
    emailMessage.classList.add("good");
    emailMessage.textContent = "";
  } else {
    emailInput.classList.add("invalid");
    emailMessage.classList.add("error");
    emailMessage.textContent = 'Email must be more than 3 characters and contain "@" and "."';
  }

  updateSuccessMessage();
}

function validatePassword() {
  const passwordValue = passwordInput.value;

  passwordInput.classList.remove("valid", "invalid");
  passwordMessage.classList.remove("good", "error");

  if (passwordValue === "") {
    passwordMessage.textContent = "";
  } else if (isPasswordValid(passwordValue)) {
    passwordInput.classList.add("valid");
    passwordMessage.classList.add("good");
    passwordMessage.textContent = "";
  } else {
    passwordInput.classList.add("invalid");
    passwordMessage.classList.add("error");
    passwordMessage.textContent = "Password must be more than 8 characters";
  }

  updateSuccessMessage();
}

function updateSuccessMessage() {
  const emailValid = isEmailValid(emailInput.value.trim());
  const passwordValid = isPasswordValid(passwordInput.value);

  if (emailValid && passwordValid) {
    successMessage.textContent = "All good to go";
  } else {
    successMessage.textContent = "";
  }
}

function clearForm() {
  form.reset();

  emailInput.classList.remove("valid", "invalid");
  passwordInput.classList.remove("valid", "invalid");

  emailMessage.className = "message";
  passwordMessage.className = "message";

  emailMessage.textContent = "";
  passwordMessage.textContent = "";
  successMessage.textContent = "";
}

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  validateEmail();
  validatePassword();

  const emailValid = isEmailValid(emailInput.value.trim());
  const passwordValid = isPasswordValid(passwordInput.value);

  if (!emailValid || !passwordValid) {
    return;
  }

  const confirmed = confirm("Are you sure you want to submit?");

  if (confirmed) {
    alert("Successful signup!");
  } else {
    clearForm();
    window.location.href = window.location.pathname;
  }
});