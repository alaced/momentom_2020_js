const form = document.querySelector(".js-greetingForm"),
  input = form.querySelector(".js-form__name"),
  greeting = document.querySelector(".js-greetings"),
  focusInput = document.querySelector(".js__todo-focus");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  input.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
  input.focus();
  input.select();
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  input.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
  focusInput.focus();
  focusInput.select();
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();