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

function focus() {
  focusInput.focus();
  focusInput.select();
}

function returnToDos(event) {
  const returnBtn = event.target;
  const div = returnBtn.parentNode;
  doneList.removeChild(div);
  let newId = div.id;
  const moveDones = dones.filter(function (done) {
    return done.id !== newId;
  });
  dones = moveDones;
  saveDones(dones);
  paintToDo(div.innerText);
  focus();
}

function doneToDo(event) {
  const checkBtn = event.target;
  const div = checkBtn.parentNode;
  let newId = div.id;
  toDoList.removeChild(div);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id !== newId;
  });
  toDos = moveToDos;
  saveToDos(toDos);
  paintDone(div.innerText);
  focus();
}

function deleteDone(event) {
  const delBtn = event.target;
  const div = delBtn.parentNode;
  doneList.removeChild(div);
  const cleanDone = dones.filter(function (done) {
    return done.id !== div.id;
  });
  dones = cleanDone;
  saveDones(dones);
  focus();
  clear();
}

function deleteToDo(event) {
  const delBtn = event.target;
  const div = delBtn.parentNode;
  toDoList.removeChild(div);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== div.id;
  });
  toDos = cleanToDos;
  saveToDos(toDos);
  focus();
  clear();
}

function saveToDos(todo) {
  localStorage.setItem(TODO_LS, JSON.stringify(todo));
}

function saveDones(done) {
  localStorage.setItem(DONE_LS, JSON.stringify(done));
}

function paintDone(text) {
  const genericDiv = buildGenericDiv(text);
  const returnBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const newId = dones.length + 1;
  toDoContainer.classList.add(SHOWING_FLEX);
  returnBtn.addEventListener("click", returnToDos);
  returnBtn.classList.add("fas", "fa-undo-alt");
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteDone);
  genericDiv.appendChild(returnBtn);
  genericDiv.appendChild(delBtn);
  doneList.appendChild(genericDiv);
  genericDiv.id = `id_${newId}`;
  const doneObj = {
    text,
    id: `id_${newId}`,
  };
  dones.push(doneObj);
  saveDones(dones);
}

function buildGenericDiv(text) {
  const listDiv = document.createElement("div");
  const div = document.createElement("div");
  div.classList.add("todo-item");
  div.innerText = text;
  listDiv.classList.add("todo-list");
  listDiv.appendChild(div);
  return listDiv;
}

function paintToDo(text) {
  const genericDiv = buildGenericDiv(text);
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  toDoContainer.classList.add(SHOWING_FLEX);
  checkBtn.classList.add("fas", "fa-check");
  checkBtn.addEventListener("click", doneToDo);
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteToDo);
  genericDiv.appendChild(checkBtn);
  genericDiv.appendChild(delBtn);
  toDoList.appendChild(genericDiv);
  genericDiv.id = `id_${newId}`;
  const toDoObj = {
    text,
    id: `id_${newId}`,
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

function clear() {
  if (toDoList.childNodes.length === 0 && doneList.childNodes.length === 0) {
    toDoContainer.classList.remove(SHOWING_FLEX);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
