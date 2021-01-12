const form = document.querySelector(".js-greetingForm"),
  input = form.querySelector(".js-form__name"),
  greeting = document.querySelector(".js-greetings"),
  focusInput = document.querySelector(".js-todo-focus"),
  todo = document.querySelector(".todo");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//화면이 로드되었을 때 인풋에 자동으로 cursor가 focus 되어 있게 만들어주는 함수
function handleFocus(inputItem) {
  inputItem.focus();
  inputItem.select();
}

//로컬스토리지에 USER_LS를 키로 입력한 텍스트를 값으로 저장하는 함수
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //submit 이벤트의 디폴트 성질을 막음
  if (input.value === "" || input.value === " ") return false; //인풋값이 공백일 경우 방지
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue); //인풋에 입력된 값을 currentValue 변수에 할당하고, 이를 paintGreeting 함수와 saveName 함수의 인자값으로 전달
}

function askForName() {
  form.classList.add(SHOWING_CN);
  input.classList.add(SHOWING_CN); //로컬스토리지에 저장된 이름 값이 없을 때만 이름을 묻는 폼이 보여지도록 CSS 속성을 부여
  handleFocus(input); //input을 인자로 갖는 handleFocus 함수 호출
  form.addEventListener("submit", handleSubmit); //폼에 텍스트를 입력해서 submit 이벤트가 발생했을 때 handleSubmit 함수 호출
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  input.classList.remove(SHOWING_CN); //이미 이름 값이 존재하기 때문에 이름을 묻는 폼을 숨기는 CSS 속성 부여
  greeting.classList.add(SHOWING_CN); //존재하는 이름 값을 출력해주는 element가 보여지도록 CSS 속성 부여
  greeting.innerText = `Hello, ${text}`; //element에 환영 문구를 삽입
  todo.classList.add(SHOWING_CN); //숨겨져 있던 todo 리스트 폼이 보여지도록 CSS 속성 부여
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName(); //현재 로컬스토리지에 USER_LS를 키로 하는 값이 존재하지 않는다면 askFormName 함수를 호출
  } else {
    paintGreeting(currentUser);
    handleFocus(focusInput); //존재한다면 그 값을 인자로 받는 paintGreeting 함수와 focusInput을 인자로 받는 handleFocus 함수를 호출
  }
}

function init() {
  loadName();
}

init();
