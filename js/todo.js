const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-form__todo"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList"),
  toDoContainer = document.querySelector(".containier-toDoList");

const TODO_LS = "toDos";
const DONE_LS = "dones";
const SHOWING_FLEX = "showing-flex";

let toDos = [];
let dones = [];

function returnToDos(event) {
  const returnBtn = event.target;
  const div = returnBtn.parentNode;
  doneList.removeChild(div);
  let newId = parseInt(div.id);
  const moveDones = dones.filter(function (done) {
    return done.id !== newId;
  });
  dones = moveDones;
  saveDones(dones);
  paintToDo(div.innerText);
}

function doneToDo(event) {
  const checkBtn = event.target;
  const div = checkBtn.parentNode;
  let newId = parseInt(div.id);
  toDoList.removeChild(div);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id !== newId;
  });
  toDos = moveToDos;
  saveToDos(toDos);
  paintDone(div.innerText);
}

function deleteDone(event) {
  const delBtn = event.target;
  const div = delBtn.parentNode;
  doneList.removeChild(div);
  const cleanDone = dones.filter(function (done) {
    return done.id !== parseInt(div.id);
  });
  dones = cleanDone;
  saveDones(dones);
}

function deleteToDo(event) {
  const delBtn = event.target;
  const div = delBtn.parentNode;
  toDoList.removeChild(div);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(div.id);
  });
  toDos = cleanToDos;
  saveToDos(toDos);
}

function saveToDos(todo) {
  localStorage.setItem(TODO_LS, JSON.stringify(todo));
}

function saveDones(done) {
  localStorage.setItem(DONE_LS, JSON.stringify(done));
}

function paintDone(text) {
  const listDiv = document.createElement("div");
  const returnBtn = document.createElement("button");
  const div = document.createElement("div");
  const delBtn = document.createElement("button");
  const newId = dones.length + 1;
  toDoContainer.classList.add(SHOWING_FLEX);
  returnBtn.addEventListener("click", returnToDos);
  returnBtn.classList.add("fas", "fa-undo-alt");
  div.classList.add("todo_item");
  div.innerHTML = text;
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteDone);
  listDiv.appendChild(returnBtn);
  listDiv.appendChild(div);
  listDiv.appendChild(delBtn);
  listDiv.classList.add("todo_list");
  listDiv.id = newId;
  doneList.appendChild(listDiv);
  const doneObj = {
    text,
    id: newId,
  };
  dones.push(doneObj);
  saveDones(dones);
}

function paintToDo(text) {
  const listDiv = document.createElement("div");
  const checkBtn = document.createElement("button");
  const div = document.createElement("div");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  toDoContainer.classList.add(SHOWING_FLEX);
  checkBtn.classList.add("fas", "fa-check");
  checkBtn.addEventListener("click", doneToDo);
  div.classList.add("todo_item");
  div.innerText = text;
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteToDo);
  listDiv.classList.add("todo_list");
  listDiv.appendChild(checkBtn);
  listDiv.appendChild(div);
  listDiv.appendChild(delBtn);
  listDiv.id = newId;
  toDoList.appendChild(listDiv);
  const toDoObj = {
    text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos(toDos);
}

function handleSubmit(event) {
  event.preventDefault();
  if (toDoInput.value === "" || toDoInput.value === " ") return false;
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
