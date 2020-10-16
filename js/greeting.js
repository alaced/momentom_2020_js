const form = document.querySelector(".js-greetingForm"),
  input = form.querySelector(".js-form__name"),
  greeting = document.querySelector(".js-greetings"),
  focusInput = document.querySelector(".js-todo-focus"),
  todo = document.querySelector(".todo");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function focus() {
  focusInput.focus();
  focusInput.select();
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  if (input.value === "" || input.value === " ") return false;
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  input.classList.add(SHOWING_CN);
  input.focus();
  input.select();
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  input.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
  todo.classList.add(SHOWING_CN);
  focus();
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
    focus();
  }
}

function init() {
  loadName();
}

init();
